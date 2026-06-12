# CLAUDE.md — PremSetu

Guidance for Claude Code when working in this repository.

## Project

**PremSetu** is a premium Indian matrimonial web app serving **all communities across India**
(Hindu, Muslim, Sikh, Christian, Jain, etc. — no single-community positioning).
Built bilingual-friendly for users with basic English. The goal is a simple, warm,
trustworthy matchmaking experience for every Indian family.

**Stack:** React (CRA) frontend · Node.js/Express backend · MongoDB Atlas · Socket.IO (realtime chat) · Cloudinary (photo uploads) · Manual UPI payments (QR + PhonePe link, no gateway)

## Live URLs

| Thing | URL |
|-------|-----|
| Frontend (Vercel) | https://client-sand-pi-62.vercel.app |
| Backend (Render)  | https://premsetu.onrender.com |
| GitHub repo       | https://github.com/aashborn11/premsetu |
| Health check      | https://premsetu.onrender.com/api/health |

> Note: Render free tier sleeps after ~15 min idle; first request after sleep takes ~30s to wake.

## Repo layout

```
premsetu/
├── client/                 # React frontend (deploy root on Vercel = client/)
│   ├── public/
│   │   └── hero.jpg        # Hero background image — swap by replacing this file only
│   ├── src/
│   │   ├── config.js       # Feature flags — CHAT_ENABLED (only place to flip features)
│   │   ├── pages/          # Home, Login, Register, Dashboard, Profile, EditProfile,
│   │   │                   #   Matches, Membership, ViewProfile, Chat, ChatList, NotFound,
│   │   │                   #   TermsAndConditions, PrivacyPolicy, RefundPolicy, ContactUs
│   │   ├── components/     # Navbar, Footer, Logo, ProtectedRoute, PaidRoute,
│   │   │                   #   ProfileCard, MatchCard, PolicyShell, HelpBot
│   │   ├── context/        # AuthContext.jsx (JWT in localStorage as "premsetu_token")
│   │   ├── utils/          # axios.js (api instance), socket.js, razorpay.js, botReply.js
│   │   └── index.css       # ALL styling lives here (single global stylesheet)
│   └── vercel.json         # SPA rewrite
├── server/                 # Express backend (deploy root on Render = server/)
│   ├── routes/             # auth.js, profile.js, matches.js, chat.js, payment.js
│   ├── models/             # User.js, Message.js
│   ├── middleware/         # authMiddleware.js (JWT verify), optionalAuth.js
│   ├── config/             # database.js, cloudinary.js, runtime.js, seedDemoData.js
│   ├── utils/              # validation.js (all input validation + regex),
│   │                       # profileGate.js (LOCKED_FIELDS + toPublicProfile)
│   └── index.js            # server entry, Socket.IO setup
└── railway.toml            # (legacy — deployed on Render now, not Railway)
```

## Deployment

**Frontend → Vercel** (CLI already logged in):
```bash
cd client && vercel --prod
```
Vercel env var: `REACT_APP_API_URL=https://premsetu.onrender.com`

**Backend → Render** (auto-deploys on git push to main):
- Root Directory: `server`
- Build Command: `npm install`
- Start Command: `npm start`
- All env vars set in Render dashboard (MongoDB, Cloudinary, JWT_SECRET, CLIENT_URL,
  RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, MEMBERSHIP_AMOUNT_PAISE, etc.)

**Git push** (token-based — repo owner is `aashborn11`):
```bash
git remote set-url origin https://aashborn11:<PAT_TOKEN>@github.com/aashborn11/premsetu.git
git push origin main
git remote set-url origin https://github.com/aashborn11/premsetu.git   # reset to clean URL
```
Ask the user for a fresh PAT if the old one is expired/revoked. Always reset the remote URL
back to the clean form after pushing so the token isn't stored in git config.

## Environment variables (server/.env)

| Variable | Purpose |
|----------|---------|
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | JWT signing secret |
| `PORT` | Server port (default 5000) |
| `CLIENT_URL` / `CLIENT_URLS` | Allowed CORS origins (comma-separated) |
| `CLOUDINARY_*` | Cloudinary upload credentials |
| `ALLOW_IN_MEMORY_DB` | `true` in dev if no Atlas URI; `false` in prod |

