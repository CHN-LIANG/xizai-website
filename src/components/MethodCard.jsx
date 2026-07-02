export default function MethodCard({ method, index }) {
  return (
    <article className="method-card">
      <span>{index + 1}</span>
      <h3>{method.title}</h3>
      <p>{method.text}</p>
    </article>
  );
}
