import { navItems } from '../data/siteData.js';
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
            以北京资源，服务县域产业与中小企业成长。守正合规，明势聚源，助企成事。
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
          <span>所在城市：北京</span>
          <span>联系电话：待补充</span>
          <span>邮箱：待补充</span>
        </div>
      </div>
      <div className="footer__bottom">
        <span>© {new Date().getFullYear()} 熙载咨询（北京）有限公司</span>
        <span>不空谈资源，只解决问题；不制造概念，只推动落地。</span>
      </div>
    </footer>
  );
}
