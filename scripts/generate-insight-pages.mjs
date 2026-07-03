import { mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { complianceRules, financeDirections } from '../src/data/finance.js';
import { insightArticles } from '../src/data/insights.js';
import { serviceDetails, serviceScenarios } from '../src/data/services.js';
import { methods, networkNodes, partnerTypes, values } from '../src/data/culture.js';
import { publicEmailContacts, wechatAccount } from '../src/data/siteData.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const siteUrl = 'https://www.xizai.asia';
const siteName = '熙载咨询';
const companyName = '熙载咨询（北京）有限公司';
const ogImage = `${siteUrl}/og-image.png`;
const today = '2026-07-04';

const servicePages = [
  {
    slug: 'local-industry-consulting',
    title: '地方产业咨询',
    fullTitle: '地方产业咨询 | 县域产业定位、农业产业链梳理、园区发展建议 | 熙载咨询',
    description:
      '熙载咨询提供地方产业咨询服务，面向县域、园区和地方产业平台，围绕县域产业定位、农业产业链梳理、园区发展建议和招商方向研究形成可汇报、可执行的咨询成果。',
    summary:
      '面向地方政府平台、园区载体、产业主管部门和特色产业企业，围绕产业基础、资源禀赋、企业主体、政策方向和招商场景，形成可用于汇报、沟通、招商和项目推进的产业咨询成果。',
    items: ['县域产业定位', '农业产业链梳理', '园区发展建议', '招商方向研究'],
    keywords: ['县域产业咨询', '地方产业咨询', '农业产业链', '园区发展建议', '招商方向研究'],
  },
  {
    slug: 'enterprise-policy-evaluation',
    title: '企业政策与评价服务',
    fullTitle: '企业政策与评价服务 | AAA信用评价、政策申报、资质材料规范 | 熙载咨询',
    description:
      '熙载咨询提供企业政策与评价服务，支持成长型企业、央国企上下游单位开展AAA信用评价、协会评价、政策项目申报辅导和资质材料规范。',
    summary:
      '面向成长型企业和央国企上下游单位，帮助企业梳理信用资料、资质材料、政策申报路径和第三方评价表达，提升企业在合作、融资、市场准入和政府平台沟通中的可信呈现。',
    items: ['AAA信用评价', '协会评价服务', '政策项目申报辅导', '资质材料规范'],
    keywords: ['企业信用评价', 'AAA信用评价', '政策项目申报', '资质材料规范', '专精特新服务'],
  },
  {
    slug: 'investment-project-packaging',
    title: '招商项目包装',
    fullTitle: '招商项目包装 | 项目建议书、招商手册、投资逻辑梳理 | 熙载咨询',
    description:
      '熙载咨询提供招商项目包装服务，将地方资源、产业基础、投资逻辑和落地路径整理成项目建议书、招商手册、汇报材料和合作方案。',
    summary:
      '围绕项目背景、产业基础、投资逻辑、合作方式、政策依据和落地路径，帮助地方产业项目形成能对上汇报、对外招商、对接企业和推动合作的项目材料。',
    items: ['项目建议书', '招商手册', '投资逻辑梳理', '汇报材料设计'],
    keywords: ['招商项目包装', '项目建议书', '招商手册', '投资逻辑梳理', '汇报材料'],
  },
  {
    slug: 'government-enterprise-collaboration',
    title: '政企协同与资源对接',
    fullTitle: '政企协同与资源对接 | 政府平台、协会、国企平台与企业合作 | 熙载咨询',
    description:
      '熙载咨询提供政企协同与资源对接服务，协助政府、协会、平台公司、央国企和企业建立沟通机制，推动会议筹备、项目协调和产业资源连接。',
    summary:
      '在多方参与的产业项目中，熙载咨询协助建立沟通机制、明确合作边界、组织会议材料和对接专业资源，让政府平台、协会、企业和服务机构围绕具体项目形成可推进的协同关系。',
    items: ['政企沟通机制', '会议活动筹备', '合作方案设计', '产业资源连接'],
    keywords: ['政企协同', '资源对接', '政府平台合作', '协会资源', '产业资源连接'],
  },
  {
    slug: 'industrial-finance-consulting',
    title: '产业金融咨询',
    fullTitle: '产业金融咨询 | 供应链融资咨询、项目资金诊断、合规方案协同 | 熙载咨询',
    description:
      '熙载咨询提供产业金融咨询与融资方案协同服务，强调真实交易背景、权属清晰、合规边界和持牌机构执行，不经手客户资金、不提供担保、不承诺融资结果。',
    summary:
      '面向实体产业项目、建筑央企上下游、地方国企平台和成长型企业，提供供应链融资咨询、项目资金需求诊断、材料梳理、合规路径判断和持牌机构沟通协同。',
    items: financeDirections.map((item) => item.title),
    keywords: ['产业金融咨询', '供应链融资咨询', '项目资金需求诊断', '合规融资方案', '企业信用提升'],
  },
];

const staticPages = [
  {
    slug: '',
    title: '熙载咨询（北京）有限公司 | 县域产业与中小企业发展服务机构',
    description:
      '熙载咨询（北京）有限公司面向地方政府、产业平台、央国企下属单位及成长型企业，提供地方产业咨询、企业政策与评价服务、招商项目包装、政企协同和产业金融咨询服务。',
    priority: '1.0',
    sections: [
      {
        heading: '熙载咨询是谁',
        paragraphs: [
          '熙载咨询是一家面向县域产业与中小企业发展服务的综合咨询机构，重视资源协同、方案组织、项目推进和合规边界。',
          '公司服务地方政府、产业平台、央国企下属单位及成长型企业，围绕产业咨询、项目包装、企业评价、政策申报与政企协同，提供可落地的专业支持。',
        ],
      },
      {
        heading: '核心服务方向',
        list: servicePages.map((service) => service.title),
      },
      {
        heading: '合作对象',
        list: partnerTypes,
      },
    ],
  },
  {
    slug: 'about',
    title: '关于熙载 | 熙载咨询（北京）有限公司',
    description:
      '了解熙载咨询（北京）有限公司。熙载咨询面向县域产业与中小企业发展服务，重视专业资源协同、方案组织、项目推进和合规边界。',
    priority: '0.9',
    sections: [
      {
        heading: '公司定位',
        paragraphs: [
          '熙载咨询是一家面向县域产业与中小企业发展服务的综合咨询机构，服务对象包括地方政府平台、园区、国有企业、建筑央企上下游、农业产业企业和成长型中小企业。',
          '公司不以空泛概念包装为目标，而是把产业判断、企业材料、政策路径、项目逻辑和资源协同落到具体服务场景中。',
        ],
      },
      {
        heading: '文化理念',
        paragraphs: [
          '“熙载”为地，为坤厚载物之德；“太和”为天，为乾元通达之道。二者合为《易经》地天泰之象，寓意上下贯通、资源流动、万物通达、百业兴盛。',
          '熙载咨询以专业资源协同为支撑，以县域产业和中小企业需求为服务入口，推动协会、科研、专家、金融、地方平台和企业资源进入具体项目场景。',
        ],
      },
      {
        heading: '价值观',
        list: values.map((value) => `${value.title}：${value.text}`),
      },
    ],
  },
  {
    slug: 'services',
    title: '业务服务 | 地方产业咨询、企业评价、项目包装、政企协同 | 熙载咨询',
    description:
      '熙载咨询业务服务包括地方产业咨询、企业政策与评价服务、招商项目包装、政企协同与资源对接、产业金融咨询与融资方案协同服务。',
    priority: '0.95',
    sections: [
      {
        heading: '四类核心服务',
        paragraphs: ['熙载咨询不做空泛咨询，聚焦产业判断、材料成型、项目包装、评价申报和政企协同。'],
        cards: servicePages.map((service) => ({
          title: service.title,
          text: service.summary,
          href: `/services/${service.slug}`,
        })),
      },
      {
        heading: '服务详情',
        paragraphs: ['从需求判断、材料整理、方案组织到推进清单，熙载咨询强调边界清晰、材料清晰和结果可交付。'],
        cards: serviceDetails.map((service) => ({
          title: service.title,
          text: `${service.summary} 主要工作：${service.work.join('、')}。交付内容：${service.deliverables.join('、')}。`,
          href: service.title === '产业金融咨询' ? '/finance' : `/services/${servicePages.find((item) => item.title === service.title)?.slug ?? ''}`,
        })),
      },
      {
        heading: '典型服务场景',
        cards: serviceScenarios.map((scenario) => ({
          title: scenario.title,
          text: `${scenario.problem} ${scenario.support} ${scenario.output}`,
        })),
      },
    ],
  },
  {
    slug: 'finance',
    title: '产业金融咨询 | 合规融资方案协同服务 | 熙载咨询',
    description:
      '熙载咨询提供产业金融咨询、项目诊断、方案协同和持牌机构对接服务，强调不经手客户资金、不提供担保、不承诺融资结果。',
    priority: '0.85',
    sections: [
      {
        heading: '服务定位',
        paragraphs: [
          '熙载咨询定位为实体产业与金融机构之间的翻译者、组织者和方案协同者。以产业为根，以信用为桥，以资产为底，以合规为界。',
          '不做资金中介，做产业金融的翻译者与组织者。',
        ],
      },
      {
        heading: '服务方向',
        list: financeDirections.map((item) => `${item.title}：${item.text}`),
      },
      {
        heading: '合规边界',
        list: complianceRules.map((rule) => `${rule.title}：${rule.text}`),
      },
    ],
  },
  {
    slug: 'methodology',
    title: '熙载五法 | 观势、识企、聚源、成案、落地 | 熙载咨询',
    description:
      '熙载咨询以观势、识企、聚源、成案、落地为核心方法，把需求变成路径，把资源变成项目，把合作变成结果。',
    priority: '0.75',
    sections: [
      {
        heading: '熙载五法',
        list: methods.map((method) => `${method.title}：${method.text}`),
      },
    ],
  },
  {
    slug: 'network',
    title: '服务网络 | 首都资源枢纽、省域项目节点、县域服务触点 | 熙载咨询',
    description:
      '熙载咨询通过总部资源组织、省域项目推进、县域服务触点和合作伙伴网络，形成资源下沉与需求上达的双向通道。',
    priority: '0.75',
    sections: [
      {
        heading: '服务网络',
        cards: networkNodes.map((node) => ({
          title: node.title,
          text: `${node.subtitle}。${node.text}`,
        })),
      },
    ],
  },
  {
    slug: 'contact',
    title: '联系熙载咨询 | 地方产业咨询、企业评价、项目包装合作咨询',
    description:
      '联系熙载咨询（北京）有限公司。合作方向包括地方产业咨询、企业评价、政策申报、项目包装、政企协同和产业金融咨询。',
    priority: '0.8',
    sections: [
      {
        heading: '合作咨询',
        paragraphs: [
          '如需就地方产业咨询、企业评价、政策申报、项目包装、政企协同或产业金融咨询事项沟通，欢迎联系熙载咨询。',
          `微信公众号：${wechatAccount.name}。微信搜一搜：${wechatAccount.name}。`,
        ],
        list: publicEmailContacts.map((contact) => `${contact.label}：${contact.email}。${contact.text}`),
      },
    ],
  },
];

const allSeoUrls = [];

const escapeHtml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

const cleanOutput = (value) => String(value).replace(/[ \t]+$/gm, '');

const urlForSlug = (slug) => (slug ? `${siteUrl}/${slug}` : `${siteUrl}/`);

const renderList = (items) => items.map((item) => `<li>${escapeHtml(item)}</li>`).join('\n');

const renderParagraphs = (items = []) => items.map((item) => `<p>${escapeHtml(item)}</p>`).join('\n');

const renderCards = (cards = []) =>
  cards
    .map(
      (card) => `<article class="card">
          <h2>${escapeHtml(card.title)}</h2>
          <p>${escapeHtml(card.text)}</p>
          ${card.href ? `<a href="${card.href}">查看详情</a>` : ''}
        </article>`,
    )
    .join('\n');

const renderSections = (sections = []) =>
  sections
    .map(
      (section) => `<section>
        <h2>${escapeHtml(section.heading)}</h2>
        ${renderParagraphs(section.paragraphs)}
        ${section.list ? `<ul>${renderList(section.list)}</ul>` : ''}
        ${section.cards ? `<div class="cards">${renderCards(section.cards)}</div>` : ''}
      </section>`,
    )
    .join('\n');

const themeBootScript = `(function(){try{var key='xizai-theme';var stored=localStorage.getItem(key);var preference=stored==='light'||stored==='dark'||stored==='system'?stored:'system';var systemDark=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches;var theme=preference==='system'?(systemDark?'dark':'light'):preference;document.documentElement.dataset.theme=theme;document.documentElement.dataset.themePreference=preference;document.documentElement.style.colorScheme=theme;document.querySelector('meta[name="theme-color"]')?.setAttribute('content',theme==='dark'?'#07111F':'#0D1B2A');}catch(error){document.documentElement.dataset.theme='light';document.documentElement.dataset.themePreference='system';}})();`;

const themeClientScript = `(function(){var key='xizai-theme';var labels={system:'跟随系统',light:'浅色',dark:'深色'};var order=['system','light','dark'];var button=document.querySelector('[data-theme-toggle]');function valid(value){return order.indexOf(value)>-1;}function systemTheme(){return window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}function apply(preference,save){if(!valid(preference)){preference='system';}var theme=preference==='system'?systemTheme():preference;document.documentElement.dataset.theme=theme;document.documentElement.dataset.themePreference=preference;document.documentElement.style.colorScheme=theme;document.querySelector('meta[name="theme-color"]')?.setAttribute('content',theme==='dark'?'#07111F':'#0D1B2A');if(save){if(preference==='system'){localStorage.removeItem(key);}else{localStorage.setItem(key,preference);}}if(button){button.textContent=labels[preference];button.setAttribute('aria-label','切换主题，当前为'+labels[preference]);}}var current=document.documentElement.dataset.themePreference||'system';apply(current,false);if(button){button.addEventListener('click',function(){var next=order[(order.indexOf(document.documentElement.dataset.themePreference||'system')+1)%order.length];apply(next,true);});}if(window.matchMedia){window.matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change',function(){if((document.documentElement.dataset.themePreference||'system')==='system'){apply('system',false);}});}})();`;

const buildOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: companyName,
      alternateName: siteName,
      url: `${siteUrl}/`,
      logo: `${siteUrl}/favicon.svg`,
      image: ogImage,
      email: publicEmailContacts[0].email,
      address: {
        '@type': 'PostalAddress',
        addressLocality: '北京市',
        addressCountry: 'CN',
      },
      areaServed: {
        '@type': 'Country',
        name: '中国',
      },
      knowsAbout: [
        '县域产业咨询',
        '中小企业服务',
        '企业信用评价',
        '政策项目申报',
        '招商项目包装',
        '政企协同',
        '产业金融咨询',
      ],
      contactPoint: publicEmailContacts.slice(0, 2).map((contact) => ({
        '@type': 'ContactPoint',
        contactType: contact.label,
        email: contact.email,
        availableLanguage: ['zh-CN'],
      })),
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: siteName,
      publisher: {
        '@id': `${siteUrl}/#organization`,
      },
      inLanguage: 'zh-CN',
    },
  ],
});

