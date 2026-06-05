// ─── Festive motifs ──────────────────────────────────────────────────────────
// Decorative-only SVG ornaments for the Indian-wedding theme.
// All are aria-hidden / focusable=false and inherit color via `currentColor`,
// so the parent CSS controls the gold tone + opacity. Lightweight, no deps.

/** Concentric mandala — used as a soft watermark behind heroes / price box. */
export const Mandala = ({ className = "" }) => {
  const spokes = Array.from({ length: 24 });
  const petals = Array.from({ length: 12 });
  return (
    <svg
      className={`fest-mandala ${className}`}
      viewBox="0 0 200 200"
      aria-hidden="true"
      focusable="false"
    >
      <g transform="translate(100 100)" fill="none" stroke="currentColor" strokeWidth="1.1">
        <circle r="94" />
        <circle r="80" strokeDasharray="2 5" />
        {spokes.map((_, i) => (
          <line key={i} x1="0" y1="-80" x2="0" y2="-94" transform={`rotate(${(360 / 24) * i})`} />
        ))}
        <circle r="60" />
        {petals.map((_, i) => (
          <path
            key={i}
            d="M0 -60 C 8 -49, 8 -39, 0 -33 C -8 -39, -8 -49, 0 -60 Z"
            transform={`rotate(${(360 / 12) * i})`}
          />
        ))}
        <circle r="28" />
        <circle r="13" />
      </g>
      <circle cx="100" cy="100" r="4" fill="currentColor" />
    </svg>
  );
};

/** Gold filigree divider — a rosette medallion flanked by thin rules. */
export const FiligreeDivider = ({ className = "" }) => {
  const petals = Array.from({ length: 8 });
  return (
    <div className={`fest-divider ${className}`} aria-hidden="true">
      <span className="fest-divider-line" />
      <svg
        className="fest-divider-mark"
        viewBox="0 0 48 48"
        width="34"
        height="34"
        fill="none"
        focusable="false"
      >
        <g transform="translate(24 24)" fill="currentColor">
          {petals.map((_, i) => (
            <path
              key={i}
              d="M0 -16 C 3 -9, 3 -5, 0 -2 C -3 -5, -3 -9, 0 -16 Z"
              transform={`rotate(${(360 / 8) * i})`}
              opacity="0.9"
            />
          ))}
        </g>
        <circle cx="24" cy="24" r="2.6" fill="currentColor" />
      </svg>
      <span className="fest-divider-line" />
    </div>
  );
};
