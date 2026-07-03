export default function CaseScenarioCard({ scenario, index }) {
  return (
    <article className="scenario-card">
      <span className="scenario-card__index">{String(index + 1).padStart(2, '0')}</span>
      <h4>{scenario.title}</h4>
      <div className="scenario-card__row">
        <strong>常见问题</strong>
        <p>{scenario.problem}</p>
      </div>
      <div className="scenario-card__row">
        <strong>服务支持</strong>
        <p>{scenario.support}</p>
      </div>
      <div className="scenario-card__output">
        <strong>形成结果</strong>
        <p>{scenario.output}</p>
      </div>
    </article>
  );
}