const buildPageSchema = (page, canonicalUrl) => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${canonicalUrl}#webpage`,
  url: canonicalUrl,
  name: page.title,
  description: page.description,
  inLanguage: 'zh-CN',
  isPartOf: {
    '@id': `${siteUrl}/#website`,
  },
  about: {
    '@id': `${siteUrl}/#organization`,
  },
});

const buildServiceSchema = (service, canonicalUrl) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${canonicalUrl}#service`,
  name: service.title,
  description: service.description,
  serviceType: service.title,
  areaServed: {
    '@type': 'Country',
    name: '中国',
  },
  provider: {
    '@id': `${siteUrl}/#organization`,
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: `${service.title}服务内容`,
    itemListElement: service.items.map((item) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: item,
      },
    })),
  },
});

const buildBreadcrumbSchema = (items) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

const buildServiceCatalogSchema = (canonicalUrl) => ({
  '@type': 'ItemList',
  '@id': `${canonicalUrl}#service-catalog`,
  name: '熙载咨询核心服务目录',
  itemListElement: servicePages.map((service, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: `${siteUrl}/services/${service.slug}`,
    name: service.title,
    description: service.summary,
  })),
});

const buildScenarioListSchema = (canonicalUrl) => ({
  '@type': 'ItemList',
  '@id': `${canonicalUrl}#service-scenarios`,
  name: '熙载咨询典型服务场景',
  itemListElement: serviceScenarios.map((scenario, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: scenario.title,
    description: `${scenario.problem} ${scenario.support} ${scenario.output}`,
  })),
});

