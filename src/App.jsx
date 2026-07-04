import { useEffect, useState } from 'react';
import SiteHeader from './components/SiteHeader.jsx';
import SiteFooter from './components/SiteFooter.jsx';
import SectionHeader from './components/SectionHeader.jsx';
import PageHero from './components/PageHero.jsx';
import ServiceCard from './components/ServiceCard.jsx';
import InsightCard from './components/InsightCard.jsx';
import CaseScenarioCard from './components/CaseScenarioCard.jsx';
import CTASection from './components/CTASection.jsx';
import ContactBlock from './components/ContactBlock.jsx';
import MethodCard from './components/MethodCard.jsx';
import Reveal from './components/Reveal.jsx';
import ComplianceCard from './components/ComplianceCard.jsx';
import { businessServices, serviceDetails, serviceOutcomes, serviceScenarios } from './data/services.js';
import { methods, networkNodes, partnerTypes, values } from './data/culture.js';
import { complianceRules, financeDirections } from './data/finance.js';
import { insightArticles } from './data/insights.js';
import { cooperationOptions, publicEmailContacts } from './data/siteData.js';
import { assetScenes, siteImages } from './data/media.js';
import { insightPathFor, updatePageSeo } from './utils/seo.js';

const getInsightSlugFromHash = () => {
  if (typeof window === 'undefined') {
    return '';
  }

  const prefix = '#insights/';
  return window.location.hash.startsWith(prefix) ? decodeURIComponent(window.location.hash.slice(prefix.length)) : '';
};

const getInsightSlugFromPath = () => {
  if (typeof window === 'undefined') {
    return '';
  }

  const prefix = '/insights/';
  const pathname = window.location.pathname.replace(/\/$/, '');
  return pathname.startsWith(prefix) ? decodeURIComponent(pathname.slice(prefix.length)) : '';
};

const getInsightSlugFromLocation = () => getInsightSlugFromHash() || getInsightSlugFromPath();

const legacySectionIds = new Set(['about', 'services', 'finance', 'methodology', 'network', 'insights', 'contact']);

const heroProofs = [
  { label: '服务对象', value: '地方政府、产业平台、央国企下属单位、成长型企业' },
  { label: '典型事项', value: '产业咨询、项目包装、企业评价、政策申报、政企协同' },
  { label: '交付成果', value: '可汇报、可申报、可沟通、可推进的项目材料' },
];

const serviceEntryLinks = [
  { label: '地方产业咨询', href: '/#services', text: '产业定位、农业产业链、园区发展、招商方向' },
  { label: '企业政策与评价', href: '/#services', text: 'AAA信用评价、协会评价、资质材料、政策申报' },
  { label: '招商项目包装', href: '/#services', text: '项目建议书、招商手册、汇报材料、合作方案' },
  { label: '政企协同', href: '/#services', text: '会议筹备、项目协调、资源连接、平台共建' },
];

const visualServiceScenes = assetScenes;

const serviceKeywordMap = [
  { keywords: ['县域', '农业', '产业', '园区', '招商'], services: ['地方产业咨询', '招商项目包装'] },
  { keywords: ['中小企业', '信用', '评价', '政策', '资质', '合规'], services: ['企业政策与评价服务', '政企协同与资源对接'] },
  { keywords: ['融资', '金融', '贷款', '供应链', '资金'], services: ['产业金融咨询', '企业政策与评价服务'] },
];

const getRelatedArticles = (article) => {
  if (!article) {
    return [];
  }

  return insightArticles
    .filter((item) => item.slug !== article.slug)
    .filter((item) => item.category === article.category || item.tags.some((tag) => article.tags.includes(tag)))
    .slice(0, 3);
};

const getRelatedServices = (article) => {
  if (!article) {
    return [];
  }

  const text = [article.category, article.title, article.summary, ...article.tags].join(' ');
  const serviceNames = serviceKeywordMap
    .filter((group) => group.keywords.some((keyword) => text.includes(keyword)))
    .flatMap((group) => group.services);
  const uniqueNames = [...new Set(serviceNames.length ? serviceNames : ['地方产业咨询', '企业政策与评价服务'])];

  return serviceDetails.filter((service) => uniqueNames.includes(service.title)).slice(0, 3);
};

const scrollToInsights = () => {
  window.requestAnimationFrame(() => {
    document.getElementById('insights')?.scrollIntoView({ block: 'start' });
  });
};

