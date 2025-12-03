You are an AI coding assistant working inside **AppCortex**, a backend-heavy TypeScript/Node/Prisma project.

Your job is to help build a **multi-store, multi-region app discovery engine** for mobile app stores (Google Play, Apple App Store, later Samsung/Huawei), not just a small top-50 scraper.

This prompt describes the current architecture, the recent changes to `runScraper.ts`, and the direction we want to go next. Use this as your global context when editing this repo.

---

## 1. Project Context

**Project name:** AppCortex (Scraping backend)  
**Goal:** Build a Bloomberg-style intelligence platform for the global app economy.

This backend:

- Scrapes app data from multiple app stores (Google Play, Apple App Store; later Samsung, Huawei, etc.).
- Stores data in PostgreSQL via Prisma ORM.
- Uses TypeScript, Node.js (ESM), ts-node.
- Will expose REST APIs (Express) for a Next.js frontend and external consumers.
- In the future, will use Redis/BullMQ for job queues and scheduled scraping.

Key technologies:

- Node.js (ESM modules)
- TypeScript 5.x
- ts-node
- Prisma 6.x + PostgreSQL
- google-play-scraper (for Google Play)
- Express (for API)
- Redis/BullMQ (planned, not the main focus yet)

Important: The codebase already has working Google Play + Apple connectors and a working scraping pipeline that can scrape at least 10 apps and save them to the DB.

---

## 2. Current Backend Layers (Conceptual)

We think about data in **3 layers**:

1. **Layer 1 – Raw ingestion**
   - Tables like `RawScrapeEvent` and (later) `RawAppSnapshot`.
   - Store full raw payloads (JSON) from each scrape.
   - Include metadata: `store`, `appId`, `country`, `chartType`, `mode` (REAL_API, HTML_BACKUP, DUMMY_FALLBACK), `scrapedAt`, and possibly `payloadHash`.
   - Never exposed to the frontend directly; used for re-processing, validation, and debugging.

2. **Layer 2 – Normalized core**
   - Tables: `App`, `Developer`, `Category`.
   - Clean, canonical representation of each app, developer, and category.
   - Group fields logically:
     - Identity: `id`, `store`, `appId`, timestamps.
     - Display basics: `title`, `summary`, `icon`, `url`.
     - Developer/category: `developerRefId`, `categoryRefId`, `genre`, `genreId`.
     - Ratings: `score`, `ratings`, `reviews`, `histogram`, `star1Count`–`star5Count`.
     - Installs/pricing: `installs`, `minInstalls`, `maxInstalls`, `free`, `price`, `currency`, `offersIAP`, `adSupported`.
     - Technical/version: `version`, `realVersion`, `androidVersion`, `size`, `updated`, `released`.
     - Policy: `contentRating`, `privacyPolicy`.
   - This is the main layer that the API and frontend will use.

3. **Layer 3 – Analytics / time-series**
   - Tables: `AppDailyStat`, `AppRanking`, `Review`.
   - Store things that change over time:
     - Daily rating/installs/rating histogram (AppDailyStat).
     - Chart positions per date, country, chart type (AppRanking).
     - Individual reviews for sentiment analysis, topic extraction, etc. (Review).

We also plan to add lifecycle fields to `App` later:

- `firstSeenAt`, `lastSeenAt`, `isDelisted`, `dataQuality` (RAW, CLEANED, FLAGGED).

---

## 3. Multi-store Runner – `runScraper.ts`

We recently changed `src/scripts/runScraper.ts` to be **multi-store aware**.  
This is the **current intent** of `runScraper.ts`:

- It should be able to:
  - Scrape **Google Play only**
  - Scrape **Apple App Store only**
  - Scrape **all stores** sequentially
- It uses a config object that lists supported stores, regions, and per-store limits.
- It calls `ScraperService.scrapeTopApps(store, limit, country)`.

The current (desired) structure of `runScraper.ts` is:

- Import `ScraperService`, `Store` (from `@prisma/client`), and `AppInfo` type.
- Define `SUPPORTED_STORES` as a list of Prisma `Store` values (GOOGLE_PLAY, APPLE_APP_STORE).
- Define `SCRAPE_CONFIG` as a `Record<Store, { countries: string[]; limit: number }>` with entries like:

  ```ts
  GOOGLE_PLAY: {
    countries: ["us", "in", "gb"],
    limit: 50,
  },
  APPLE_APP_STORE: {
    countries: ["us"],
    limit: 50,
  },
  ```

- Implement `runStoreScrape(store)`:
  - Look up config for that store.
  - For each `country` in `cfg.countries`, log the start, call `ScraperService.scrapeTopApps(store, cfg.limit, country)`, log completion.

