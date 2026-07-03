import { navItems, publicEmailContacts, wechatAccount } from '../data/siteData.js';
import TaiHexagramLogo from './TaiHexagramLogo.jsx';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <div className="footer__brand">
            <TaiHexagramLogo compact />
            <div>
              <strong>熙载咨询（北京）有限公司</strong>
              <span>县域产业与中小企业发展服务机构</span>
            </div>
          </div>
          <p>
            以专业资源协同，服务县域产业与中小企业成长。守正合规，明势聚源，助企成事。
          </p>
        </div>
        <div className="footer__links">
          {navItems.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </div>
        <div className="footer__contact">
          <span>总部所在地：北京</span>
          <a href={`mailto:${publicEmailContacts[0].email}`}>{publicEmailContacts[0].email}</a>
          <a href={`mailto:${publicEmailContacts[1].email}`}>{publicEmailContacts[1].email}</a>
          <div className="footer__wechat">
            <img
              src={wechatAccount.qrCode}
              alt={`${wechatAccount.name}微信公众号二维码`}
              width="72"
              height="72"
              loading="lazy"
              decoding="async"
            />
            <span>微信公众号：{wechatAccount.name}<br />微信搜一搜：{wechatAccount.name}</span>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <span>© {new Date().getFullYear()} 熙载咨询（北京）有限公司</span>
        <span>不空谈资源，只解决问题；不制造概念，只推动落地。</span>
      </div>
    </footer>
  );
}
