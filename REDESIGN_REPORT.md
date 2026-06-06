# PremSetu — Redesign & Feature Report

_Last updated: June 2026_

This report documents everything changed during the rebrand + polish effort:
the new visual identity, page-by-page UI work, new features, bug fixes, and the
legal pages. **Frontend/UX + copy only** — no auth, payment-verification,
paywall, or routing logic was altered.

- **Live frontend:** https://client-sand-pi-62.vercel.app
- **Backend:** https://premsetu.onrender.com

---

## 1. Brand identity

| Item | Before | After |
|------|--------|-------|
| Logo | "The Arch" bridge SVG, brick-red + gold | New **two-figures-forming-a-heart-over-a-bridge** mark in a pink→orange gradient (`components/Logo.jsx`), recreated as scalable SVG |
| Primary colour | Brick-red `#7c2d12` | Rose-magenta `#c2185b` |
| Accent | Clay/amber | Orange `#f57c00` |
| Signature | — | `--brand-gradient` (pink→coral→orange) on CTAs, stat numbers, progress ring, accents |
| Metal accent | Gold | Gold retained (mandala, filigree, card top-borders, shimmer) |
| Favicon / tab | Default | Branded SVG favicon, real title, `theme-color`, OG meta |

The whole site recolours from `:root` tokens (legacy `--forest*` aliases remap
to magenta), so every component stayed consistent automatically.

> **Note:** the mark is a faithful SVG recreation of the supplied logo artwork.
> To use the exact raster, drop it at `client/public/premsetu-logo.png` and swap
> `<PremSetuMark/>` for an `<img>` in the Home brand section.

---

## 2. Page-by-page UI

**Home**
- Festive hero with mandala watermark, gold-tinted badges, punchy one-line copy
- New **brand lockup band**: big mark + wordmark + gold filigree + Hindi tagline
  (रिश्ता नहीं, जीवन का सेतु) + trust badges, on a soft pink/orange glow
- "How It Works" cards: gold top-accent, gold step medallions, paisley glow
- New **"Why PremSetu"** section (Verified · Privacy · Matchmaker · Kundli)
- Gold filigree section divider; festive bottom CTA

**Dashboard**
- Hero rebuilt with the vibrant brand gradient + gold mandala watermark
- **Circular progress ring** (gradient arc) replaces the flat bar
- Stat cards: icon chips + gradient numbers + gold top-accents + stagger entrance

**Membership**
- Clean-English copy (removed Hinglish); feature cards with gold medallion icons
- CTA box: gold frame + mandala watermark + shimmer ₹499
- "What's included" gradient checklist + trust pills (Secure · Lifetime · Refund)

**Profile cards (browse + dashboard)** — _redesigned_
- Tall photo with scrim, **name + age overlaid** on the image
- Status pill: **"✓ Verified"** (gradient) / **"New"**
- Icon fact rows (🛕 religion · 🎓 education · 💼 profession · 📍 location);
  only shows facts that exist (no more "not added yet" filler)
- Actions: **"♥ Send Interest"** + **"View"**
- MatchCard: brand-gradient left accent bar

**Auth (Login / Register)**
- Brand mark added to the showcase panel; copy fixed (no stale "chat" mention)
- **Dropdowns rebuilt**: custom magenta chevron + hover + pointer on Gender and
  DOB Day/Month/Year (and filter selects). They were functional before but
  looked like static fields; now clearly interactive.

**404** — festive redesign: brand mark, gradient "404", filigree, glow card

**Footer** — richer: new logo, Hindi tagline, Explore + Trust & Safety columns,
full-width bottom bar (© year · Made in India · Secure payments by Razorpay)

**Global**
- Branded scrollbar, magenta text-selection, magenta input-focus glow
- Navbar elevates on scroll
- Keyboard `focus-visible` ring (accessibility)
- Smooth entrance/stagger motion; `prefers-reduced-motion` honoured throughout

---

## 3. Features (built earlier in the effort)

- **Chat hidden behind a flag** — single `CHAT_ENABLED` in `client/src/config.js`
  hides the Messages nav/badge and redirects `/chat*` to `/dashboard`. All chat
  code intact; flip to `true` to restore.
- **Help bot** — floating "PremSetu Assistant" with rule-based replies isolated
  in `utils/botReply.js` (one function to later swap for a real LLM).
- **Nav** — "Browse Profiles" tab; Dashboard moved last; persistent greeting
  replaced with a one-time login welcome toast.
- **Legal pages** — `/terms`, `/privacy`, `/refund`, `/contact` (shared
  `PolicyShell`), required for Razorpay KYC. Footer links wired.

---

## 4. Bug fixes

- **MatchCard dead link:** "Open Chat" pointed at `/chat/:id`, which redirects to
  `/dashboard` while chat is off → now shows "View Profile" → `/profile/:id`.
- **Forced Hinglish** removed from UI copy (Home, Membership, Dashboard,
  Register, EditProfile, Matches, Login toast, Razorpay errors, help bot).
- Brand-consistent image placeholders + photo scrim on cards.
- Razorpay **test keys** loaded in `server/.env`; create-order verified.

---

## 5. Legal pages — real business details filled

Operator: **Karmveer Singh** — sole proprietor, business **not yet incorporated**
(wording corrected from the "registered company" template).

| Field | Value |
|-------|-------|
| Address | D-5, Teachers Colony, Shradhapuri Phase 2, Meerut, Uttar Pradesh – 250001 |
| Email (all queries) | officialpremsetu@gmail.com |
| Phone | +91 74098 68966 |
| Grievance Officer | Karmveer Singh |
| Jurisdiction | Meerut, Uttar Pradesh |
| Data retention | 90 days (financial records 7 yrs per law) |

Template-placeholder banner removed. **⚠ Still advisable to have a lawyer review
the legal copy** before relying on it for live payments, and note Razorpay live
mode generally expects a registered entity / KYC.

---

## 6. New / notable files

- `client/src/components/Logo.jsx` — new mark + `PremSetuMark`
- `client/src/components/Festive.jsx` — `Mandala`, `FiligreeDivider`
- `client/src/components/HelpBot.jsx`, `utils/botReply.js`
- `client/src/components/PolicyShell.jsx` + 4 legal pages
- `client/src/config.js` — feature flags (`CHAT_ENABLED`)
- `client/public/favicon.svg`

---

## 7. Commits (this effort)

```
c77488a  Redesign profile cards and fix dropdown affordance
f9717fe  Rebrand to logo palette, polish UI, fill legal pages
c9cd044  Add payments, legal pages, help bot, and festive redesign
```

All build clean with `CI=true` (warnings-as-errors, same as Vercel).
`server/.env` and `*.log` are gitignored — never committed.

---

## 8. Open items / next steps

- **Push to git** (needs a fresh PAT for `aashborn11`) — note: pushing `main`
  auto-deploys the **backend** on Render. The frontend is already live on Vercel.
- **Lawyer review** of the legal pages before going live with real payments.
- **Razorpay**: register an entity / complete KYC for live mode.
- Real **logo PNG**, real **profile photos**, and a real **testimonial** to
  replace placeholders.