const buildArticleSchema = (article, canonicalUrl) => ({
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
});

const pageShell = ({ title, description, canonicalUrl, body, jsonLd, ogType = 'website', keywords = [] }) => `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#0D1B2A" />
    <script>${themeBootScript}</script>
    <meta name="description" content="${escapeHtml(description)}" />
    ${keywords.length ? `<meta name="keywords" content="${escapeHtml(keywords.join(','))}" />` : ''}
    <meta name="author" content="${companyName}" />
    <meta name="application-name" content="${siteName}" />
    <meta name="applicable-device" content="pc,mobile" />
    <meta name="renderer" content="webkit" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="referrer" content="strict-origin-when-cross-origin" />
    <meta name="format-detection" content="telephone=no" />
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
    <script type="application/ld+json">${JSON.stringify(jsonLd, null, 2)}</script>
    <style>
      :root {
        color-scheme: light;
        --font-sans: "PingFang SC", "Microsoft YaHei", "Noto Sans SC", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;
        --font-serif: "Noto Serif SC", "Source Han Serif SC", "Songti SC", "SimSun", serif;
        --ink: #0d1b2a;
        --navy: #10233f;
        --gold: #c8a46b;
        --ivory: #f7f4ec;
        --muted: #6b7280;
        --surface: #fffdf8;
        --line: rgba(16, 35, 63, 0.12);
        --shadow: 0 18px 42px rgba(13, 27, 42, 0.08);
      }

      :root[data-theme='dark'] {
        color-scheme: dark;
        --ink: #f2eadc;
        --navy: #fff8ed;
        --ivory: #07111f;
        --muted: #aeb9c8;
        --surface: #101f33;
        --line: rgba(247, 244, 236, 0.14);
        --shadow: 0 18px 42px rgba(0, 0, 0, 0.28);
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        color: var(--ink);
        background: var(--ivory);
        font-family: var(--font-sans);
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
        background: #0d1b2a;
      }

      .brand {
        font-weight: 800;
        text-decoration: none;
      }

      .nav {
        display: flex;
        flex-wrap: wrap;
        gap: 18px;
        color: rgba(247, 244, 236, 0.78);
        font-size: 14px;
      }

      .nav a {
        text-decoration: none;
      }

      .theme-toggle-static {
        min-height: 34px;
        padding: 0 12px;
        border: 1px solid rgba(247, 244, 236, 0.34);
        border-radius: 8px;
        color: rgba(247, 244, 236, 0.88);
        background: transparent;
        font: inherit;
        font-size: 13px;
        font-weight: 700;
        cursor: pointer;
      }

      main {
        width: min(960px, calc(100% - 40px));
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
        font-family: var(--font-serif);
        font-size: clamp(2rem, 5vw, 3.8rem);
        line-height: 1.18;
      }

      .lead {
        margin: 24px 0 32px;
        padding: 22px 24px;
        border-left: 4px solid var(--gold);
        color: var(--ink);
        background: var(--surface);
        font-size: 18px;
      }

      section {
        margin-top: 34px;
      }

      h2 {
        margin: 0 0 14px;
        color: var(--navy);
        font-family: var(--font-serif);
        font-size: 26px;
      }

      li {
        margin: 8px 0;
      }

      .cards {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 18px;
      }

      .card {
        padding: 22px;
        border: 1px solid var(--line);
        border-radius: 8px;
        background: var(--surface);
        box-shadow: var(--shadow);
      }

      .card h2 {
        font-size: 22px;
      }

      .card a,
      .back {
        display: inline-flex;
        margin-top: 14px;
        color: var(--navy);
        font-weight: 800;
      }

      .source {
        margin-top: 42px;
        padding: 20px 22px;
        border: 1px solid var(--line);
        background: var(--surface);
      }

      .back {
        padding: 12px 18px;
        border-radius: 8px;
        color: var(--ivory);
        background: #10233f;
        text-decoration: none;
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
        }

        .theme-toggle-static {
          margin-top: 14px;
        }

        .cards {
          grid-template-columns: 1fr;
        }
      }
    </style>
  </head>
  <body>
    <header class="topbar">
      <a class="brand" href="/#home">${companyName}</a>
      <nav class="nav" aria-label="主导航">
        <a href="/about">关于熙载</a>
        <a href="/services">业务服务</a>
        <a href="/finance">产业金融</a>
        <a href="/insights">研究洞察</a>
        <a href="/contact">联系我们</a>
        <button class="theme-toggle-static" type="button" data-theme-toggle aria-label="切换主题">跟随系统</button>
      </nav>
    </header>
    ${body}
    <footer>
      <span>© ${new Date().getFullYear()} ${companyName}</span>
      <span> · 县域产业与中小企业发展服务机构</span>
    </footer>
    <script>${themeClientScript}</script>
  </body>
</html>
`;