- Implement `main()`:
  - Parse `process.argv.slice(2)` to check if user passed a specific store:
    - `google` → run Google Play only.
    - `apple` → run Apple App Store only.
  - If no args → run all supported stores in sequence.
  - Log when all store scrapes completed.

NPM scripts to maintain in `package.json`:

```jsonc
"scripts": {
  "scrape": "ts-node src/scripts/runScraper.ts",
  "scrape:google": "ts-node src/scripts/runScraper.ts google",
  "scrape:apple": "ts-node src/scripts/runScraper.ts apple",
  "scrape:all": "ts-node src/scripts/runScraper.ts",

  "scrape:continuous": "ts-node src/scripts/runContinuous.ts",
  "api": "ts-node src/api/server.ts",
  "studio": "npx prisma studio"
}
```

**Behavioral goal:**

- `npm run scrape:google` → only Google Play.
- `npm run scrape:apple` → only Apple App Store.
- `npm run scrape` / `npm run scrape:all` → both stores.

---

## 4. We are NOT just scraping 50 apps — we want ALL apps

AppCortex is not a “top 50 / top 200” toy.

We want to approach **full coverage** of app ecosystems:

- All (or nearly all) apps in Google Play.
- All (or nearly all) apps in Apple App Store.
- Across many key regions.

“Limit” should be interpreted as “per-batch/per-run limit”, not a global maximum.

Long-term strategy includes:

- Category-based pagination.
- Developer graph expansion.
- Search-based discovery.
- Trending/new lists.
- Multi-region loops (us, in, br, id, gb, ru, jp, kr, de, fr, mx, ca, au).

We need both:

- **Shallow scraper** (quick snapshot, small limit).
- **Deep discovery engine** (heavy, multi-region, exhaustive).

---

## 5. Discovery vs Scrape – Two Different Jobs

We differentiate between:

1. **Shallow scrape (current `runScraper.ts`)**
   - Fast, small, e.g., top charts/trending for a small limit.
   - Good for monitoring trending apps.

2. **Deep discovery (new scripts)**
   - Heavier, multi-region, and eventually category/developer/search-based.
   - Example: `src/scripts/runDiscoveryGoogle.ts`
   - For now can reuse `ScraperService.scrapeTopApps` with a higher limit per region, but the ultimate goal is category/pagination-based discovery.

---

## 6. Full Discovery Engine (Google Play first)

We plan to implement these “spiders”:

1. **Category Spider** – iterate every category, paginate pages until empty.
2. **Developer Spider** – for every app, fetch all apps of its developer.
3. **Search Spider** – use seed queries (`"a"..."z"`, `"aa"..."zz"`, numbers, keywords).
4. **Trending/New Spider** – fetch trending/new/hot/rising lists frequently.
5. **Region Spider** – repeat each spider for multiple countries (`["us","in","br","id","gb","ru","jp","kr","de","fr","mx","ca","au"]`).

The result is a comprehensive dataset that grows over time.

---

## 7. Task Queue & Scheduling (future)

- Redis + BullMQ for:
  - Each category page = one job.
  - Each developer = one job.
  - Each search query page = one job.
- Concurrency control, retries, monitoring, scheduling (daily/week/month deep scans).

Cursor doesn’t need to implement BullMQ immediately, but designs should keep this future requirement in mind.

---

## 8. API DTOs & Routes

- We are building DTO-based APIs (`AppListItemDTO`, `AppDetailDTO`, `ReviewAnalyticsDTO`).
- Express endpoints should return DTOs independent of database schema.
- `/api/v1/apps` uses `AppQueryService.listApps(params)` to return DTOs.
- Future endpoints: `/api/v1/apps/:store/:appId`, `/api/v1/apps/:store/:appId/reviews-analytics`.

---

## 9. Priorities for Cursor

When editing the repo, Cursor should:

1. Respect the multi-store design of `runScraper.ts`.
2. Keep the distinction between shallow snapshot scrapers and deep discovery scripts.
3. Treat `limit` as per-batch/per-run, not a global ceiling.
4. Structure `ScraperService` to support future discovery methods (`discoverByCategories`, `discoverByDeveloperGraph`, `discoverBySearchSeeds`).
5. Continue building the API DTO layer with stable contracts.
6. Design all code so adding new stores (Samsung, Huawei, etc.) is easy.

Always preserve working behavior while improving structure for multi-store, multi-region, full discovery.

---

## 10. Summary

AppCortex backend is a long-running, multi-store, multi-region discovery engine that aims to cover **all** apps. Everything should be designed around:

- Shallow runner (`runScraper.ts`) for top charts/trending snapshots.
- Deep discovery scripts (starting with Google Play) for full coverage.
- Clean normalized data layers + DTO-based APIs.
- Future job queues & scheduling to scale discovery.

Use this as your project-wide context whenever you edit code in this repo.

