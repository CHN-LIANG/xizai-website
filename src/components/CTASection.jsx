import ContactBlock from './ContactBlock.jsx';

export default function CTASection({
  eyebrow = '合作入口',
  title = '欢迎通过邮箱、微信公众号或 Instagram 交流合作',
  text = '面向政府平台、协会、科研院所、园区、国企平台、农业产业企业和中小企业，熙载咨询提供克制、合规、可落地的产业服务协同。',
}) {
  return (
    <section className="section home-cta cta-section">
      <div className="container home-cta__grid cta-section__grid">
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h2>{title}</h2>
          <p>{text}</p>
          <div className="hero__actions">
            <a className="button button--primary" href="mailto:contact@xizai.asia">
              发送合作邮件
            </a>
            <a className="button button--ghost button--dark" href="/#contact">
              查看联系渠道
            </a>
          </div>
        </div>
        <ContactBlock compact />
      </div>
    </section>
  );
}
