export default function TaiHexagramMark({
  color = 'currentColor',
  accent = '#C8A46B',
  size = 156,
  withCircle = true,
  className = '',
}) {
  const width = size;
  const height = size;
  const cx = width / 2;
  const cy = height / 2;
  const lineWidth = size * 0.46;
  const yinGap = size * 0.12;
  const startX = cx - lineWidth / 2;
  const endX = cx + lineWidth / 2;
  const strokeWidth = Math.max(2, size * 0.035);
  const gapY = size * 0.075;
  const topY = cy - gapY * 2.5;
  const ys = Array.from({ length: 6 }, (_, index) => topY + index * gapY);

  return (
    <svg
      className={`tai-mark ${className}`}
      width={size}
      height={size}
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label="地天泰卦图形：上坤下乾"
    >
      {withCircle && (
        <>
          <circle cx={cx} cy={cy} r={size * 0.46} fill="none" stroke={accent} strokeOpacity="0.42" />
          <circle cx={cx} cy={cy} r={size * 0.31} fill="none" stroke={accent} strokeOpacity="0.18" />
        </>
      )}
      <path
        d={`M ${size * 0.2} ${size * 0.68} C ${size * 0.36} ${size * 0.58}, ${size * 0.64} ${size * 0.58}, ${
          size * 0.8
        } ${size * 0.68}`}
        fill="none"
        stroke={accent}
        strokeLinecap="round"
        strokeOpacity="0.45"
        strokeWidth={Math.max(1, size * 0.01)}
      />
      {ys.map((y, index) =>
        index < 3 ? (
          <g key={`yin-${y}`}>
            <line
              x1={startX}
              x2={cx - yinGap / 2}
              y1={y}
              y2={y}
              stroke={color}
              strokeLinecap="round"
              strokeWidth={strokeWidth}
            />
            <line
              x1={cx + yinGap / 2}
              x2={endX}
              y1={y}
              y2={y}
              stroke={color}
              strokeLinecap="round"
              strokeWidth={strokeWidth}
            />
          </g>
        ) : (
          <line
            key={`yang-${y}`}
            x1={startX}
            x2={endX}
            y1={y}
            y2={y}
            stroke={color}
            strokeLinecap="round"
            strokeWidth={strokeWidth}
          />
        )
      )}
    </svg>
  );
}
