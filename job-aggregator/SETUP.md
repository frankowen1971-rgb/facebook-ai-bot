# JobBoardBD — Setup Guide

## Quick Start

```bash
cd job-aggregator
npm install
npm run dev
# Open http://localhost:3000
```

The app works immediately with **zero configuration** — no API keys needed for 12+ sources.

---

## Sources Overview

### ✅ Zero-Auth (work immediately)

| Source | URL | Notes |
|--------|-----|-------|
| **Remotive** | remotive.com/api/remote-jobs | 100% remote jobs, JSON API |
| **Arbeitnow** | arbeitnow.com/api/job-board-api | Europe-focused, paginated |
| **RemoteOK** | remoteok.com/api | Requires User-Agent header |
| **Himalayas** | himalayas.app/jobs/api | Remote jobs, salary data |
| **We Work Remotely** | weworkremotely.com/...rss | RSS feeds (3 categories) |
| **The Muse** | themuse.com/api/public/jobs | No key needed for basic |

### ✅ ATS Public Feeds (work immediately, no auth)

These are **public job boards** from company Applicant Tracking Systems:

| Platform | Companies |
|----------|-----------|
| **Greenhouse** | Stripe, Airbnb, DoorDash, Robinhood, Coinbase, Figma, Notion, Vercel, Anthropic, OpenAI |
| **Lever** | Netflix, GitHub, Shopify, Palantir, Lyft, Eventbrite, Mixpanel |
| **Ashby** | Ramp, Deel, Linear, Mercury, Vanta, PostHog |
| **Workable** | Buffer, Hotjar, Typeform, Revolut |

To add more companies:
- **Greenhouse**: `https://boards.greenhouse.io/{slug}` — find the slug from company's careers page
- **Lever**: `https://jobs.lever.co/{slug}` — same approach
- **Ashby**: `https://jobs.ashbyhq.com/{slug}` — same approach

### 🔑 Requires Free API Key

| Source | Signup URL | Free Tier |
|--------|-----------|-----------|
| **USAJobs** | https://developer.usajobs.gov/APIRequest/Index | Unlimited (US govt) |
| **Adzuna** | https://developer.adzuna.com/signup | 250 req/month |
| **Jooble** | https://jooble.org/api/about | Email for key |
| **JSearch** | https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch | 200 req/month |
| **Findwork** | https://findwork.dev/api-token-auth/ | Free with registration |

### 🕷️ Web Scrapers (BD sources)

| Source | URL | Notes |
|--------|-----|-------|
| **BPSC** | bpsc.gov.bd | Bangladesh Public Service Commission |
| **Teletalk** | teletalk.com.bd/jobs | State-owned telecom |
| **MOPA** | mopa.gov.bd | Ministry of Public Administration |
| **BDJobsToday** | bdjobstoday.com | Private aggregator |
| **eJobsCircular** | ejobscircular.com | Private aggregator |

> **Legal note**: Scrapers only fetch publicly-listed job data. Rate-limited to 1 req/domain per cache cycle (1hr). Always respects `robots.txt` intent. Do not use for commercial redistribution.

---

## Configuration

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in any API keys you have (the rest will be skipped with a `⟳ key?` status)

3. The status bar in the UI shows which sources loaded successfully

---

## API Endpoints

```
GET  /api/jobs                  — Fetch all jobs (cached 1hr)
GET  /api/jobs?refresh=true     — Force refresh cache
GET  /api/jobs?search=react     — Filter by keyword
GET  /api/jobs?source=remotive  — Filter by source
GET  /api/jobs?type=remote      — Filter by job type
GET  /api/jobs?category=Engineering — Filter by category
GET  /api/jobs?country=US       — Filter by country
GET  /api/jobs?remote=true      — Remote only
POST /api/jobs/refresh          — Trigger manual refresh
```

---

## Adding New Sources

1. Create `lib/sources/mysource.ts`:

```typescript
import type { NormalizedJob } from "../types";
import { normalizeJobType, normalizeDate, slugId } from "../normalizer";

export async function fetchMySource(): Promise<NormalizedJob[]> {
  const res = await fetch("https://api.example.com/jobs");
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();

  return data.jobs.map((j: any) => ({
    id: slugId("mysource", j.id),
    title: j.title,
    company: j.company,
    location: j.location,
    type: normalizeJobType(j.type),
    category: "Engineering",
    salary: null,
    description: j.description,
    url: j.url,
    source: "mysource",
    sourceLabel: "My Source",
    postedAt: normalizeDate(j.date),
    isRemote: false,
    tags: [],
  }));
}
```

2. Add to `lib/sources/index.ts`:
```typescript
import { fetchMySource } from "./mysource";
// In SOURCES array:
{ key: "mysource", label: "My Source", fn: fetchMySource },
```

---

## Architecture

```
lib/
├── types.ts          — Shared TypeScript types
├── cache.ts          — In-memory cache (1hr TTL, globalThis singleton)
├── logger.ts         — Console logging with ✓/✗ status
├── normalizer.ts     — Type/date/salary/category normalization utilities
└── sources/
    ├── index.ts      — Aggregator: runs all sources in parallel
    ├── remotive.ts   — Zero-auth
    ├── arbeitnow.ts  — Zero-auth
    ├── remoteok.ts   — Zero-auth (User-Agent required)
    ├── himalayas.ts  — Zero-auth, paginated
    ├── weworkremotely.ts — RSS/XML parsing
    ├── usajobs.ts    — API key required
    ├── greenhouse.ts — ATS public feed (10 companies)
    ├── lever.ts      — ATS public feed (7 companies)
    ├── ashby.ts      — ATS public feed (6 companies, with salary)
    ├── workable.ts   — ATS public feed (4 companies)
    ├── adzuna.ts     — API key required
    ├── jooble.ts     — API key required
    ├── jsearch.ts    — RapidAPI key required
    ├── themuse.ts    — No key (basic tier)
    ├── findwork.ts   — API key required
    ├── bd-govt-scraper.ts    — Cheerio HTML scraper
    └── bd-private-scraper.ts — Cheerio HTML scraper

app/api/
├── jobs/route.ts         — GET with filters + caching
└── jobs/refresh/route.ts — POST to force refresh

components/
├── JobBoard.tsx    — Main client component, fetches /api/jobs
├── JobCard.tsx     — Card with company avatar, salary, source badge
├── FilterPanel.tsx — Sidebar: type, category, source, country
├── SearchBar.tsx   — Keyword + location search
├── JobSkeleton.tsx — Loading skeleton
└── Pagination.tsx  — Page navigation
```

---

## Production Notes

- Replace in-memory cache with **Redis** (`ioredis` or `@upstash/redis`) for multi-instance deployments
- Add a cron job (Vercel Cron / GitHub Actions) to call `POST /api/jobs/refresh` hourly
- Set `maxDuration = 60` in API routes (requires Vercel Pro for >10s functions)
- Monitor source health with the `/api/jobs/refresh` response
