/*
 * PremSetu — Original SVG Logo component
 *
 * Two variants — show both to the user and let them pick:
 *
 * LogoA  "The Arch"
 *   Icon : Single bridge arch with two pillars and a gold apex circle.
 *          Clean, minimal, instantly reads as "bridge / Setu".
 *   Text : "Prem" in brick-red  |  "Setu" in warm gold — two-tone wordmark.
 *
 * LogoB  "The Torana" (double arch)
 *   Icon : Outer arch in brick-red + inner arch in gold, inspired by the
 *          ornamental gateway arch found in Rajput architecture (torana).
 *          More formal / regal feel; reads as "entrance / union".
 *   Text : "PremSetu" as a single unified wordmark in brick-red.
 *
 * Usage:
 *   import { LogoA, LogoB } from './Logo';
 *   <LogoA height={34} />   — navbar size
 *   <LogoA height={28} />   — footer size
 *
 * Colors are intentionally hard-coded so the logo stays correct
 * even when rendered outside themed contexts (e.g. dark hero).
 */

const BRICK = "#7c2d12";   /* brand primary */
const GOLD  = "#b5892a";   /* warm gold     */

/* ─── LOGO A: The Arch ─── */
export const LogoA = ({ height = 36, className = "" }) => (
  <span className={`ps-logo ${className}`} aria-label="PremSetu">
    <svg
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ display: "block", flexShrink: 0 }}
    >
      {/* Left pillar */}
      <line x1="5.5"  y1="28" x2="5.5"  y2="18"
            stroke={BRICK} strokeWidth="2.5" strokeLinecap="round" />
      {/* Right pillar */}
      <line x1="26.5" y1="28" x2="26.5" y2="18"
            stroke={BRICK} strokeWidth="2.5" strokeLinecap="round" />
      {/* Single smooth arch — control point at (16, 5) */}
      <path d="M5.5 18 Q16 5 26.5 18"
            stroke={BRICK} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Gold apex — sits at the visual top of the arch */}
      <circle cx="16" cy="11" r="3" fill={GOLD} />
    </svg>

    <span className="ps-logo-text">
      <span className="ps-logo-prem">Prem</span>
      <span className="ps-logo-setu">Setu</span>
    </span>
  </span>
);

/* ─── LOGO B: The Torana (nested arches) ─── */
export const LogoB = ({ height = 36, className = "" }) => (
  <span className={`ps-logo ${className}`} aria-label="PremSetu">
    <svg
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ display: "block", flexShrink: 0 }}
    >
      {/* Outer arch — brick-red pillars + arch */}
      <path
        d="M3 28 L3 20 Q3 4 16 4 Q29 4 29 20 L29 28"
        stroke={BRICK} strokeWidth="2.2" fill="none"
        strokeLinecap="round" strokeLinejoin="round"
      />
      {/* Inner arch — gold, narrower */}
      <path
        d="M9 28 L9 21 Q9 12 16 12 Q23 12 23 21 L23 28"
        stroke={GOLD} strokeWidth="2.2" fill="none"
        strokeLinecap="round" strokeLinejoin="round"
      />
      {/* Gold inner apex dot */}
      <circle cx="16" cy="12" r="2.2" fill={GOLD} />
    </svg>

    <span className="ps-logo-text" style={{ color: BRICK }}>
      PremSetu
    </span>
  </span>
);