const writePage = async ({ slug, html, priority = '0.7', lastmod = today, changefreq = 'monthly' }) => {
  if (!slug) {
    allSeoUrls.push({
      loc: urlForSlug(slug),
      lastmod,
      changefreq,
      priority,
    });
    return;
  }

  const target = slug ? path.join(publicDir, slug) : publicDir;
  await mkdir(target, { recursive: true });
  await writeFile(path.join(target, 'index.html'), cleanOutput(html), 'utf8');

  if (slug) {
    await writeFile(path.join(publicDir, `${slug}.html`), cleanOutput(html), 'utf8');
  }

  allSeoUrls.push({
    loc: urlForSlug(slug),
    lastmod,
    changefreq,
    priority,
  });
};

const renderStaticPage = (page) => {
  const canonicalUrl = urlForSlug(page.slug);
  const organizationSchema = buildOrganizationSchema();
  const graph = [
    organizationSchema['@graph'][0],
    organizationSchema['@graph'][1],
    buildPageSchema(page, canonicalUrl),
    buildBreadcrumbSchema([
      { name: '首页', url: `${siteUrl}/` },
      ...(page.slug ? [{ name: page.title.split('|')[0].trim(), url: canonicalUrl }] : []),
    ]),
  ];

  if (page.slug === 'services') {
    graph.push(buildServiceCatalogSchema(canonicalUrl), buildScenarioListSchema(canonicalUrl));
  }

  const body = `<main>
      <span class="eyebrow">熙载咨询</span>
      <h1>${escapeHtml(page.title.split('|')[0].trim())}</h1>
      <p class="lead">${escapeHtml(page.description)}</p>
      ${renderSections(page.sections)}
      <a class="back" href="/#home">进入官网首页</a>
    </main>`;

  return pageShell({
    title: page.title,
    description: page.description,
    canonicalUrl,
    body,
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': graph,
    },
    keywords: [
      '熙载咨询',
      '县域产业咨询',
      '中小企业服务',
      '企业信用评价',
      '政策项目申报',
      '招商项目包装',
      '政企协同',
      '产业金融咨询',
    ],
  });
};

