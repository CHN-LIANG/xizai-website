import { ShieldCheck } from 'lucide-react';

export default function ComplianceCard({ rule }) {
  return (
    <article className="compliance-card">
      <ShieldCheck aria-hidden="true" size={22} strokeWidth={1.8} />
      <div>
        <h4>{rule.title}</h4>
        <p>{rule.text}</p>
      </div>
    </article>
  );
}
