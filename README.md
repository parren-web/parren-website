# Parren.ai — Marketing Website

The public marketing site for **Parren.ai** (parren.ai). A premium, conversion-focused
landing page collecting **early-access signups**, stored in Google Sheets.

**Not** the future customer app — `app.parren.ai` will live in a separate repository
wired to Firebase/Firestore when the time comes. Keep this repo marketing-only.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 (theme tokens in `app/globals.css` via `@theme`)
- `zod` for server-side validation, `googleapis` for Sheets writes
- No CMS, no database, no auth — deliberately simple

## Local development

```bash
npm install
cp .env.example .env.local   # then fill in Sheets credentials (see below)
npm run dev                  # http://localhost:3000
```

Without Sheets credentials the site renders fine; the signup API returns a clear
`503` ("temporarily unavailable") instead of silently failing.

Useful scripts: `npm run build`, `npm run lint`.

## Project layout

```
app/
  page.tsx                 # landing page composition
  layout.tsx               # fonts, metadata, theme
  globals.css              # Tailwind v4 theme + brand utilities + animations
  privacy/page.tsx         # privacy policy (DRAFT — needs legal review)
  terms/page.tsx           # terms of service (DRAFT — needs legal review)
  api/
    early-access/route.ts  # POST signup: validate → honeypot → dedupe → Sheets
    qualify/route.ts       # POST questionnaire answers → Sheets
components/
  SignupForm.tsx           # reusable form (hero + CTA section): fields, consent,
                           # honeypot, UTM/referrer capture
  Questionnaire.tsx        # optional post-signup qualification step
  DashboardMock.tsx        # stylized CONCEPT preview (not a real product shot)
  Navbar/Hero/HowItWorks/Benefits/Vision/EarlyAccess/FAQ/Footer/Logo/Reveal
lib/
  validation.ts            # zod schemas + CONSENT_VERSION
  rate-limit.ts            # in-memory sliding-window limiter
  sheets.ts                # Sheets client, duplicate check, appends
```

## Connecting Google Sheets (one-time, ~10 min)

1. In [Google Cloud Console](https://console.cloud.google.com), create/select a project and
   enable the **Google Sheets API**.
2. **IAM → Service Accounts → Create**: name it e.g. `parren-leads`. Create a JSON key
   and download it.
3. Create the spreadsheet (e.g. "Parren Early Access Leads") with two tabs named exactly:
   - `Signups` — header row: `Timestamp | First Name | Email | Company | Consent Given |
     Consent Version | UTM Source | UTM Medium | UTM Campaign | UTM Term | UTM Content |
     Referrer | Landing Page`
   - `Qualification` — header row: `Timestamp | Email | Platforms | Posting Frequency |
     Wants To Hand Off | Company Size`
4. **Share** the spreadsheet with the service account email as **Editor**.
5. Set env vars (locally in `.env.local`; in production via the hosting dashboard):
   - `GOOGLE_SHEETS_CLIENT_EMAIL` — from the JSON key
   - `GOOGLE_SHEETS_PRIVATE_KEY` — from the JSON key (keep the `\n` escapes)
   - `GOOGLE_SHEETS_SPREADSHEET_ID` — the long ID in the sheet's URL

## How signups work (security model)

1. **Client**: `SignupForm` captures UTM params + referrer, includes an off-screen
   honeypot field (`website`). Marketing consent checkbox is unchecked by default
   (CASL express consent).
2. **API** (`/api/early-access`):
   - Sliding-window rate limit: 5 attempts / IP / 10 min
   - Zod validation (name, email, company, `consent: true` required)
   - Honeypot non-empty → fake `200 {ok:true}` (don't tip off bots)
   - Duplicate check: case-insensitive scan of the Email column → `409` with a
     friendly "already on the list" message
   - Appends a row including consent version + attribution
3. **Questionnaire** (`/api/qualify`): optional, appended to the `Qualification` tab
   keyed by email. Rate-limited separately.

Credentials exist only in server env vars — never in client bundles, logs, or git.

> Rate limiting is per server instance (in-memory). Behind serverless functions this
> is a soft limit. If abuse appears, replace `lib/rate-limit.ts` internals with a
> shared store (e.g. Upstash Redis) — the `checkRateLimit` signature stays the same.

## Copy honesty rules (important)

Parren is in development. Every page must keep the MVP/vision distinction:

- `DashboardMock` is a **concept preview** — generic labels only, no invented metrics.
- The `#vision` section lists roadmap items, each badged **"Roadmap"**.
- Hero/FAQ state plainly that Parren is in development and early access doesn't
  guarantee product availability or timing.
- When the real MVP scope is confirmed, update `HowItWorks`, `FAQ`, and the
  footer disclaimer — don't let roadmap copy drift into shipped claims.

Bump `CONSENT_VERSION` in `lib/validation.ts` whenever the consent checkbox copy changes.

## Brand (Brand Kit v1.0)

- Palette: Deep Navy `#06142E`, Electric Blue `#187BFF`, Cyan Glow `#1FD9E6`,
  Midnight `#0A0F1E` (page bg), Cloud White `#F7FAFF` (type). Dark mode site.
- Primary typeface: Plus Jakarta Sans (display). Secondary: Inter (body) —
  both via `next/font`, self-hosted.
- Logo: official app-icon artwork at `public/logo-icon.png` (also used as the
  favicon via `app/icon.png`). Mascot: `public/mascot-assistant.png` (Assistant
  variant, used in the early-access form).
- Brand voice: founder-friendly, premium, ambitious, plain-spoken. Key lines:
  "Your AI social media team. You shoot. Parren does the rest." and
  "Learn your voice. Grow your brand."
- Animations: CSS keyframes + `Reveal` (IntersectionObserver). Keep them subtle.

## Deployment

Recommended: **Vercel Pro** ($20/seat/mo — required for commercial use; Hobby is
non-commercial only). Connect the GitHub repo in the Vercel dashboard (OAuth —
no tokens handed to anyone), add the three env vars, then point `parren.ai` DNS
at Vercel.

Lower-cost alternative: **Cloudflare Pages** (free tier permits commercial use,
unlimited static bandwidth). Trade-off: Next.js API routes need the
`@cloudflare/next-on-pages` adapter — slightly more maintenance friction.

Do **not** connect the `parren.ai` domain or deploy publicly until the site owner
has reviewed and approved the final preview.
