export default function ServiceCard({ service, index }) {
  const Icon = service.icon;

  return (
    <article className="service-card business-card">
      <div className="service-card__top business-card__top">
        <span className="service-card__index business-card__index">{String(index + 1).padStart(2, '0')}</span>
        {Icon && (
          <span className="service-card__icon business-card__icon">
            <Icon aria-hidden="true" size={26} strokeWidth={1.8} />
          </span>
        )}
      </div>
      <h3>{service.title}</h3>
      <p>{service.summary}</p>
      {service.fit && <p className="service-card__fit business-card__fit">{service.fit}</p>}
      <ul>
        {service.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}