function App() {
  const [formStatus, setFormStatus] = useState('');
  const [activeInsightSlug, setActiveInsightSlug] = useState(getInsightSlugFromLocation);
  const activeInsight = insightArticles.find((article) => article.slug === activeInsightSlug);
  const relatedArticles = getRelatedArticles(activeInsight);
  const relatedServices = getRelatedServices(activeInsight);
  const featuredInsight = insightArticles[0];
  const secondaryInsights = insightArticles.slice(1);

  useEffect(() => {
    const section = new URLSearchParams(window.location.search).get('section');

    if (!section || !legacySectionIds.has(section)) {
      return;
    }

    window.history.replaceState(null, '', `/#${section}`);
    window.requestAnimationFrame(() => {
      document.getElementById(section)?.scrollIntoView({ block: 'start' });
    });
  }, []);

  useEffect(() => {
    const syncInsightRoute = () => {
      const nextSlug = getInsightSlugFromLocation();
      setActiveInsightSlug(nextSlug);

      if (nextSlug) {
        scrollToInsights();
      }
    };

    syncInsightRoute();
    window.addEventListener('hashchange', syncInsightRoute);
    window.addEventListener('popstate', syncInsightRoute);
    return () => {
      window.removeEventListener('hashchange', syncInsightRoute);
      window.removeEventListener('popstate', syncInsightRoute);
    };
  }, []);

  useEffect(() => {
    updatePageSeo(activeInsight);
  }, [activeInsight]);

  const openInsight = (event, slug) => {
    event.preventDefault();
    window.history.pushState(null, '', insightPathFor(slug));
    setActiveInsightSlug(slug);
    scrollToInsights();
  };

  const closeInsight = (event) => {
    event.preventDefault();
    window.history.pushState(null, '', '/#insights');
    setActiveInsightSlug('');
    scrollToInsights();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const recipient = publicEmailContacts[0].email;
    const subject = `官网合作意向 - ${formData.get('organization') || formData.get('name') || '未填写单位'}`;
    const body = [
      `姓名：${formData.get('name') || ''}`,
      `单位名称：${formData.get('organization') || ''}`,
      `联系电话：${formData.get('phone') || ''}`,
      `联系邮箱：${formData.get('email') || ''}`,
      `合作方向：${formData.get('direction') || ''}`,
      '',
      '需求说明：',
      formData.get('message') || '',
    ].join('\n');

    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setFormStatus(`已为您生成邮件内容。如邮件客户端未自动打开，请直接发送至 ${recipient}。`);
  };

  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="专业资源协同 · 县域产业 · 中小企业服务"
          title="熙载咨询"
          subtitle="县域产业与中小企业发展服务机构"
          text="服务地方政府、产业平台、央国企下属单位及成长型企业，围绕产业咨询、项目包装、企业评价、政策申报与政企协同，提供可落地的专业支持。"
          actions={[
            { label: '了解核心服务', href: '/#services' },
            { label: '联系合作', href: '/#contact', variant: 'ghost' },
          ]}
          proofs={heroProofs}
          symbol={{
            title: '地天交泰，百业通达',
            text: '上坤下乾，象征上下贯通、资源流动。用于表达咨询机构的组织、连接和落地能力。',
          }}
          media={siteImages.hero}
        />

        <section className="quick-entry" aria-label="核心服务入口">
          <div className="container quick-entry__grid">
            {serviceEntryLinks.map((item) => (
              <a href={item.href} className="quick-entry__item" key={item.label}>
                <span>{item.label}</span>
                <strong>{item.text}</strong>
              </a>
            ))}
          </div>
        </section>

        <section className="section intro" id="about">
          <div className="container intro__grid">
            <SectionHeader eyebrow="关于熙载" title="熙载咨询（北京）有限公司">
              熙载咨询是一家面向县域产业与中小企业发展服务的综合咨询机构，重视资源协同、方案组织、项目推进和合规边界。
            </SectionHeader>
            <div className="intro__panel">
              <h3>文化理念：熙载太和</h3>
              <p>
                “熙载”为地，为坤厚载物之德；“太和”为天，为乾元通达之道。二者合为《易经》地天泰之象，寓意上下贯通、资源流动、万物通达、百业兴盛。
              </p>
              <p>
                熙载为地，太和为天；地天交泰，百业通达。公司以专业资源协同为支撑，以县域产业和中小企业需求为服务入口，推动协会、科研、专家、金融、地方平台和企业资源进入具体项目场景。
              </p>
            </div>
          </div>

          <div className="container culture-grid">
            <article>
              <span>使命</span>
              <p>以专业资源协同，服务县域产业与中小企业成长。</p>
            </article>
            <article>
              <span>愿景</span>
              <p>成为中国县域产业与中小企业发展服务领域值得信赖的综合咨询机构。</p>
            </article>
            <article>
              <span>精神</span>
              <p>厚载、通达、明势、成业。</p>
            </article>
          </div>

          <div className="container visual-strip" aria-label="服务场景图片">
            {visualServiceScenes.map((image) => (
              <figure key={image.src}>
                <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
              </figure>
            ))}
          </div>
        </section>

        <section className="section section--warm" id="services">
          <div className="container">
            <SectionHeader eyebrow="业务服务" title="围绕地方产业与企业成长的四类核心服务" align="center">
              不做空泛咨询，聚焦产业判断、材料成型、项目包装、评价申报和政企协同。
            </SectionHeader>
            <div className="service-showcase">
              <figure className="media-frame">
                <img src={siteImages.countyAgriculture.src} alt={siteImages.countyAgriculture.alt} loading="lazy" decoding="async" />
              </figure>
              <div className="service-showcase__content">
                <span className="eyebrow">服务能力矩阵</span>
                <h3>把产业判断、企业材料、项目包装和协同推进放在同一个工作台</h3>
                <p>
                  参考国际咨询机构的服务组织方式，熙载咨询把服务拆成能力、对象和交付三条线：先识别产业和企业真实问题，再组织材料、资源和协同路径。
                </p>
                <div className="service-axis">
                  <span>产业定位</span>
                  <span>企业评价</span>
                  <span>项目包装</span>
                  <span>政企协同</span>
                  <span>合规金融</span>
                </div>
              </div>
            </div>
            <div className="business-grid">
              {businessServices.map((service, index) => (
                <Reveal as="div" delay={Math.min(index * 0.04, 0.18)} key={service.title}>
                  <ServiceCard service={service} index={index} />
                </Reveal>
              ))}
            </div>
            <div className="service-details" aria-labelledby="service-details-title">
              <div className="service-details__head">
                <span className="eyebrow">服务详情</span>
                <h3 id="service-details-title">从需求判断到材料交付，明确每类服务的工作边界</h3>
                <p>把服务拆成主要工作、交付内容、适合对象和形成结果，方便合作方快速判断是否匹配。</p>
              </div>
              <div className="service-detail-grid">
                {serviceDetails.map((service, index) => (
                  <Reveal as="article" className="service-detail-card" delay={Math.min(index * 0.04, 0.2)} key={service.title}>
                    <div className="service-detail-card__title">
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <h4>{service.title}</h4>
                    </div>
                    <p className="service-detail-card__summary">{service.summary}</p>
                    <div className="service-detail-card__columns">
                      <div>
                        <strong>主要工作</strong>
                        <ul>
                          {service.work.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <strong>交付内容</strong>
                        <ul>
                          {service.deliverables.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="service-detail-card__fit">
                      <strong>适合对象</strong>
                      <p>{service.suitableFor.join('、')}</p>
                    </div>
                    <p className="service-detail-card__result">{service.result}</p>
                  </Reveal>
                ))}
              </div>
            </div>
            <div className="service-outcomes">
              <div className="service-outcomes__head">
                <span className="eyebrow">典型服务成果</span>
                <h3>不披露客户名称，也能说明服务能交付什么</h3>
              </div>
              <div className="outcome-grid">
                {serviceOutcomes.map((outcome, index) => (
                  <Reveal as="article" delay={Math.min(index * 0.04, 0.16)} key={outcome.title}>
                    <h4>{outcome.title}</h4>
                    <p>{outcome.text}</p>
                  </Reveal>
                ))}
              </div>
            </div>
            <div className="service-scenarios" aria-labelledby="service-scenarios-title">
              <div className="service-scenarios__head">
                <span className="eyebrow">典型服务场景</span>
                <h3 id="service-scenarios-title">客户通常不是缺概念，而是缺一套能落地的组织方式</h3>
                <p>以下场景覆盖地方产业、企业评价、项目包装、政策申报、政企协同与产业金融合规咨询。</p>
              </div>
              <div className="scenario-grid">
                {serviceScenarios.map((scenario, index) => (
                  <Reveal as="div" delay={Math.min(index * 0.035, 0.18)} key={scenario.title}>
                    <CaseScenarioCard scenario={scenario} index={index} />
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section finance" id="finance">
          <div className="container finance__intro">
            <SectionHeader eyebrow="产业金融" title="产业金融咨询与融资方案协同服务">
              熙载咨询定位为实体产业与金融机构之间的翻译者、组织者和方案协同者。以产业为根，以信用为桥，以资产为底，以合规为界。
            </SectionHeader>
            <div className="finance-side">
              <div className="quote-panel">
                不做资金中介，做产业金融的翻译者与组织者。
                <span>金融服务产业，信用承载发展。</span>
              </div>
              <figure className="media-frame media-frame--finance">
                <img src={siteImages.industryEnergy.src} alt={siteImages.industryEnergy.alt} loading="lazy" decoding="async" />
              </figure>
            </div>
          </div>

          <div className="container finance-cards">
            {financeDirections.map((item) => (
              <Reveal as="article" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <span>{item.principle}</span>
              </Reveal>
            ))}
          </div>

          <div className="container compliance-panel">
            <h3>产业金融合规提示</h3>
            <div className="compliance-grid">
              {complianceRules.map((rule) => (
                <ComplianceCard rule={rule} key={rule.title} />
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="methodology">
          <div className="container">
            <SectionHeader eyebrow="核心方法论" title="熙载五法" align="center">
              观势、识企、聚源、成案、落地，把需求变成路径，把资源变成项目，把合作变成结果。
            </SectionHeader>
            <div className="method-flow">
              {methods.map((method, index) => (
                <Reveal as="div" delay={index * 0.05} key={method.title}>
                  <MethodCard method={method} index={index} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--warm" id="network">
          <div className="container">
            <SectionHeader eyebrow="服务网络" title="首都资源枢纽、省域项目节点、县域服务触点、合作服务网络" align="center">
              通过总部资源组织、省域项目推进、县域服务触点和合作伙伴网络，形成资源下沉与需求上达的双向通道。
            </SectionHeader>
            <div className="network">
              {networkNodes.map((node, index) => (
                <Reveal as="article" delay={index * 0.06} key={node.title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{node.title}</h3>
                  <strong>{node.subtitle}</strong>
                  <p>{node.text}</p>
                  <ul>
                    {node.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section values">
          <div className="container values__grid">
            <SectionHeader eyebrow="专业优势" title="以研究判断、材料组织和资源协同支撑项目落地">
              既重视产业判断，也重视企业材料、沟通机制、合规边界和后续推进节奏。
            </SectionHeader>
            <div className="value-list">
              {values.map((value) => (
                <article key={value.title}>
                  <h3>{value.title}</h3>
                  <p>{value.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section partners">
          <div className="container">
            <SectionHeader eyebrow="合作对象" title="面向政府平台、国企央企上下游与中小企业" align="center">
              服务对象清晰，责任边界清晰，合作目标清晰。
            </SectionHeader>
            <div className="partner-grid">
              {partnerTypes.map((partner) => (
                <span key={partner}>{partner}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="section insights section--warm" id="insights">
          <div className="container">
            <SectionHeader eyebrow="研究洞察" title="公开行业新闻与熙载观察" align="center">
              选取与县域产业、中小企业服务、企业信用和合规产业金融相关的公开权威信息，做摘要、要点和服务启示，不转载全文。
            </SectionHeader>
            {activeInsight ? (
              <Reveal as="article" className="insight-detail" key={activeInsight.slug}>
                <a className="insight-back" href="/#insights" onClick={closeInsight}>
                  返回研究洞察
                </a>
                <span className="insight-detail__category">{activeInsight.category}</span>
                <h3>{activeInsight.title}</h3>
                <div className="insight-detail__meta">
                  <span>{activeInsight.date}</span>
                  <span>{activeInsight.sourceName}</span>
                </div>
                <p className="insight-detail__lead">{activeInsight.summary}</p>
                <blockquote className="insight-detail__quote">
                  {activeInsight.xizaiView[0] || activeInsight.summary}
                </blockquote>
                <div className="insight-detail__body">
                  <div>
                    <h4>行业要点</h4>
                    <ul>
                      {activeInsight.keyPoints.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4>熙载观察</h4>
                    {activeInsight.xizaiView.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>
                {relatedServices.length > 0 && (
                  <div className="insight-related">
                    <div>
                      <span className="eyebrow">关联服务</span>
                      <h4>这篇观察可延伸到的服务事项</h4>
                    </div>
                    <div className="insight-related__grid">
                      {relatedServices.map((service) => (
                        <a href="/#services" className="insight-related__item" key={service.title}>
                          <strong>{service.title}</strong>
                          <p>{service.summary}</p>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
                {relatedArticles.length > 0 && (
                  <div className="insight-related">
                    <div>
                      <span className="eyebrow">相关文章</span>
                      <h4>继续阅读相关观察</h4>
                    </div>
                    <div className="insight-related__grid">
                      {relatedArticles.map((article) => (
                        <a
                          href={insightPathFor(article.slug)}
                          className="insight-related__item"
                          key={article.slug}
                          onClick={(event) => openInsight(event, article.slug)}
                        >
                          <strong>{article.title}</strong>
                          <p>{article.summary}</p>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
                <div className="insight-detail__source">
                  <span>公开来源</span>
                  <a href={activeInsight.sourceUrl} target="_blank" rel="noreferrer">
                    查看原文：{activeInsight.sourceName}
                  </a>
                  <p>本站仅作公开信息摘要与行业观察，不构成政策承诺、融资承诺或法律意见。</p>
                </div>
                <div className="insight-detail__cta">
                  <strong>需要把政策信息转化为项目材料或企业服务方案？</strong>
                  <p>可通过合作邮箱沟通具体事项，熙载咨询将先判断需求边界，再给出适合的服务路径。</p>
                  <a className="button button--primary" href="mailto:contact@xizai.asia">
                    联系合作
                  </a>
                </div>
              </Reveal>
            ) : (
              <>
                {featuredInsight && (
                  <Reveal as="article" className="insight-feature">
                    <div className="insight-feature__content">
                      <span>{featuredInsight.category}</span>
                      <h3>{featuredInsight.title}</h3>
                      <p>{featuredInsight.summary}</p>
                      <div className="insight-card__meta">
                        <small>{featuredInsight.date}</small>
                        <small>{featuredInsight.sourceName}</small>
                      </div>
                      <a href={insightPathFor(featuredInsight.slug)} onClick={(event) => openInsight(event, featuredInsight.slug)}>
                        阅读主文章
                      </a>
                    </div>
                    <figure className="media-frame">
                      <img src={siteImages.meetingRoom.src} alt={siteImages.meetingRoom.alt} loading="lazy" decoding="async" />
                    </figure>
                  </Reveal>
                )}
                <div className="insight-grid">
                  {secondaryInsights.map((article, index) => (
                    <Reveal as="article" delay={Math.min(index * 0.04, 0.18)} key={article.slug}>
                      <InsightCard article={article} href={insightPathFor(article.slug)} onOpen={(event) => openInsight(event, article.slug)} />
                    </Reveal>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        <CTASection />

        <section className="section contact" id="contact">
          <div className="container contact__grid">
            <div>
              <SectionHeader eyebrow="合作咨询" title="把需求说清楚，把合作接得住">
                如需就地方产业咨询、企业评价、政策申报、项目包装、政企协同或产业金融咨询事项沟通，欢迎联系熙载咨询。
              </SectionHeader>
              <ContactBlock />
            </div>
            <form className="contact-form" onSubmit={handleSubmit}>
              <label>
                姓名
                <input name="name" placeholder="请输入姓名" required />
              </label>
              <label>
                单位名称
                <input name="organization" placeholder="请输入单位名称" required />
              </label>
              <label>
                联系电话
                <input name="phone" placeholder="请输入联系电话" required />
              </label>
              <label>
                联系邮箱
                <input name="email" type="email" placeholder="请输入联系邮箱" required />
              </label>
              <label>
                合作方向
                <select name="direction" required defaultValue="">
                  <option value="" disabled>
                    请选择合作方向
                  </option>
                  {cooperationOptions.map((option) => (
                    <option value={option} key={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                需求说明
                <textarea name="message" placeholder="请简要说明合作方向或项目需求" rows="5" required />
              </label>
              <button className="button button--primary" type="submit">
                通过邮箱发送合作意向
              </button>
              <p className="form-note">当前官网不保存表单内容，提交后将调用您的邮件客户端发送至 contact@xizai.asia。</p>
              {formStatus && <p className="form-status">{formStatus}</p>}
            </form>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

export default App;
