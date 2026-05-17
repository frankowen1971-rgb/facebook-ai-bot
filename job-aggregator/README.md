# JobBoardBD

Bangladesh's real-time job aggregator — pulls listings from 17+ sources including remote job APIs, ATS public feeds, and BD government portals. Built with Next.js 14, TypeScript, and Tailwind CSS.

## Live Demo

Deploy to Vercel in one click — zero config needed for 12+ sources.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/frankowen1971-rgb/jobboardbd)

## Features

- **17+ sources** fetched in parallel: Remotive, RemoteOK, Himalayas, WeWorkRemotely, Greenhouse, Lever, Ashby, Workable, BD govt scrapers, and more
- **Zero-auth sources** work immediately — no API keys required for 12 sources
- **1-hour cache** via in-memory singleton (swap for Redis in production)
- **LinkedIn-inspired UI** — clean card layout, salary badges, source labels, shimmer skeletons
- **Filters**: job type, category, source, country, remote-only
- **BD government portals**: BPSC, Teletalk, MOPA scrapers included

## Quick Start

```bash
npm install
npm run dev
# Open http://localhost:3000
```

Works immediately — no `.env` file needed to get started.

## Configuration (optional)

Copy `.env.example` to `.env.local` and fill in any API keys to unlock additional sources:

```bash
cp .env.example .env.local
```

| Key | Source | Free Tier |
|-----|--------|-----------|
| `USAJOBS_API_KEY` + `USAJOBS_EMAIL` | US Government Jobs | Unlimited |
| `ADZUNA_APP_ID` + `ADZUNA_APP_KEY` | Adzuna | 250 req/month |
| `JOOBLE_API_KEY` | Jooble | Free (email request) |
| `RAPIDAPI_KEY` | JSearch | 200 req/month |
| `FINDWORK_API_KEY` | Findwork | Free |

Sources without keys are skipped gracefully — shown as `⟳ key?` in the status bar.

## API

```
GET  /api/jobs                      # All jobs (1hr cache)
GET  /api/jobs?refresh=true         # Force refresh
GET  /api/jobs?search=react         # Keyword filter
GET  /api/jobs?source=remotive      # Filter by source
GET  /api/jobs?type=remote          # Filter by job type
GET  /api/jobs?category=Engineering # Filter by category
GET  /api/jobs?country=BD           # Filter by country
GET  /api/jobs?remote=true          # Remote only
POST /api/jobs/refresh              # Trigger manual refresh
```

## Architecture

```
lib/
├── types.ts          — NormalizedJob, SourceResult, AggregatedResult
├── cache.ts          — In-memory TTL cache (globalThis singleton)
├── normalizer.ts     — Type/date/salary/category utilities
└── sources/
    ├── index.ts      — Parallel aggregator (Promise.allSettled)
    ├── remotive.ts   ─┐
    ├── arbeitnow.ts   │ Zero-auth APIs
    ├── remoteok.ts    │
    ├── himalayas.ts   │
    ├── weworkremotely.ts  (RSS/XML)
    ├── themuse.ts    ─┘
    ├── greenhouse.ts ─┐
    ├── lever.ts       │ ATS public feeds
    ├── ashby.ts       │ (no auth needed)
    ├── workable.ts   ─┘
    ├── usajobs.ts    ─┐
    ├── adzuna.ts      │ API-key gated
    ├── jooble.ts      │
    ├── jsearch.ts     │
    ├── findwork.ts   ─┘
    ├── bd-govt-scraper.ts    — BPSC, Teletalk, MOPA (Cheerio)
    └── bd-private-scraper.ts — BDJobsToday, eJobsCircular (Cheerio)

app/
├── page.tsx                   — Home (JobBoard component)
├── api/jobs/route.ts          — GET with filters + cache
└── api/jobs/refresh/route.ts  — POST to force refresh

components/
├── JobBoard.tsx    — Main client component
├── JobCard.tsx     — Card with avatar, salary, source badge
├── FilterPanel.tsx — Sidebar filters with live counts
├── Navbar.tsx      — Sticky nav with search
├── SearchBar.tsx   — Keyword + location inputs
├── JobSkeleton.tsx — Shimmer loading skeleton
└── Pagination.tsx  — Numbered page navigation
```

## Deploying to Vercel

1. Create repo on GitHub, push this code to `main`
2. Import project on [vercel.com/new](https://vercel.com/new)
3. Set **Root Directory** to `./` (default)
4. Add any optional API keys in Environment Variables
5. Deploy — done

For production: replace in-memory cache with Redis (`@upstash/redis`) and add a Vercel Cron job to call `POST /api/jobs/refresh` hourly.

## Adding New Sources

See [SETUP.md](./SETUP.md) for step-by-step instructions on adding new job sources.

## Tech Stack

- [Next.js 14](https://nextjs.org/) — App Router, Server Components
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Cheerio](https://cheerio.js.org/) — HTML scraping
- [fast-xml-parser](https://github.com/NaturalIntelligence/fast-xml-parser) — RSS parsing
- [Lucide React](https://lucide.dev/) — Icons

## License

MIT