> Razorpay was removed in June 2026 — payments are now manual UPI (no gateway keys needed).

## Conventions

- **Community positioning:** PremSetu is ALL-community — do NOT add Rajput-only, caste-specific,
  or region-specific positioning to any UI copy. Keep all hero/footer/card copy inclusive.
- **Visual style — festive premium Indian-wedding:** Brand palette is **rose-magenta + orange**
  (matches the PremSetu logo): `--primary: #c2185b`, `--accent: #f57c00`, signature
  `--brand-gradient` (pink→coral→orange) used on primary buttons, the logo, stat numbers, and the
  progress ring. **Gold** (`--gold-warm/-deep/-light/-sheen`) remains the festive metal accent
  (mandala watermarks, filigree dividers, card top-borders, shimmer). **Ornate, not gaudy; festive,
  not cluttered — tasteful and trustworthy first.** (History note: the site was brick-red `#7c2d12`
  before the logo-driven repalette — all `--primary*` + legacy `--forest*` aliases now resolve to
  the magenta family, so older components recolour automatically.)
- **Motion:** Smooth, performant micro-interactions — card hover-lift + gold glow, button shimmer
  sweep, staggered card entrance (`.fest-stagger`), shimmer-text. Use transform/opacity only;
  always honour `prefers-reduced-motion` (global guard already in `index.css`).
- **Styling:** Everything is in `client/src/index.css`. Reusable festive motifs are SVG components
  in `client/src/components/Festive.jsx` (`<Mandala>`, `<FiligreeDivider>` — decorative, aria-hidden,
  inherit gold via `currentColor`). Legacy `--forest*` CSS var aliases still map to brick-red.
- **CSS structure:** The bottom of `index.css` has clearly-marked sections:
  - `/* LOGO (ps-logo) */` — logo component styles
  - `/* HOME PAGE — PHASE 1.5 DESIGN */` — home-page-only classes
  - `/* MEMBERSHIP PAGE */` — membership page styles
  - `/* POLICY / LEGAL PAGES */` — `.policy-shell`, `.policy-section`, `.policy-placeholder`, `.contact-card`
  - `/* HELPBOT */` — `.helpbot-root`, `.helpbot-panel`, `.helpbot-fab`, `.helpbot-msg`, etc.
  - `/* FESTIVE — INDIAN-WEDDING THEME */` — `.fest-mandala`, `.fest-divider`, `.fest-stagger`,
    `.shimmer-text`, button shimmer, per-page festive accents
- **Copy voice — simple clean English (NOT heavy Hinglish):** Plain, short, punchy lines; lead with
  visuals/icons over text. The forced Hinglish from earlier was removed — it read cringe. Only a
  light natural word like "Rishta" or the greeting "Namaste" where it genuinely fits. **Exception:**
  legal/policy pages (Terms, Privacy, Refund, Contact) keep their FULL formal text — do not trim them.
- **Auth:** JWT stored in `localStorage` key `premsetu_token`. `AuthContext` exposes
  `user`, `login`, `logout`, `refreshUser`. The `user` object is the full `/profile/me`
  response and includes `isPaid` (bool).
- **Password rule (server):** 8+ chars, at least one uppercase, one lowercase, one number.
  NO special character required. Example valid password: `Ramesh123`.
  Regex lives in `server/utils/validation.js`.
- **Phone:** 10–15 digits, stripped of non-digits.
- **DOB on Register:** three separate dropdowns (day / month / year), combined into
  `YYYY-MM-DD` before submit. Do NOT revert to a single `<input type="date">`.
- **Lint:** CRA build fails on unused vars / unused components. Run a local
  `npx react-scripts build` in `client/` before deploying to catch lint errors early.
- **Payment details (UPI):** All payment display values (UPI ID, payee name, PhonePe link,
  amount) live in `client/src/config.js` under `PAYMENT` — the ONLY place to change them.
  While `UPI_ID` is the placeholder `premsetu@upi`, the Membership page shows a yellow
  "demo payment details" banner automatically.