const renderServicePage = (service) => {
  const slug = `services/${service.slug}`;
  const canonicalUrl = urlForSlug(slug);
  const detail = serviceDetails.find((item) => item.title === service.title);
  const organizationSchema = buildOrganizationSchema();
  const body = `<main>
      <span class="eyebrow">业务服务</span>
      <h1>${escapeHtml(service.title)}</h1>
      <p class="lead">${escapeHtml(service.summary)}</p>
      <section>
        <h2>服务内容</h2>
        <ul>${renderList(service.items)}</ul>
      </section>
      ${
        detail
          ? `<section>
        <h2>服务交付方式</h2>
        <p>${escapeHtml(detail.summary)}</p>
        <h3>主要工作</h3>
        <ul>${renderList(detail.work)}</ul>
        <h3>交付内容</h3>
        <ul>${renderList(detail.deliverables)}</ul>
        <h3>适合对象</h3>
        <p>${escapeHtml(detail.suitableFor.join('、'))}</p>
        <h3>形成结果</h3>
        <p>${escapeHtml(detail.result)}</p>
      </section>`
          : ''
      }
      <section>
        <h2>适合搜索与合作的业务关键词</h2>
        <ul>${renderList(service.keywords)}</ul>
      </section>
      <section>
        <h2>服务说明</h2>
        <p>${escapeHtml(service.description)}</p>
      </section>
      <a class="back" href="/services">返回业务服务</a>
    </main>`;

  return pageShell({
    title: service.fullTitle,
    description: service.description,
    canonicalUrl,
    body,
    ogType: 'website',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        organizationSchema['@graph'][0],
        buildServiceSchema(service, canonicalUrl),
        buildBreadcrumbSchema([
          { name: '首页', url: `${siteUrl}/` },
          { name: '业务服务', url: `${siteUrl}/services` },
          { name: service.title, url: canonicalUrl },
        ]),
      ],
    },
    keywords: ['熙载咨询', ...service.keywords],
  });
};

