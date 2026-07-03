import Reveal from './Reveal.jsx';
import TaiHexagramMark from './TaiHexagramMark.jsx';

export default function PageHero({ eyebrow, title, subtitle, text, actions = [], proofs = [], symbol, media }) {
  return (
    <section className={`hero page-hero ${media?.src ? 'hero--image' : ''}`} id="home" style={media?.src ? { '--hero-image': `url(${media.src})` } : undefined}>
      <div className="hero__texture" />
      {media?.caption && <span className="hero__caption">{media.caption}</span>}
      <div className="container hero__grid">
        <Reveal className="hero__content">
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h1>{title}</h1>
          {subtitle && <p className="hero__subtitle">{subtitle}</p>}
          {text && <p className="hero__text">{text}</p>}
          {actions.length > 0 && (
            <div className="hero__actions">
              {actions.map((action) => (
                <a className={`button ${action.variant === 'ghost' ? 'button--ghost' : 'button--primary'}`} href={action.href} key={action.href}>
                  {action.label}
                </a>
              ))}
            </div>
          )}
          {proofs.length > 0 && (
            <div className="hero__proofs" aria-label="服务概览">
              {proofs.map((item) => (
                <div className="hero__proof" key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          )}
        </Reveal>

        {symbol && (
          <Reveal className="hero__symbol" delay={0.12}>
            <TaiHexagramMark size={142} color="rgba(255,253,248,0.9)" accent="#C8A46B" withCircle />
            <div>
              <strong>{symbol.title}</strong>
              <span>{symbol.text}</span>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