## Feature flags (`client/src/config.js`)

All feature gates live in **one file only**: `client/src/config.js`.
Do not scatter boolean guards anywhere else.

| Flag | Current | Effect when `false` |
|------|---------|---------------------|
| `CHAT_ENABLED` | `false` | Hides "Messages" nav link + unread badge; redirects `/chat-list` and `/chat/:id` to `/dashboard`; suppresses Socket.IO unread fetch. All chat code remains intact. |

**To re-enable chat:** set `CHAT_ENABLED = true` in `config.js` — no other changes needed.

## Legal / policy pages

Four public routes added for Razorpay KYC compliance:

| Route | Component | Description |
|-------|-----------|-------------|
| `/terms` | `TermsAndConditions.jsx` | 14-section T&C (eligibility, payment, acceptable use, governing law) |
| `/privacy` | `PrivacyPolicy.jsx` | 13-section policy (DPDP Act 2023, sensitive data, Grievance Officer) |
| `/refund` | `RefundPolicy.jsx` | Explicit no-refund policy with 3 exceptions; Razorpay-compliant |
| `/contact` | `ContactUs.jsx` | Contact cards + Grievance Officer section (IT Rules 2021) |

All four use the shared `PolicyShell` component (`components/PolicyShell.jsx`) which also
exports `PH` (placeholder highlight span) and `PolicySection`.

**⚠ Every page contains `[PLACEHOLDER]` spans** highlighted in brick-red — the team must
replace them with real business details (legal entity name, address, emails, phone,
Grievance Officer, jurisdiction) and have the content reviewed by a lawyer before go-live.

Footer "Trust & Safety" column links to all four pages via `<Link>`.

## HelpBot widget (`components/HelpBot.jsx`)

A floating rule-based help widget (bottom-right, fixed position, z-index 1200).
Renders on every page via `<HelpBot />` in `App.js` outside `<Routes>`.

**Reply logic is isolated in `utils/botReply.js` — `getBotReply(userMessage)`.**
Currently does keyword matching; returns `{ text, link? }`.

**To upgrade to a real AI backend:**
1. Make `getBotReply` async and replace its body with a fetch to your API.
2. In `HelpBot.jsx`, find the `setTimeout` block and `await getBotReply(text)` — one line change.

Covers: what is PremSetu · how to register · membership (₹499) · safety/privacy ·
matches & introductions · refund (links to `/refund`) · contact (links to `/contact`) · fallback.

## Build / verify locally

```bash
# client build (also catches lint errors that break Vercel)
cd client && npx react-scripts build

# server syntax check
cd server && node --check index.js

# dev servers (run in separate terminals)
cd server && npm run dev      # nodemon on port 5000
cd client && npm start        # CRA dev server on port 3000
```

## User schema — current fields (`server/models/User.js`)

### Core / required at registration
`fullName`, `email`, `password` (hashed), `phone`, `gender`, `dateOfBirth`

### Profile fields (optional, filled via EditProfile)
`religion`, `caste`, `gotra`, `motherTongue`, `city`, `state`,
`education`, `profession`, `annualIncome`, `height`, `maritalStatus`, `bio`

### Phase 2 — new optional profile fields
`diet` · `familyType` · `familyValues` · `parentsOccupation` · `siblings` ·
`manglikStatus` · `birthTime` · `birthPlace`

### Photos
`profilePhoto` (single URL string) · `photos` (array of URLs)

### Flags
`isProfileComplete` (bool, default false — set true when completion ≥ 85%) ·
`isPaid` (bool, default false — set true after Razorpay payment verified)

### Social graph
`interestedIn` · `interestedBy` · `matches` (all arrays of User ObjectIds)

### Enum values — must match EXACTLY (frontend selects use these raw values)

| Field | Allowed values |
|-------|---------------|
| `gender` | `male` `female` `other` |
| `maritalStatus` | `never married` `divorced` `widowed` `awaiting divorce` `""` |
| `diet` | `veg` `non-veg` `eggetarian` `vegan` `""` |
| `familyType` | `nuclear` `joint` `""` |
| `familyValues` | `traditional` `moderate` `liberal` `""` |
| `manglikStatus` | `manglik` `non-manglik` `dont know` `""` |