const renderArticlePage = (article) => {
  const slug = `insights/${article.slug}`;
  const canonicalUrl = urlForSlug(slug);
  const title = `${article.title} | 研究洞察 | ${siteName}`;
  const organizationSchema = buildOrganizationSchema();
  const body = `<main>
      <article>
        <span class="eyebrow">${escapeHtml(article.category)}</span>
        <h1>${escapeHtml(article.title)}</h1>
        <p class="lead">${escapeHtml(article.summary)}</p>
        <section>
          <h2>行业要点</h2>
          <ul>${renderList(article.keyPoints)}</ul>
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
        <a class="back" href="/insights">返回研究洞察</a>
      </article>
    </main>`;

  return pageShell({
    title,
    description: article.summary,
    canonicalUrl,
    body,
    ogType: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        organizationSchema['@graph'][0],
        buildArticleSchema(article, canonicalUrl),
        buildBreadcrumbSchema([
          { name: '首页', url: `${siteUrl}/` },
          { name: '研究洞察', url: `${siteUrl}/insights` },
          { name: article.title, url: canonicalUrl },
        ]),
      ],
    },
    keywords: ['熙载咨询', article.category, ...article.tags],
  });
};

const renderInsightIndexPage = () => {
  const slug = 'insights';
  const canonicalUrl = urlForSlug(slug);
  const title = `研究洞察 | 县域产业、中小企业服务、企业信用与产业金融合规观察 | ${siteName}`;
  const description = '熙载咨询研究洞察，聚焦县域产业、中小企业服务、企业信用和合规产业金融相关公开信息。';
  const organizationSchema = buildOrganizationSchema();
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
    title,
    description,
    canonicalUrl,
    body,
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        organizationSchema['@graph'][0],
        {
          '@type': 'CollectionPage',
          '@id': `${canonicalUrl}#collection`,
          url: canonicalUrl,
          name: title,
          description,
          inLanguage: 'zh-CN',
          hasPart: insightArticles.map((article) => ({
            '@type': 'Article',
            headline: article.title,
            url: `${siteUrl}/insights/${article.slug}`,
            datePublished: article.date,
          })),
        },
        buildBreadcrumbSchema([
          { name: '首页', url: `${siteUrl}/` },
          { name: '研究洞察', url: canonicalUrl },
        ]),
      ],
    },
    keywords: ['熙载咨询', '县域产业观察', '中小企业服务研究', '产业金融合规观察'],
  });
};

