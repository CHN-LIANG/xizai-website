import { instagramAccount, publicEmailContacts, wechatAccount } from '../data/siteData.js';

export default function ContactBlock({ compact = false }) {
  return (
    <div className={`contact-block ${compact ? 'contact-block--compact' : ''}`}>
      <div className="contact-card contact-card--company">
        <strong>熙载咨询（北京）有限公司</strong>
        <span>总部所在地：北京</span>
        <span>合作方向：地方产业咨询、企业评价、政策申报、项目包装、政企协同、产业金融咨询</span>
      </div>
      {!compact && (
        <div className="email-grid">
          {publicEmailContacts.map((contact) => (
            <a className="email-card" href={`mailto:${contact.email}`} key={contact.email}>
              <strong>{contact.label}</strong>
              <span>{contact.email}</span>
              <p>{contact.text}</p>
            </a>
          ))}
        </div>
      )}
      <div className="wechat-card">
        <img
          src={wechatAccount.qrCode}
          alt={`${wechatAccount.name}微信公众号二维码`}
          width="112"
          height="112"
          loading="lazy"
          decoding="async"
        />
        <div>
          <strong>微信公众号</strong>
          <span>{wechatAccount.name}</span>
          <em>微信搜一搜：{wechatAccount.name}</em>
          <p>{compact ? '扫码关注，持续获取县域产业观察与企业服务研究。' : `如二维码暂不可用，可在微信内搜索“${wechatAccount.name}”。`}</p>
        </div>
      </div>
      <div className="wechat-card social-card social-card--instagram">
        <img
          src={instagramAccount.qrCode}
          alt={`${instagramAccount.name} Instagram 二维码`}
          width="132"
          height="132"
          loading="lazy"
          decoding="async"
        />
        <div>
          <strong>Instagram</strong>
          <span>{instagramAccount.name}</span>
          <em>扫码关注 ins 动态</em>
          <p>{compact ? '用于关注熙载咨询海外社媒动态。' : '如需海外社媒关注，可使用 Instagram 扫码或搜索账号。'}</p>
        </div>
      </div>
    </div>
  );
}