> **Critical:** "dont know" has no apostrophe in the stored value. Frontend dropdown
> label is "Don't Know" but the submitted value must be `dont know`.

## Profile completion gate (`server/routes/profile.js`)

`calculateCompletion` counts these **14** required fields:
`fullName`, `phone`, `gender`, `dateOfBirth`, `religion`, `motherTongue`, `city`,
`state`, `education`, `profession`, `height`, `maritalStatus`, `bio`, `profilePhoto`

Threshold: **≥ 85%** (12/14 filled) → `isProfileComplete = true`.
The 8 Phase 2 optional fields are **NOT** in this list — they don't affect gating.

## Profile gating — paid vs unpaid (`server/utils/profileGate.js`)

### Public fields (visible to everyone, including logged-out teaser)
`_id` · `fullName` · `age` (computed from DOB — number, NOT raw `dateOfBirth`) ·
`city` · `state` · `gender` · `profilePhoto`

### Locked fields (require `isPaid === true` to view another user's profile)
Everything else: `phone`, `email`, `dateOfBirth`, `religion`, `caste`, `motherTongue`,
`education`, `profession`, `annualIncome`, `height`, `maritalStatus`, `bio`, `gotra`,
`diet`, `familyType`, `familyValues`, `parentsOccupation`, `siblings`, `manglikStatus`,
`birthTime`, `birthPlace`, `photos`

### Three-tier access on `GET /api/matches/suggestions`
1. **No auth token** → max 6 random complete profiles, public fields only (home-page teaser)
2. **Auth + `isPaid=false`** → paginated filtered results, public fields only
3. **Auth + `isPaid=true`** → full paginated results with all fields

### `GET /api/profile/:id` gating
- Own profile → always full regardless of `isPaid`
- Paid user → full profile
- Unpaid / no auth → public fields only (7 fields, age not DOB)

## Suggestion filters (`GET /api/matches/suggestions`)

| Filter param | Match type | Notes |
|-------------|-----------|-------|
| `religion` | substring regex | intentional — partial match |
| `caste` | substring regex | intentional |
| `state` | substring regex | intentional |
| `city` | substring regex | intentional |
| `education` | substring regex | intentional |
| `profession` | substring regex | intentional |
| `motherTongue` | **exact** `^…$` regex | prevents "Hindi" matching "Sindhi" |
| `maritalStatus` | **exact** `^…$` regex | prevents "married" matching "never married" |
| `diet` | **exact** `^…$` regex | prevents "veg" matching "non-veg" |
| `manglikStatus` | **exact** `^…$` regex | prevents "manglik" matching "non-manglik" |
| `familyType` | **exact** `^…$` regex | |
| `minAge` / `maxAge` | DOB range | always applied (defaults 18–80) |

Blank / "Any" value → param is empty string → `if (field)` is falsy → filter not applied.

## Payment flow — manual UPI (`server/routes/payment.js`)

Razorpay was fully removed (June 2026). Payment is a manual UPI flow:

### `POST /api/payment/confirm` (auth required)
- Returns 400 `"Already a member."` if `user.isPaid === true`
- Accepts optional `{ txnId }` (user-typed UPI/UTR reference, trimmed to 60 chars)
- Sets `isPaid = true`, `paidAt = now`, `paymentRef = txnId || "self-confirmed"`
- ⚠ **Trust model:** activation is self-declared ("I have paid" click). Payments must be
  reconciled manually against the bank/UPI statement using `paymentRef` + `paidAt`.
  `paymentRef`/`paidAt` are excluded from every route that returns other users' profiles.

### Frontend flow (`client/src/pages/Membership.jsx`)
1. Page renders a **live UPI QR code** (generated from `PAYMENT.UPI_ID` in `config.js`
   via `qrcode.react`) + copyable UPI ID + `upi://pay` deep-link button (mobile)
   + optional PhonePe link button (shown only if `PAYMENT.PHONEPE_LINK` is set)
