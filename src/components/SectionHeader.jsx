export default function SectionHeader({ eyebrow, title, children, align = 'left', className = '' }) {
  return (
    <div className={`section-title section-header section-title--${align} ${className}`.trim()}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}
