/*
 * PremSetu — brand mark
 *
 * The symbol: two figures (rose-magenta + orange) leaning together to form a
 * heart, with a bridge (setu) inside — "a bridge of love between two people."
 * Recreated as a crisp, scalable SVG so it stays sharp at every size and can
 * be tinted by the theme. Colours are hard-coded so the mark renders correctly
 * even on dark backgrounds (e.g. the hero).
 *
 * Exports:
 *   <PremSetuMark height={n} />  — symbol only (used in the home brand lockup)
 *   <LogoA height={n} />         — symbol + "premsetu" wordmark (navbar/footer)
 *   <LogoB />                    — alias of LogoA (kept for older imports)
 *
 * To use the exact raster artwork instead: drop it at public/premsetu-logo.png
 * and swap <PremSetuMark/> for <img src=.../> — see Home.jsx brand section.
 */

import { useId } from "react";

const PINK = "#d81b60";
const PINK_DEEP = "#c2185b";
const ORANGE = "#f57c00";

export const PremSetuMark = ({ height = 36, className = "" }) => {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      height={height}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
      style={{ display: "block", flexShrink: 0 }}
    >
      <defs>
        <linearGradient id={`${id}-heart`} x1="0" y1="0.2" x2="1" y2="0.8">
          <stop offset="0" stopColor="#e91e63" />
          <stop offset="0.5" stopColor={PINK} />
          <stop offset="1" stopColor={ORANGE} />
        </linearGradient>
      </defs>

      {/* heads of the two figures */}
      <circle cx="34" cy="18" r="9.5" fill={PINK_DEEP} />
      <circle cx="86" cy="18" r="9.5" fill={ORANGE} />

      {/* heart body formed by the two figures */}
      <path
        d="M60 112 C 18 82, 7 52, 24 35 C 37 22, 54 26, 60 44
           C 66 26, 83 22, 96 35 C 113 52, 102 82, 60 112 Z"
        fill={`url(#${id}-heart)`}
      />

      {/* bridge (knockout) inside the heart */}
      <g stroke="#fff" strokeWidth="3.4" fill="none" strokeLinecap="round">
        <path d="M40 70 Q60 55 80 70" />
        <line x1="38" y1="72" x2="82" y2="72" />
        <line x1="48" y1="65" x2="48" y2="78" />
        <line x1="60" y1="62" x2="60" y2="78" />
        <line x1="72" y1="65" x2="72" y2="78" />
      </g>
    </svg>
  );
};

/* ─── LOGO A: mark + wordmark (navbar / footer) ─── */
export const LogoA = ({ height = 36, className = "" }) => (
  <span className={`ps-logo ${className}`} aria-label="PremSetu">
    <PremSetuMark height={height} />
    <span className="ps-logo-text">
      <span className="ps-logo-prem">prem</span>
      <span className="ps-logo-setu">setu</span>
    </span>
  </span>
);

/* ─── LOGO B: alias kept so any older imports keep working ─── */
export const LogoB = LogoA;

export default LogoA;
