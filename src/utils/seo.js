const SITE_URL = 'https://www.xizai.asia';
const SITE_NAME = '熙载咨询（北京）有限公司';
const SHORT_NAME = '熙载咨询';
const DEFAULT_TITLE = '熙载咨询（北京）有限公司 | 县域产业与中小企业发展服务机构';
const DEFAULT_DESCRIPTION =
  '熙载咨询（北京）有限公司面向地方政府、产业平台、央国企下属单位及成长型企业，提供地方产业咨询、企业政策与评价服务、招商项目包装、政企协同和产业金融咨询服务。';
const OG_IMAGE = `${SITE_URL}/og-image.png`;

const upsertMeta = (attribute, key, content) => {
  if (!content) {
    removeMeta(attribute, key);
    return;
  }

  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
};

const removeMeta = (attribute, key) => {
  const element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  element?.remove();
};

const upsertLink = (rel, href, extraAttributes = {}) => {
  let selector = `link[rel="${rel}"]`;

  if (extraAttributes.hreflang) {
    selector += `[hreflang="${extraAttributes.hreflang}"]`;
  }

  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }

  element.setAttribute('href', href);

  Object.entries(extraAttributes).forEach(([name, value]) => {
    element.setAttribute(name, value);
  });
};

const upsertJsonLd = (id, data) => {
  let element = document.getElementById(id);

  if (!element) {
    element = document.createElement('script');
    element.id = id;
    element.type = 'application/ld+json';
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(data);
};

const buildArticleSchema = (article, url) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id': `${url}#article`,
  headline: article.title,
  description: article.summary,
  datePublished: article.date,
  dateModified: article.date,
  inLanguage: 'zh-CN',
  mainEntityOfPage: url,
  image: OG_IMAGE,
  author: {
    '@type': 'Organization',
    name: SHORT_NAME,
    url: SITE_URL,
  },
  publisher: {
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/favicon.svg`,
    },
  },
  about: article.tags,
  citation: article.sourceUrl,
  isBasedOn: article.sourceUrl,
});

const buildWebPageSchema = (url) => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${url}#webpage`,
  url,
  name: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  inLanguage: 'zh-CN',
  isPartOf: {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SHORT_NAME,
    url: SITE_URL,
  },
  about: {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
  },
});

export const updatePageSeo = (activeInsight) => {
  if (typeof document === 'undefined') {
    return;
  }

  const isArticle = Boolean(activeInsight);
  const canonicalUrl = isArticle ? `${SITE_URL}/insights/${activeInsight.slug}` : `${SITE_URL}/`;
  const title = isArticle ? `${activeInsight.title} | 研究洞察 | ${SHORT_NAME}` : DEFAULT_TITLE;
  const description = isArticle ? activeInsight.summary : DEFAULT_DESCRIPTION;

  document.title = title;
  upsertMeta('name', 'description', description);
  upsertMeta('property', 'og:title', title);
  upsertMeta('property', 'og:description', description);
  upsertMeta('property', 'og:url', canonicalUrl);
  upsertMeta('property', 'og:image', OG_IMAGE);
  upsertMeta('property', 'og:image:alt', `${SHORT_NAME}官网视觉识别`);
  upsertMeta('property', 'og:image:type', 'image/png');
  upsertMeta('property', 'og:type', isArticle ? 'article' : 'website');
  upsertMeta('name', 'twitter:title', title);
  upsertMeta('name', 'twitter:description', description);
  upsertMeta('name', 'twitter:image', OG_IMAGE);

  if (isArticle) {
    upsertMeta('property', 'article:published_time', activeInsight.date);
    upsertMeta('property', 'article:modified_time', activeInsight.date);
    upsertMeta('property', 'article:section', activeInsight.category);
  } else {
    removeMeta('property', 'article:published_time');
    removeMeta('property', 'article:modified_time');
    removeMeta('property', 'article:section');
  }

  upsertLink('canonical', canonicalUrl);
  upsertLink('alternate', canonicalUrl, { hreflang: 'zh-CN' });
  upsertJsonLd('xizai-dynamic-schema', isArticle ? buildArticleSchema(activeInsight, canonicalUrl) : buildWebPageSchema(canonicalUrl));
};

export const insightPathFor = (slug) => `/insights/${encodeURIComponent(slug)}`;
