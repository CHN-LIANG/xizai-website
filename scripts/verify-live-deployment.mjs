import { setTimeout as delay } from 'node:timers/promises';

const siteUrl = (process.env.SITE_URL || 'https://www.xizai.asia').replace(/\/$/, '');
const expectedCommit = process.env.EXPECTED_SHA || process.env.GITHUB_SHA || '';
const deployHookUrl = process.env.VERCEL_DEPLOY_HOOK_URL || '';
const initialWaitSeconds = Number(process.env.INITIAL_WAIT_SECONDS || 180);
const postHookWaitSeconds = Number(process.env.POST_HOOK_WAIT_SECONDS || 420);
const pollIntervalSeconds = Number(process.env.POLL_INTERVAL_SECONDS || 15);
const requiredPaths = (process.env.REQUIRED_PATHS || '')
  .split(',')
  .map((path) => path.trim())
  .filter(Boolean);

if (!expectedCommit) {
  throw new Error('EXPECTED_SHA or GITHUB_SHA is required for live deployment verification.');
}

const cacheBust = () => `verify=${expectedCommit.slice(0, 12)}-${Date.now()}`;

const urlWithCacheBust = (path) => `${siteUrl}${path}${path.includes('?') ? '&' : '?'}${cacheBust()}`;

const matchesCommit = (actualCommit) => {
  if (!actualCommit || actualCommit === 'unknown') {
    return false;
  }

  return actualCommit === expectedCommit || actualCommit.startsWith(expectedCommit) || expectedCommit.startsWith(actualCommit);
};

const fetchText = async (path) => {
  const response = await fetch(urlWithCacheBust(path), {
    headers: {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
    },
  });

  if (!response.ok) {
    throw new Error(`${path} returned ${response.status}`);
  }

  return response.text();
};

const headOk = async (path) => {
  const response = await fetch(urlWithCacheBust(path), {
    method: 'HEAD',
    headers: {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
    },
  });

  return response.ok;
};

const checkLive = async () => {
  const rawMeta = await fetchText('/deploy-meta.json');
  const meta = JSON.parse(rawMeta);
  const missingPaths = [];

  for (const path of requiredPaths) {
    if (!(await headOk(path))) {
      missingPaths.push(path);
    }
  }

  return {
    ok: matchesCommit(meta.commit) && missingPaths.length === 0,
    meta,
    missingPaths,
  };
};

const waitForLive = async (seconds, phase) => {
  const deadline = Date.now() + seconds * 1000;
  let lastResult;
  let lastError;

  while (Date.now() < deadline) {
    try {
      lastResult = await checkLive();
      console.log(
        `[${phase}] live=${lastResult.meta.shortCommit || lastResult.meta.commit} expected=${expectedCommit.slice(0, 7)} missing=${lastResult.missingPaths.join(',') || 'none'}`,
      );

      if (lastResult.ok) {
        return lastResult;
      }
    } catch (error) {
      lastError = error;
      console.log(`[${phase}] not ready: ${error.message}`);
    }

    await delay(pollIntervalSeconds * 1000);
  }

  const details = lastResult
    ? `live=${lastResult.meta.commit}; missing=${lastResult.missingPaths.join(',') || 'none'}`
    : `last error=${lastError?.message || 'unknown'}`;
  throw new Error(`Live deployment did not reach ${expectedCommit} during ${phase}. ${details}`);
};

const triggerDeployHook = async () => {
  if (!deployHookUrl) {
    throw new Error('VERCEL_DEPLOY_HOOK_URL is not configured. Add it as a GitHub Actions secret to enable automatic fallback deployment.');
  }

  const response = await fetch(deployHookUrl, { method: 'POST' });
  if (!response.ok) {
    throw new Error(`Vercel Deploy Hook returned ${response.status}`);
  }

  console.log('Triggered Vercel Deploy Hook fallback.');
};

try {
  await waitForLive(initialWaitSeconds, 'auto-deploy');
  console.log('Live deployment already matches the pushed commit.');
} catch (error) {
  console.log(`Automatic Vercel deployment check failed: ${error.message}`);
  await triggerDeployHook();
  await waitForLive(postHookWaitSeconds, 'deploy-hook');
  console.log('Live deployment matches after Vercel Deploy Hook fallback.');
}