2. User pays in their UPI app, optionally types the UTR ID
3. "✅ I Have Paid ₹499" → `POST /payment/confirm` → `refreshUser()` → `/matches`
4. To use a custom QR image instead of the generated one: drop it at
   `client/public/payment-qr.png` and set `PAYMENT.QR_IMAGE = "/payment-qr.png"`

### E2E regression test
`server/e2e-upi.js` — run `node e2e-upi.js` with the dev server up (9 checks).

## Registration & onboarding flow

```
/register → /edit-profile → /membership → /matches
```

1. **Register** (`/register`) — creates account with 6 basic fields, navigates to `/edit-profile`
2. **Profile Builder** (`/edit-profile`) — 8-step wizard:
   Step 1 Basic Info · Step 2 Religious Info · Step 3 Location · Step 4 Education & Career ·
   Step 5 About Me · Step 6 Family & Lifestyle · Step 7 Horoscope · Step 8 Photos
   "Finish Profile" navigates to `/membership` (if unpaid) or `/profile` (if paid)
3. **Membership** (`/membership`) — Hinglish payment page → Razorpay checkout
4. **Matches** (`/matches`) — full browse, paid members only

## Route guards

| Route | Guard | Behaviour |
|-------|-------|-----------|
| `/membership` | `ProtectedRoute` | Requires login; auto-redirects to `/matches` if already paid |
| `/matches` | `PaidRoute` | Not logged in → `/login`; logged in + unpaid → `/membership` |
| `/profile/:id` | `ProtectedRoute` + in-component check | Unpaid + other user → `/membership`; own profile always shown |
| `/dashboard`, `/profile`, `/edit-profile` | `ProtectedRoute` | Login required only |
| `/chat-list`, `/chat/:id` | `CHAT_ENABLED` flag | When false → `<Navigate to="/dashboard" replace />`; when true → `ProtectedRoute` |
| `/terms`, `/privacy`, `/refund`, `/contact` | None | Public, no auth required |

`PaidRoute` is in `client/src/components/PaidRoute.jsx`.

## Logo component (`client/src/components/Logo.jsx`)

The brand mark is the **two-figures-forming-a-heart-over-a-bridge** symbol in the
pink→orange gradient — a scalable SVG recreation of the PremSetu logo artwork.

