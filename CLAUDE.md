# CLAUDE.md — PremSetu

Guidance for Claude Code when working in this repository.

## Project

**PremSetu** is a premium Indian matrimonial web app, built bilingual-friendly for users
with basic English (target audience includes rural / village users). The goal is a simple,
warm, trustworthy matchmaking experience.

**Stack:** React (CRA) frontend · Node.js/Express backend · MongoDB Atlas · Socket.IO (realtime chat) · Cloudinary (photo uploads)

## Live URLs

| Thing      | URL |
|------------|-----|
| Frontend (Vercel) | https://client-sand-pi-62.vercel.app |
| Backend (Render)  | https://premsetu.onrender.com |
| GitHub repo       | https://github.com/aashborn11/premsetu |
| Health check      | https://premsetu.onrender.com/api/health |

> Note: Render free tier sleeps after ~15 min idle; first request after sleep takes ~30s to wake.

## Repo layout

```
premsetu/
├── client/                 # React frontend (deploy root on Vercel = client/)
│   ├── src/
│   │   ├── pages/          # Home, Login, Register, Dashboard, Profile, EditProfile,
│   │   │                   #   Matches, ViewProfile, Chat, ChatList, NotFound
│   │   ├── components/     # Navbar, Footer, ProtectedRoute, ProfileCard, MatchCard
│   │   ├── context/        # AuthContext.jsx (JWT in localStorage as "premsetu_token")
│   │   ├── utils/          # axios.js (api instance), socket.js
│   │   └── index.css       # ALL styling lives here (single global stylesheet)
│   └── vercel.json         # SPA rewrite
├── server/                 # Express backend (deploy root on Render = server/)
│   ├── routes/             # auth.js, profile.js, matches.js, chat.js
│   ├── models/             # User.js, Message.js
│   ├── middleware/         # authMiddleware.js (JWT verify)
│   ├── config/             # database.js, cloudinary.js, runtime.js, seedDemoData.js
│   ├── utils/              # validation.js (all input validation + regex)
│   └── index.js            # server entry, Socket.IO setup
└── railway.toml            # (legacy — we deploy on Render now, not Railway)
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
- All env vars set in Render dashboard (MongoDB, Cloudinary, JWT_SECRET, CLIENT_URL, etc.)

**Git push** (token-based — repo owner is `aashborn11`):
```bash
git remote set-url origin https://aashborn11:<PAT_TOKEN>@github.com/aashborn11/premsetu.git
git push origin main
git remote set-url origin https://github.com/aashborn11/premsetu.git   # reset to clean URL
```
Ask the user for a fresh PAT if the old one is expired/revoked. Always reset the remote URL
back to the clean form after pushing so the token isn't stored in git config.

## Conventions

- **Styling:** Everything is in `client/src/index.css`. Palette is **muted brick-red**
  (`--primary: #7c2d12`), clean white surfaces, NOT vibrant. Cards lift on hover,
  buttons scale, inputs glow on focus, pages fade up on entrance. Keep it simple and
  warm — avoid heavy gradients/textures. Legacy `--forest*` CSS var aliases still exist
  and map to the brick-red palette so older class names keep working.
- **Bilingual UX:** Labels lean English-first but keep things simple for basic-English users.
- **Auth:** JWT stored in `localStorage` key `premsetu_token`. `AuthContext` exposes
  `user`, `login`, `logout`, `refreshUser`.
- **Password rule (server):** 8+ chars, at least one uppercase, one lowercase, one number.
  NO special character required. Example valid password: `Ramesh123`.
  Regex lives in `server/utils/validation.js`.
- **Phone:** 10–15 digits, stripped of non-digits.
- **DOB on Register:** three separate dropdowns (day / month / year), combined into
  `YYYY-MM-DD` before submit. Do NOT revert to a single `<input type="date">` — it had
  a typing bug where digits split across day/month fields.
- **Lint:** CRA build fails on unused vars / unused components. Run a local
  `npx react-scripts build` in `client/` before deploying to catch lint errors early.

## Build / verify locally

```bash
# client build (also catches lint errors that break Vercel)
cd client && npx react-scripts build

# server syntax check
cd server && node --check index.js
```

Note: local MongoDB Atlas DNS may not resolve in some sandboxes — the deployed
Render backend is the source of truth for API testing. Test the live API with:
```bash
# (PowerShell) Invoke-RestMethod -Uri "https://premsetu.onrender.com/api/health"
```

## Work done so far

- Bug fixes: removed duplicate `/matches/my-matches` call, stale suggestion cards now
  disappear after sending interest, added 404 page, loading states on Dashboard/Matches,
  chat Send button disabled when empty + restores draft on error, age filter moved to
  DB-level query (was full-table JS scan).
- New features: `ChatList` page (`/chat-list`), unread message badge in Navbar (live via
  Socket.IO + `/api/chat/unread-count` endpoint), photo preview before upload in EditProfile.
- Full UI redesign (the brick-red palette + animations described above).
- Register: live password-strength checklist (4 checkmarks), 3-dropdown DOB, inline error box.
- Login: clean form, inline error box.
- Relaxed server password validation (dropped special-char requirement).

## Open issue (in progress)

**Registration reportedly failing for the user, root cause not yet confirmed.**
The server API is verified working (direct test with `Testuser123` succeeds). The Register
form shows a red inline error box with the exact server message — next step is to find out
what that box actually says. Most likely causes:
1. Password missing uppercase/lowercase/number or under 8 chars
2. Email already registered from a prior attempt
3. Phone not 10–15 digits
4. One of the three DOB dropdowns left unselected

**Suggested next steps:** confirm the exact error text, then consider adding a visible
"Try Demo Login" button / demo credentials on the Login page so users can test without
registering. Demo seed accounts use password `PremSetu@123` but only exist if
`ENABLE_DEMO_SEED=true` (currently false in production).
