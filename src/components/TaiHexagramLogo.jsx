import TaiHexagramMark from './TaiHexagramMark.jsx';

export default function TaiHexagramLogo({ compact = false }) {
  return (
    <div className={`brand-mark ${compact ? 'brand-mark--compact' : ''}`} aria-hidden="true">
      <div className="brand-mark__circle">
        <TaiHexagramMark size={compact ? 30 : 118} withCircle={false} />
      </div>
    </div>
  );
}