| Export | What it is |
|--------|-----------|
| `<PremSetuMark height={n} />` | Symbol only — used big in the Home brand lockup |
| `<LogoA height={n} />` | Symbol + lowercase "premsetu" wordmark (prem=magenta, setu=orange). Used in Navbar + Footer. |
| `<LogoB />` | Alias of `LogoA` (kept so older imports don't break) |

Usage: `<LogoA height={34} />` (navbar), `<LogoA height={28} />` (footer).
The mark colours are hard-coded so it renders correctly on dark backgrounds.

> **To use the exact raster artwork instead:** drop it at `client/public/premsetu-logo.png`,
> swap `<PremSetuMark/>` for `<img>` in the Home brand section, and set it as the favicon in
> `public/index.html`. (The SVG recreation is preferred — retina-crisp, responsive, themeable.)

The **Home brand lockup** (`.home-brand-card` in `Home.jsx`) recreates the full logo poster:
big mark + wordmark + gold filigree + the Hindi tagline "रिश्ता नहीं, जीवन का सेतु" + trust badges,
on a soft pink/orange radial glow.

## Hero image

- File: `client/public/hero.jpg`
- **To swap:** replace the file — no code change needed.
- Background is set via inline style using `process.env.PUBLIC_URL` in `Home.jsx`.
- Overlay: brick-red gradient at ~65% opacity — adjust `rgba` in `.home-hero-overlay` in `index.css`.
- Recommended: compressed JPEG or WebP, landscape, ≥1600 px wide.

## Navbar layout

Two groups inside `nav-links`:

| Group | Class | Contents (logged in) | Contents (logged out) |
|-------|-------|---------------------|-----------------------|
| Primary nav | `.nav-primary` | Home · Dashboard · Matches · [Messages if CHAT_ENABLED] | Home |
| User/auth | `.nav-user-group` | Namaste, X · My Profile · Logout | Login · Register |

Mobile: hamburger "☰" / "✕" toggle collapses both groups into a stacked dropdown.
Unread badge uses class `.nav-badge` (not inline styles). Badge + socket fetch are
fully suppressed when `CHAT_ENABLED = false`.

## Home page (Phase 1.5)

Sections in order (`client/src/pages/Home.jsx`):
1. **Hero** — full-bleed bg image + overlay, headline, tagline, auth-aware CTAs
2. **Trust strip** — horizontal: Verified Profiles · Privacy & Safety · Secure Messaging
3. **How it works** — 3 steps: Register → Build Profile → Connect
4. **Featured quote** — single centered testimonial (placeholder)
5. **Bottom CTA** — auth-aware: logged-out shows Register+Login, logged-in shows Matches+Dashboard
6. **Footer** — brand (all-community) + Quick Links + Trust & Safety (links to all 4 legal pages)

**Hero headline (fixed):** "Find Your Rishta, the Right Way"
**Hero tagline:** "PremSetu brings together families from every community across India —
thoughtful matchmaking with the warmth of tradition and the clarity you deserve."

**Auth-aware CTAs:**
- Logged out: "Create Free Profile" (primary) + "Login →" (secondary)
- Logged in: "View Your Matches" (primary) + "Go to Dashboard →" (secondary)

## Work done

### Bug fixes
- Removed duplicate `/matches/my-matches` API call
- Stale suggestion cards disappear after sending interest
- 404 page, loading states on Dashboard/Matches
- Chat Send button disabled when empty, restores draft on error
- Age filter moved to DB-level query
- **Fixed critical Vercel env var bug:** `REACT_APP_API_URL` had a BOM + literal key name
  inside the value. Removed and re-added clean value via `vercel env rm / vercel env add`.

### New features
- `ChatList` page (`/chat-list`)
- Unread message badge in Navbar (Socket.IO + `/api/chat/unread-count`)
- Photo preview before upload in EditProfile

### Design (frontend only)
- Full UI redesign: brick-red palette, clean white cards, hover animations
- Register: live password-strength checklist, 3-dropdown DOB, inline error box
- Login: clean form, inline error display
- Relaxed server password validation (dropped special-char requirement)
- **Phase 1:** Landing page — trust strip, 3-step how-it-works, testimonials, footer
- **Phase 1.5:** Full-bleed hero with bg image + brand-tinted overlay, minimal trust strip,
  single centered featured quote, 96px section padding, original SVG logo (2 variants)
- **Phase 1.5 polish:** Navbar regrouped (primary nav left, user group right, hamburger mobile),
  auth-aware hero + bottom CTAs, responsive hero headline (clamp across mobile/tablet/desktop),
  all-community copy throughout

### Phase 2 — General profile fields + match filters
- **Schema:** 8 new optional fields (`diet`, `familyType`, `familyValues`, `parentsOccupation`,
  `siblings`, `manglikStatus`, `birthTime`, `birthPlace`); `"awaiting divorce"` added to
  `maritalStatus` enum. All backward-compatible (existing users unaffected).
- **EditProfile:** 2 new steps — "Family & Lifestyle" and "Horoscope". `maritalStatus` dropdown
  updated. `"Not specified"` options submit `""` (empty string, not the label).
- **Browse filters:** 6 new filter controls behind a collapsible "More filters" panel.
  Controlled-vocabulary filters use `^…$` exact regex (no substring false-positives).
- **Validation:** New enum Sets in `validation.js`; `sanitizeSuggestionFilters` extended.
- **Verified end-to-end** with automated test: 11/11 pass (persist, blank→empty, exact match).

### Phase B — Paywall / Razorpay integration
- **Schema:** `isPaid: Boolean` (default `false`) added to User model.
- **Backend payment routes** (`server/routes/payment.js`):
  - `POST /api/payment/create-order` — creates Razorpay order, guards already-paid users
  - `POST /api/payment/verify` — HMAC-SHA256 signature verification, sets `isPaid=true`
    **only** on valid signature; tampered signatures return 400 and never grant access
- **Profile gating** — three access tiers on `/matches/suggestions` and `/profile/:id`:
  no-auth teaser (6 random, 7 public fields), auth+unpaid (filtered, 7 public fields),
  paid (full profiles). `optionalAuth` middleware handles unauthenticated browse.
- **`server/utils/profileGate.js`** — `LOCKED_FIELDS` list + `toPublicProfile()` helper.
  Public profiles return `age` (number) instead of raw `dateOfBirth`.
- **Frontend payment flow** (`client/src/utils/razorpay.js` + `Membership.jsx`):
  create-order → load checkout.js → open modal → verify on backend → `refreshUser()` → browse.
  Dismiss and failure states show Hinglish prompts with retry — never grant access.
- **Route guards:** `PaidRoute` wraps `/matches`; `ViewProfile` redirects unpaid users
  viewing other profiles to `/membership`.
- **Onboarding:** Register → `/edit-profile` → `/membership` → `/matches`.
  Paid users who re-edit go back to `/profile`, not `/membership`.
- **Verified end-to-end** with automated test: 8/8 pass (isPaid default, valid HMAC → flip,
  tampered HMAC → reject, already-paid guard, paid user gets full fields).
- **Razorpay test keys** loaded into `server/.env` and verified: `POST /api/payment/create-order`
  returns a real `order_…` ID from Razorpay test mode.

### Legal / policy pages
- Four new public routes: `/terms`, `/privacy`, `/refund`, `/contact`.
- Shared `PolicyShell` component with template-warning banner, highlighted `PH` placeholders,
  and consistent layout. All four pages need real business details filled in before go-live.
- Privacy Policy references DPDP Act 2023 and includes mandatory Grievance Officer section.
- Refund Policy explicitly states no-refund on digital service activation (Razorpay-compliant)
  with 3 narrow exceptions and 7-day request window.
- Contact page includes Grievance Officer block (required by IT Rules 2021).
- Footer "Trust & Safety" column now links to all four pages via React Router `<Link>`.

### Chat feature flag
- `client/src/config.js` — single file for all feature flags.
- `CHAT_ENABLED = false` hides Messages nav link, suppresses badge + socket fetch,
  and redirects `/chat-list` and `/chat/:id` to `/dashboard`.
- All chat code (components, Socket.IO, backend routes) is fully intact.
- Flip to `true` to restore with zero other changes.

### HelpBot widget
- Floating "Help" FAB (bottom-right, fixed, z-index 1200) on every page.
- Rule-based Hinglish replies via `getBotReply()` in `utils/botReply.js` (isolated for LLM swap).
- Covers: what is PremSetu, register, membership ₹499, safety/privacy, matches, refund, contact.
- Quick-suggestion chips, typing indicator, smooth open/close animation, mobile-responsive.
- To upgrade to AI: make `getBotReply` async, replace its body with API fetch — one function change.

## Open items / next steps

- **⚠ REAL UPI DETAILS (launch blocker):** Replace `PAYMENT.UPI_ID` placeholder
  (`premsetu@upi`) in `client/src/config.js` with the real UPI ID. Optionally add
  `PHONEPE_LINK`. The demo-banner on the Membership page disappears automatically.
- **Payment reconciliation routine:** Self-declared activation means the team must check
  new paid accounts against the UPI/bank statement (match `paymentRef` + `paidAt`).
- **Lawyer review:** Legal pages have real business details but should still be reviewed.
- **Real testimonials:** Replace placeholder quote with real success story when available
- **HelpBot → AI upgrade:** When ready, swap `getBotReply()` in `utils/botReply.js` with
  an async function calling your AI API — no other file changes needed
- **Re-enable chat:** Set `CHAT_ENABLED = true` in `client/src/config.js` when scaling
- **Phase 3 ideas:** Height as normalized cm integer (enables range filter), advanced
  kundli/gun-milan matching, profile completeness nudges, photo gallery, demo login

### Done June 2026 (UPI launch sprint)
- Razorpay fully removed → manual UPI flow (QR + deep link + PhonePe link + self-confirm)
- Navbar "✨ Become a Member" CTA for logged-in unpaid users
- Dashboard upgrade banner for unpaid users
- Home page: real-profile teaser for logged-out visitors (public suggestions API) + FAQ accordion
- Legal pages reworded for UPI; `e2e-upi.js` regression test (9/9)
