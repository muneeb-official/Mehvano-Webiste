# Mehvano Realty

An AI-searchable, standalone real-estate website for **Mehvish Aslam**, REALTOR® (MD Lic. #5012582) —
serving Anne Arundel & Howard County, Maryland. Built from the *Real Estate, Decoded* strategy brief:
own the asset, become the hyperlocal expert, and let one person operate like a team.

Brand: **Mehvano Realty** (company) · agent identity: **Mehvish Aslam / Homes by Mehvish**.

---

## Why Next.js

The whole strategy is about being found — in Google *and* in AI answers (GEO/AEO). Next.js (App Router)
gives us static-generated, fast pages, first-class metadata + JSON-LD schema, `sitemap`/`robots`, and
generated OG images — everything the plan needs for SEO and performance. It beats Angular here for
content-driven SEO sites.

**Stack:** Next.js 15 · React 19 · TypeScript · Tailwind CSS v4 (CSS-first tokens) · next/font.

---

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
```

---

## 🎨 Change fonts & colors in ONE place

This was a hard requirement — theming is fully centralized.

- **Colors, radii, shadows, spacing** → [`app/globals.css`](app/globals.css), inside the `@theme { … }`
  block. Every token there becomes a Tailwind utility *and* a CSS variable, so changing one value
  updates the entire site. Example: change `--color-gold` and every gold accent updates everywhere.

- **Fonts** → [`app/fonts.ts`](app/fonts.ts). Swap the two `next/font` imports (display + body). They
  flow into `--font-display` / `--font-body` and every component consumes them via `font-display` /
  `font-body`. No other file needs to change.

- **Business data (NAP), zips, nav, socials** → [`lib/constants.ts`](lib/constants.ts). One source of
  truth, consumed by the header, footer, pages, and all JSON-LD schema (entity clarity, report §9.1).

---

## Project structure

```
app/
  (marketing)/        route group — public site (shares Header/Footer via its layout)
    page.tsx          home (hero + funnel + content)
    about/            agent entity page
    contact/
    home-value/       seller funnel: hub + [zip] per-zip landing pages
    neighborhoods/    hyperlocal content: index + [slug]
    market-reports/   index + [slug]
    guides/           index + [slug]
    listings/         Phase 2 placeholder (IDX gated behind Bright MLS approval)
  api/lead/route.ts   form submissions → CRM
  layout.tsx          root: fonts, global JSON-LD (Organization/WebSite/RealEstateAgent), metadata
  sitemap.ts, robots.ts, manifest.ts, opengraph-image.tsx, favicon.ico, not-found.tsx
  globals.css         DESIGN TOKENS (single source of truth)
  fonts.ts            FONT CONFIG (single source of truth)
components/
  ui/                 primitives: Button, Card, Field, Icon, Avatar, Badge, Container, Section, …
  layout/             Header, Footer, Logo
  sections/           Hero, ZipGrid, FeatureGrid, Steps, Testimonials, CTABand, ArticleCard, …
  forms/              LeadForm (+ HomeValueForm / ContactForm wrappers)
  content/            ContentIndexPage, ArticlePage (reused by all 3 content types)
content/              typed hyperlocal content (neighborhoods, market-reports, guides)
lib/                  constants, cms (content layer), schema (JSON-LD), crm (lead adapter), seo, utils
```

---

## Before launch — replace these placeholders

Search for `TODO` in [`lib/constants.ts`](lib/constants.ts). Confirm anything touching the license,
brokerage, or commissions with the **broker + Bright MLS + Maryland REC** first (report caveats).

- **Phone / email / brokerage name** — placeholders in `lib/constants.ts` (`AGENT`).
- **Agent headshot** — drop a photo at `public/agent/mehvish-aslam.jpg`, then pass `src={AGENT.headshot}`
  to the `<Avatar>` in `about/page.tsx` and the hero. Until then a gold initials avatar shows.
- **Hero / listing photography** — replace `public/hero/hero-home.svg` (a designed placeholder) with real
  photos. `ImagePlaceholder` and `Avatar` fall back gracefully so nothing ever looks broken.
- **Testimonials** — the 3 on the homepage are **placeholders**. Replace with real, verifiable Google
  reviews (report §9.3). See `TESTIMONIALS` in `app/(marketing)/page.tsx`.
- **Market-report figures** — the numbers in `content/market-reports.ts` are marked `sampleData` and
  must be refreshed monthly from Bright MLS (deemed reliable but not guaranteed).
- **Social URLs** — update `SOCIALS` in `lib/constants.ts` with real profile links.

---

## Wire up the CRM

Forms POST to `/api/lead`, which validates + honeypots, then calls `deliverLead()` in
[`lib/crm.ts`](lib/crm.ts). Set one env var to route leads to Follow Up Boss / Lofty / Make / n8n / Zapier:

```bash
# .env.local
CRM_WEBHOOK_URL=https://your-crm-or-automation-webhook
```

Without it, leads are logged to the server console so nothing is lost during setup.

---

## Adding content (the hyperlocal engine)

Add an entry to the relevant file in `content/` (`neighborhoods.ts`, `market-reports.ts`, `guides.ts`).
It automatically appears in its index page, sitemap, related-content, and gets Article + FAQPage JSON-LD.
Write in a direct question-and-answer style — that's what AI Overviews and ChatGPT cite (report §9.2).

To move to a headless CMS later, reimplement the functions in [`lib/cms.ts`](lib/cms.ts); pages don't change.

---

## Compliance (non-negotiable — report §8)

- **IDX** listing data may only come through a **Bright MLS-approved vendor**; never scrape portals.
  `/listings` is a lead-capture placeholder until that's approved.
- Confirm license display, the word "MLS" usage, commissions, and any LLC compensation structure with
  the broker, Bright MLS, the Maryland REC, and a CPA/attorney.
- **Fair Housing:** every client-facing output is human-reviewed. AI drafts, human approves, then it sends.

---

*This site is strategic/marketing scaffolding, not legal, tax, or financial advice.*