const renderSitemapXml = () => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allSeoUrls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

const renderSitemapTxt = () => `${allSeoUrls.map((url) => url.loc).join('\n')}\n`;

const renderRedirectPage = (target, title = '页面已迁移') => `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="refresh" content="0; url=${target}" />
    <meta name="robots" content="noindex, follow" />
    <link rel="canonical" href="${siteUrl}${target}" />
    <title>${title} | ${siteName}</title>
    <script>location.replace('${target}');</script>
  </head>
  <body>
    <main style="max-width:720px;margin:80px auto;padding:0 20px;font-family:PingFang SC,Microsoft YaHei,Arial,sans-serif;line-height:1.8;">
      <h1>${title}</h1>
      <p>原新闻路径已调整为研究洞察栏目。</p>
      <p><a href="${target}">进入研究洞察</a></p>
    </main>
  </body>
</html>
`;

await Promise.all([
  rm(path.join(publicDir, 'insights'), { recursive: true, force: true }),
  rm(path.join(publicDir, 'services'), { recursive: true, force: true }),
  rm(path.join(publicDir, 'about'), { recursive: true, force: true }),
  rm(path.join(publicDir, 'finance'), { recursive: true, force: true }),
  rm(path.join(publicDir, 'methodology'), { recursive: true, force: true }),
  rm(path.join(publicDir, 'network'), { recursive: true, force: true }),
  rm(path.join(publicDir, 'contact'), { recursive: true, force: true }),
  rm(path.join(publicDir, 'news'), { recursive: true, force: true }),
]);

