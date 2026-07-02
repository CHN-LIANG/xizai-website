export default function BusinessCard({ service, index }) {
  const Icon = service.icon;

  return (
    <article className="business-card">
      <div className="business-card__top">
        <span className="business-card__index">{String(index + 1).padStart(2, '0')}</span>
        <span className="business-card__icon">
          <Icon aria-hidden="true" size={26} strokeWidth={1.8} />
        </span>
      </div>
      <h3>{service.title}</h3>
      <p>{service.summary}</p>
      <ul>
        {service.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}
