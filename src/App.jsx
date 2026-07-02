import { useEffect, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import SectionTitle from './components/SectionTitle.jsx';
import BusinessCard from './components/BusinessCard.jsx';
import MethodCard from './components/MethodCard.jsx';
import TaiHexagramMark from './components/TaiHexagramMark.jsx';
import Reveal from './components/Reveal.jsx';
import ComplianceCard from './components/ComplianceCard.jsx';
import { businessServices } from './data/services.js';
import { methods, networkNodes, partnerTypes, values } from './data/culture.js';
import { complianceRules, financeDirections } from './data/finance.js';
import { insightArticles } from './data/insights.js';
import { cooperationOptions, publicEmailContacts, wechatAccount } from './data/siteData.js';

const getInsightSlugFromHash = () => {
  if (typeof window === 'undefined') {
    return '';
  }

  const prefix = '#insights/';
  return window.location.hash.startsWith(prefix) ? decodeURIComponent(window.location.hash.slice(prefix.length)) : '';
};

function App() {
  const [formStatus, setFormStatus] = useState('');
  const [activeInsightSlug, setActiveInsightSlug] = useState(getInsightSlugFromHash);
  const activeInsight = insightArticles.find((article) => article.slug === activeInsightSlug);

  useEffect(() => {
    const handleHashChange = () => {
      const nextSlug = getInsightSlugFromHash();
      setActiveInsightSlug(nextSlug);

      if (nextSlug) {
        window.requestAnimationFrame(() => {
          document.getElementById('insights')?.scrollIntoView({ block: 'start' });
        });
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

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
      <Navbar />
      <main>
        <section className="hero" id="home">
          <div className="hero__texture" />
          <div className="container hero__grid">
            <Reveal className="hero__content">
              <span className="eyebrow">专业资源协同 · 县域产业 · 中小企业服务</span>
              <h1>熙载咨询</h1>
              <p className="hero__subtitle">县域产业与中小企业发展服务机构</p>
              <p className="hero__text">
                依托首都专业资源，连接协会、科研院所、专家、金融机构和产业服务平台，服务县域产业升级与中小企业成长。
              </p>
              <div className="hero__actions">
                <a className="button button--primary" href="#services">
                  了解业务服务
                </a>
                <a className="button button--ghost" href="#contact">
                  联系合作
                </a>
              </div>
            </Reveal>

            <Reveal className="hero__symbol" delay={0.12}>
              <TaiHexagramMark size={180} color="rgba(255,253,248,0.9)" accent="#C8A46B" withCircle />
              <div>
                <strong>地天交泰，百业通达</strong>
                <span>上坤下乾，象征上下贯通、资源流动。用于表达咨询机构的组织、连接和落地能力。</span>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section intro" id="about">
          <div className="container intro__grid">
            <SectionTitle eyebrow="关于熙载" title="熙载咨询（北京）有限公司">
              熙载咨询是一家面向县域产业与中小企业发展服务的综合咨询机构，重视资源协同、方案组织、项目推进和合规边界。
            </SectionTitle>
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
        </section>

        <section className="section section--warm" id="services">
          <div className="container">
            <SectionTitle eyebrow="业务服务" title="围绕县域产业与企业成长的七大服务板块" align="center">
              不做空泛咨询，聚焦资源组织、方案协同、项目协调、服务承接和合规对接。
            </SectionTitle>
            <div className="business-grid">
              {businessServices.map((service, index) => (
                <Reveal as="div" delay={Math.min(index * 0.04, 0.18)} key={service.title}>
                  <BusinessCard service={service} index={index} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section finance" id="finance">
          <div className="container finance__grid">
            <div>
              <SectionTitle eyebrow="产业金融" title="产业金融咨询与融资方案协同服务">
                熙载咨询定位为实体产业与金融机构之间的翻译者、组织者和方案协同者。以产业为根，以信用为桥，以资产为底，以合规为界。
              </SectionTitle>
              <div className="quote-panel">
                不做资金中介，做产业金融的翻译者与组织者。
                <span>金融服务产业，信用承载发展。</span>
              </div>
            </div>
            <div className="finance__boundary">
              <h3>服务边界</h3>
              <strong>不经手客户资金、不提供担保、不承诺融资结果。</strong>
              <p>
                熙载咨询提供产业金融咨询、项目诊断、方案协同和持牌机构对接服务，不设立资金池，不经手客户资金，不直接从事放贷、担保、理财、资管、证券发行承销等需持牌经营的金融业务。涉及银行、保理、融资租赁、担保、证券化等持牌事项，由具备相应资质的机构依法独立办理。
              </p>
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
            <SectionTitle eyebrow="核心方法论" title="熙载五法" align="center">
              观势、识企、聚源、成案、落地，把需求变成路径，把资源变成项目，把合作变成结果。
            </SectionTitle>
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
            <SectionTitle eyebrow="服务网络" title="首都资源枢纽、省域项目节点、县域服务触点、合作服务网络" align="center">
              通过总部资源组织、省域项目推进、县域服务触点和合作伙伴网络，形成资源下沉与需求上达的双向通道。
            </SectionTitle>
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
            <SectionTitle eyebrow="价值观" title="守正、明势、承载、贯通、成事、长久">
              坚持长期主义，以信用积累关系，以服务沉淀口碑，以项目形成样板。
            </SectionTitle>
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
            <SectionTitle eyebrow="合作对象" title="面向政府平台、国企央企上下游与中小企业" align="center">
              服务对象清晰，责任边界清晰，合作目标清晰。
            </SectionTitle>
            <div className="partner-grid">
              {partnerTypes.map((partner) => (
                <span key={partner}>{partner}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="section insights section--warm" id="insights">
          <div className="container">
            <SectionTitle eyebrow="研究洞察" title="公开行业新闻与熙载观察" align="center">
              选取与县域产业、中小企业服务、企业信用和合规产业金融相关的公开权威信息，做摘要、要点和服务启示，不转载全文。
            </SectionTitle>
            {activeInsight ? (
              <Reveal as="article" className="insight-detail" key={activeInsight.slug}>
                <a className="insight-back" href="#insights" onClick={() => setActiveInsightSlug('')}>
                  返回研究洞察
                </a>
                <span className="insight-detail__category">{activeInsight.category}</span>
                <h3>{activeInsight.title}</h3>
                <div className="insight-detail__meta">
                  <span>{activeInsight.date}</span>
                  <span>{activeInsight.sourceName}</span>
                </div>
                <p className="insight-detail__lead">{activeInsight.summary}</p>
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
                <div className="insight-detail__source">
                  <span>公开来源</span>
                  <a href={activeInsight.sourceUrl} target="_blank" rel="noreferrer">
                    查看原文：{activeInsight.sourceName}
                  </a>
                  <p>本站仅作公开信息摘要与行业观察，不构成政策承诺、融资承诺或法律意见。</p>
                </div>
              </Reveal>
            ) : (
              <div className="insight-grid">
                {insightArticles.map((article, index) => (
                  <Reveal as="article" delay={Math.min(index * 0.04, 0.18)} key={article.slug}>
                    <a className="insight-card" href={`#insights/${article.slug}`}>
                      <span>{article.category}</span>
                      <h3>{article.title}</h3>
                      <p>{article.summary}</p>
                      <div className="insight-card__meta">
                        <small>{article.date}</small>
                        <small>{article.sourceName}</small>
                      </div>
                      <strong>阅读详情</strong>
                    </a>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="section home-cta">
          <div className="container home-cta__grid">
            <div>
              <span className="eyebrow">合作入口</span>
              <h2>欢迎通过邮箱或微信公众号交流合作</h2>
              <p>
                面向政府平台、协会、科研院所、园区、国企平台、农业产业企业和中小企业，熙载咨询提供克制、合规、可落地的产业服务协同。
              </p>
              <div className="hero__actions">
                <a className="button button--primary" href="mailto:contact@xizai.asia">
                  发送合作邮件
                </a>
                <a className="button button--ghost button--dark" href="#contact">
                  查看联系渠道
                </a>
              </div>
            </div>
            <div className="wechat-card wechat-card--featured">
              <img src={wechatAccount.qrCode} alt={`${wechatAccount.name}微信公众号二维码`} />
              <div>
                <strong>微信公众号</strong>
                <span>{wechatAccount.name}</span>
                <em>微信搜一搜：{wechatAccount.name}</em>
                <p>扫码关注，后续将持续更新县域产业观察、中小企业服务研究与产业金融合规观察。</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section contact" id="contact">
          <div className="container contact__grid">
            <div>
              <SectionTitle eyebrow="联系我们" title="联系我们">
                如您关注县域产业服务、中小企业成长、农业产业项目、企业信用评价、项目资源对接或产业金融咨询服务，欢迎与熙载咨询联系。
              </SectionTitle>
              <div className="contact-card contact-card--company">
                <strong>熙载咨询（北京）有限公司</strong>
                <span>总部所在地：北京</span>
                <span>合作方向：县域产业、中小企业服务、项目策划、资源对接、产业金融咨询</span>
              </div>
              <div className="email-grid">
                {publicEmailContacts.map((contact) => (
                  <a className="email-card" href={`mailto:${contact.email}`} key={contact.email}>
                    <strong>{contact.label}</strong>
                    <span>{contact.email}</span>
                    <p>{contact.text}</p>
                  </a>
                ))}
              </div>
              <div className="wechat-card">
                <img src={wechatAccount.qrCode} alt={`${wechatAccount.name}微信公众号二维码`} />
                <div>
                  <strong>微信公众号</strong>
                  <span>{wechatAccount.name}</span>
                  <em>微信搜一搜：{wechatAccount.name}</em>
                  <p>如二维码暂不可用，可在微信内搜索“{wechatAccount.name}”。</p>
                </div>
              </div>
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
      <Footer />
    </>
  );
}

export default App;