for (const page of staticPages) {
  await writePage({
    slug: page.slug,
    html: renderStaticPage(page),
    priority: page.priority,
  });
}

for (const service of servicePages) {
  await writePage({
    slug: `services/${service.slug}`,
    html: renderServicePage(service),
    priority: '0.82',
  });
}

await writePage({
  slug: 'insights',
  html: renderInsightIndexPage(),
  priority: '0.75',
});
await writeFile(path.join(publicDir, 'insights.html'), cleanOutput(renderInsightIndexPage()), 'utf8');

for (const article of insightArticles) {
  const slug = `insights/${article.slug}`;
  const html = renderArticlePage(article);
  await writePage({
    slug,
    html,
    priority: '0.7',
    lastmod: article.date,
    changefreq: 'yearly',
  });
}

await writeFile(path.join(publicDir, 'sitemap.xml'), cleanOutput(renderSitemapXml()), 'utf8');
await writeFile(path.join(publicDir, 'sitemap.txt'), cleanOutput(renderSitemapTxt()), 'utf8');
await mkdir(path.join(publicDir, 'news'), { recursive: true });
await writeFile(path.join(publicDir, 'news', 'index.html'), cleanOutput(renderRedirectPage('/insights', '新闻栏目已迁移')), 'utf8');
await writeFile(path.join(publicDir, 'news.html'), cleanOutput(renderRedirectPage('/insights', '新闻栏目已迁移')), 'utf8');

console.log(`Generated ${allSeoUrls.length} SEO pages and sitemap entries.`);
