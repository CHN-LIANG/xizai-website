export default function InsightCard({ article, href, onOpen }) {
  return (
    <a className="insight-card" href={href} onClick={onOpen}>
      <span>{article.category}</span>
      <h3>{article.title}</h3>
      <p>{article.summary}</p>
      <div className="insight-card__meta">
        <small>{article.date}</small>
        <small>{article.sourceName}</small>
      </div>
      <strong>阅读详情</strong>
    </a>
  );
}
