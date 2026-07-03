import { mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { insightArticles } from '../src/data/insights.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const outputDir = path.join(rootDir, 'public', 'insights');
const siteUrl = 'https://www.xizai.asia';
const siteName = '熙载咨询';
const companyName = '熙载咨询（北京）有限公司';
const ogImage = `${siteUrl}/og-image.png`;

const escapeHtml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

const renderList = (items) => items.map((item) => `<li>${escapeHtml(item)}</li>`).join('\n');

const renderParagraphs = (items) => items.map((item) => `<p>${escapeHtml(item)}</p>`).join('\n');

const renderJsonLd = (article, canonicalUrl) =>
  JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      '@id': `${canonicalUrl}#article`,
      headline: article.title,
      description: article.summary,
      datePublished: article.date,
      dateModified: article.date,
      inLanguage: 'zh-CN',
      mainEntityOfPage: canonicalUrl,
      image: ogImage,
      author: {
        '@type': 'Organization',
        name: siteName,
        url: siteUrl,
      },
      publisher: {
        '@type': 'Organization',
        name: companyName,
        url: siteUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/favicon.svg`,
        },
      },
      about: article.tags,
      citation: article.sourceUrl,
      isBasedOn: article.sourceUrl,
    },
    null,
    2,
  );

const pageShell = ({ title, description, canonicalUrl, body, jsonLd, ogType = 'article' }) => `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#0D1B2A" />
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="robots" content="index, follow" />
    <meta property="og:type" content="${ogType}" />
    <meta property="og:locale" content="zh_CN" />
    <meta property="og:site_name" content="${siteName}" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${ogImage}" />
    <link rel="canonical" href="${canonicalUrl}" />
    <link rel="alternate" href="${canonicalUrl}" hreflang="zh-CN" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>${escapeHtml(title)}</title>
    <script type="application/ld+json">${jsonLd}</script>
    <style>
      :root {
        --ink: #0d1b2a;
        --navy: #10233f;
        --gold: #c8a46b;
        --ivory: #f7f4ec;
        --muted: #6b7280;
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        color: var(--ink);
        background: var(--ivory);
        font-family: "Noto Sans SC", "Microsoft YaHei", "PingFang SC", Arial, sans-serif;
        line-height: 1.75;
      }

      a {
        color: inherit;
      }

      .topbar {
        display: flex;
        justify-content: space-between;
        gap: 20px;
        padding: 22px min(6vw, 72px);
        color: var(--ivory);
        background: var(--ink);
      }

      .brand {
        font-weight: 800;
        text-decoration: none;
      }

      .nav {
        display: flex;
        gap: 18px;
        color: rgba(247, 244, 236, 0.78);
        font-size: 14px;
      }

      .nav a {
        text-decoration: none;
      }

      main {
        width: min(920px, calc(100% - 40px));
        margin: 0 auto;
        padding: 62px 0 72px;
      }

      .eyebrow {
        display: inline-flex;
        margin-bottom: 18px;
        color: var(--gold);
        font-weight: 700;
        letter-spacing: 0.08em;
      }

      h1 {
        margin: 0;
        color: var(--navy);
        font-family: "Noto Serif SC", "Source Han Serif SC", "Songti SC", "SimSun", serif;
        font-size: clamp(2rem, 5vw, 3.8rem);
        line-height: 1.18;
      }

      .meta {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        margin: 20px 0 28px;
        color: var(--muted);
        font-size: 14px;
      }

      .lead {
        margin: 0 0 32px;
        padding: 22px 24px;
        border-left: 4px solid var(--gold);
        color: #263548;
        background: #fffdf8;
        font-size: 18px;
      }

      section {
        margin-top: 34px;
      }

      h2 {
        margin: 0 0 14px;
        color: var(--navy);
        font-family: "Noto Serif SC", "Source Han Serif SC", "Songti SC", "SimSun", serif;
        font-size: 26px;
      }

      li {
        margin: 8px 0;
      }

      .source {
        margin-top: 42px;
        padding: 20px 22px;
        border: 1px solid rgba(16, 35, 63, 0.12);
        background: #fffdf8;
      }

      .source a {
        color: var(--navy);
        font-weight: 800;
      }

      .back {
        display: inline-flex;
        margin-top: 34px;
        padding: 12px 18px;
        border-radius: 8px;
        color: var(--ivory);
        background: var(--navy);
        text-decoration: none;
        font-weight: 800;
      }

      footer {
        padding: 28px min(6vw, 72px);
        color: rgba(247, 244, 236, 0.7);
        background: var(--ink);
        font-size: 14px;
      }

      @media (max-width: 720px) {
        .topbar {
          display: block;
        }

        .nav {
          margin-top: 12px;
          flex-wrap: wrap;
        }
      }
    </style>
  </head>
  <body>
    <header class="topbar">
      <a class="brand" href="/#home">${companyName}</a>
      <nav class="nav" aria-label="主导航">
        <a href="/#about">关于熙载</a>
        <a href="/#services">业务服务</a>
        <a href="/#insights">研究洞察</a>
        <a href="/#contact">联系我们</a>
      </nav>
    </header>
    ${body}
    <footer>
      <span>© ${new Date().getFullYear()} ${companyName}</span>
      <span> · 县域产业与中小企业发展服务机构</span>
    </footer>
  </body>
</html>
`;

const renderArticlePage = (article) => {
  const canonicalUrl = `${siteUrl}/insights/${article.slug}`;
  const title = `${article.title} | 研究洞察 | ${siteName}`;
  const body = `<main>
      <article>
        <span class="eyebrow">${escapeHtml(article.category)}</span>
        <h1>${escapeHtml(article.title)}</h1>
        <div class="meta">
          <span>${escapeHtml(article.date)}</span>
          <span>${escapeHtml(article.sourceName)}</span>
        </div>
        <p class="lead">${escapeHtml(article.summary)}</p>
        <section>
          <h2>行业要点</h2>
          <ul>
            ${renderList(article.keyPoints)}
          </ul>
        </section>
        <section>
          <h2>熙载观察</h2>
          ${renderParagraphs(article.xizaiView)}
        </section>
        <section class="source">
          <strong>公开来源</strong>
          <p><a href="${article.sourceUrl}" target="_blank" rel="noreferrer">查看原文：${escapeHtml(article.sourceName)}</a></p>
          <p>本站仅作公开信息摘要与行业观察，不构成政策承诺、融资承诺或法律意见。</p>
        </section>
        <a class="back" href="/#insights">返回研究洞察</a>
      </article>
    </main>`;

  return pageShell({
    title,
    description: article.summary,
    canonicalUrl,
    body,
    jsonLd: renderJsonLd(article, canonicalUrl),
  });
};

const renderIndexPage = () => {
  const canonicalUrl = `${siteUrl}/insights`;
  const description = '熙载咨询研究洞察，聚焦县域产业、中小企业服务、企业信用和合规产业金融相关公开信息。';
  const body = `<main>
      <span class="eyebrow">研究洞察</span>
      <h1>公开行业新闻与熙载观察</h1>
      <p class="lead">${description}</p>
      <section>
        <h2>文章列表</h2>
        <ul>
          ${insightArticles
            .map((article) => `<li><a href="/insights/${article.slug}">${escapeHtml(article.title)}</a></li>`)
            .join('\n')}
        </ul>
      </section>
      <a class="back" href="/#insights">返回官网研究洞察</a>
    </main>`;

  return pageShell({
    title: `研究洞察 | ${siteName}`,
    description,
    canonicalUrl,
    body,
    ogType: 'website',
    jsonLd: JSON.stringify(
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        '@id': `${canonicalUrl}#collection`,
        url: canonicalUrl,
        name: `研究洞察 | ${siteName}`,
        description,
        inLanguage: 'zh-CN',
        hasPart: insightArticles.map((article) => ({
          '@type': 'Article',
          headline: article.title,
          url: `${siteUrl}/insights/${article.slug}`,
          datePublished: article.date,
        })),
      },
      null,
      2,
    ),
  });
};

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });
await writeFile(path.join(outputDir, 'index.html'), renderIndexPage(), 'utf8');
await writeFile(path.join(rootDir, 'public', 'insights.html'), renderIndexPage(), 'utf8');

await Promise.all(
  insightArticles.map(async (article) => {
    const html = renderArticlePage(article);
    const articleDir = path.join(outputDir, article.slug);
    await mkdir(articleDir, { recursive: true });
    await writeFile(path.join(articleDir, 'index.html'), html, 'utf8');
    await writeFile(path.join(outputDir, `${article.slug}.html`), html, 'utf8');
  }),
);

console.log(`Generated ${insightArticles.length} insight pages.`);
