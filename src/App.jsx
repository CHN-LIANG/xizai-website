import { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import SectionTitle from './components/SectionTitle.jsx';
import BusinessCard from './components/BusinessCard.jsx';
import MethodCard from './components/MethodCard.jsx';
import TaiHexagramMark from './components/TaiHexagramMark.jsx';
import Reveal from './components/Reveal.jsx';
import ComplianceCard from './components/ComplianceCard.jsx';
import { businessServices, researchColumns } from './data/services.js';
import { methods, networkNodes, partnerTypes, values } from './data/culture.js';
import { complianceRules, financeDirections } from './data/finance.js';

function App() {
  const [formStatus, setFormStatus] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormStatus('当前为静态官网版本，表单未连接后台。请在补充正式联系电话或邮箱后接入提交服务。');
  };

  return (
    <>
      <Navbar />
      <main>
        <section className="hero" id="home">
          <div className="hero__texture" />
          <div className="container hero__grid">
            <Reveal className="hero__content">
              <span className="eyebrow">熙载太和</span>
              <h1>
                <span>熙载咨询（北京）</span>
                <span>有限公司</span>
              </h1>
              <p className="hero__subtitle">县域产业与中小企业发展服务机构</p>
              <p className="hero__text">
                立足北京，连接协会、科研院所、专家、金融机构和产业服务资源，服务县域产业升级与中小企业成长。
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
                <strong>地天交泰，熙载百业</strong>
                <span>让北京资源下沉，让县域需求上达，让产业资源流动，让企业发展通达。</span>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section intro" id="about">
          <div className="container intro__grid">
            <SectionTitle eyebrow="关于熙载" title="承载光明，成就兴盛">
              “熙”有光明、兴盛、和乐之意；“载”有承载、载物、成业之意。熙载咨询以坤厚之德承载企业成长，以专业服务助力事业兴盛。
            </SectionTitle>
            <div className="intro__panel">
              <h3>熙载太和：地天交泰，熙载百业</h3>
              <p>
                “熙载”为地，为坤厚载物之德；“太和”为天，为乾元通达之道。二者合为《易经》地天泰之象，寓意上下贯通、资源流动、万物通达、百业兴盛。
              </p>
              <p>
                公司以北京资源为枢纽，以县域产业和中小企业需求为服务入口，推动协会、科研、专家、金融、地方平台和企业资源进入具体项目场景。
              </p>
            </div>
          </div>

          <div className="container culture-grid">
            <article>
              <span>使命</span>
              <p>以北京资源，服务县域产业与中小企业成长。</p>
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
              <SectionTitle eyebrow="产业金融" title="产业金融咨询与结构化融资组织服务">
                熙载咨询定位为实体产业与金融资源之间的翻译者、组织者和方案协同者。以产业为根，以信用为桥，以资产为底，以合规为界。
              </SectionTitle>
              <div className="quote-panel">
                不做资金掮客，做产业金融的翻译者与组织者。
                <span>金融服务产业，信用承载发展。</span>
              </div>
            </div>
            <div className="finance__boundary">
              <h3>合规边界</h3>
              <strong>不碰钱、不担保、不承诺结果。</strong>
              <p>
                公司不设立资金池，不直接从事放贷、担保、理财、资管、证券发行承销等需持牌经营的金融业务。涉及持牌业务，应由具备相应资质或牌照的机构依法开展。
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
            <SectionTitle eyebrow="服务网络" title="北京总部为枢纽，省域办公室为节点，县域服务站为触点" align="center">
              以北京总部组织资源，以项目办公室推进省域落地，以县域服务站贴近企业和项目现场。
            </SectionTitle>
            <div className="network">
              {networkNodes.map((node, index) => (
                <Reveal as="article" delay={index * 0.06} key={node.title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{node.title}</h3>
                  <strong>{node.subtitle}</strong>
                  <p>{node.text}</p>
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
            <SectionTitle eyebrow="研究洞察" title="聚焦县域产业、中小企业服务与合规产业金融" align="center">
              不伪造新闻，不堆砌空泛观点。研究栏目将围绕真实服务场景持续沉淀。
            </SectionTitle>
            <div className="insight-grid">
              {researchColumns.map((column, index) => (
                <Reveal as="article" delay={index * 0.06} key={column.title}>
                  <span>{column.status}</span>
                  <h3>{column.title}</h3>
                  <p>{column.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section contact" id="contact">
          <div className="container contact__grid">
            <div>
              <SectionTitle eyebrow="联系我们" title="欢迎交流合作">
                如您关注县域产业服务、中小企业成长、农业产业项目、企业信用评价、项目资源对接或产业金融咨询服务，欢迎与熙载咨询联系。
              </SectionTitle>
              <div className="contact-card">
                <strong>熙载咨询（北京）有限公司</strong>
                <span>所在城市：北京</span>
                <span>联系电话：待补充</span>
                <span>邮箱：待补充</span>
                <span>合作方向：县域产业、中小企业服务、项目策划、资源对接、产业金融咨询</span>
              </div>
            </div>
            <form className="contact-form" onSubmit={handleSubmit}>
              <label>
                姓名
                <input name="name" placeholder="请输入姓名" required />
              </label>
              <label>
                单位
                <input name="organization" placeholder="请输入单位名称" required />
              </label>
              <label>
                电话
                <input name="phone" placeholder="请输入联系电话" required />
              </label>
              <label>
                合作需求
                <textarea name="message" placeholder="请简要说明合作方向或项目需求" rows="5" required />
              </label>
              <button className="button button--primary" type="submit">
                提交合作意向
              </button>
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
