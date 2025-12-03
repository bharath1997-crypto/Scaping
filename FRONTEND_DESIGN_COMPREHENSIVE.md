# 🎨 COMPREHENSIVE FRONTEND DESIGN - AppCortex Platform

**Design Philosophy:** MoneyControl for App Markets  
**Framework:** Next.js 14 (App Router)  
**Status:** Design Phase - Ready for Implementation  
**Last Updated:** December 3, 2025

---

## 🎯 CORE CONCEPT: MoneyControl → AppCortex Parallel

### **The Big Picture**

**MoneyControl** = Stock Market Intelligence Platform  
**AppCortex** = App Market Intelligence Platform

| MoneyControl Concept | AppCortex Equivalent |
|---------------------|---------------------|
| **Stock** | **App** |
| **Exchange (NSE/BSE)** | **Store + Country** (Google-US, Apple-IN) |
| **Index (Nifty, Sensex)** | **Top Apps Index** (Top 100, Top Free) |
| **Stock Price** | **Rank / Rating / Installs** |
| **Volume / Turnover** | **Review Count / Installs** |
| **Sector/Industry** | **Category/Genre** |
| **Mutual Fund** | **(Later) App Bundles / Collections** |
| **Portfolio** | **My Apps / My Watchlist** |
| **Gainers/Losers** | **Rank Up/Down Apps** |
| **Technical Analysis** | **Trend Charts / Rank & Rating Analytics** |
| **Breaking News** | **Review Spikes / App Update Notes** |

---

## 👥 TARGET USERS & THEIR NEEDS

### **1️⃣ Individual App Developers (Indie Devs)** 
**Primary User Segment** - Like retail investors on MoneyControl

**Their Needs:**
- Track their own app's performance
- Compare with competitor apps
- Understand user complaints & sentiment
- See country-specific rankings
- Identify trending categories
- Get alerts when ratings drop or reviews spike

**Why They Use AppCortex:**
- Cannot afford App Annie / Sensor Tower ($3,000+/month)
- Need clear charts, simple review analytics, store ranking insights
- Want real-time changes and alerts

**Frontend Experience:**
- Clean UI, easy filters
- "Track My App" button prominently displayed
- Instant insight cards on app detail pages
- Simple competitor comparison tools

---

### **2️⃣ App Creators / Startups / Product Founders**
**Like startup founders watching their "stock price"**

**Their Needs:**
- Track competitor apps in the same category
- Validate product ideas using category trends
- Check ranking patterns before launching
- Track user sentiment of competitor apps
- Understand pricing / freemium models

**Why They Use AppCortex:**
- Market research without paying enterprise prices
- Need category insights and competitor comparisons

**Frontend Experience:**
- "Category Insights" page prominently displayed
- "Competitor Comparison" section on app detail
- "Trending Apps" area with growth indicators
- Category-level dashboards

---

### **3️⃣ Investors (Angel, VC, App M&A)**
**Equivalent to financial investors on MoneyControl**

**Their Needs:**
- Identify growing app categories
- Find apps with explosive ranking growth ("top gainers")
- Analyze long-term rating trends
- Understand early market leaders
- Evaluate app momentum (daily stats / monthly growth)

**Why They Use AppCortex:**
- Spot opportunities before the market sees them
- Need data-driven investment decisions

**Frontend Experience:**
- Charts, charts, charts (ranking, rating, install trends)
- Category-level dashboards
- Growth curves and momentum indicators
- "Top Movers" / "Gainers & Losers" prominently displayed
- Easy comparison tools

---

### **4️⃣ Marketing Agencies / UA (User Acquisition) Teams**
**The "Broking houses" of App Market**

**Their Needs:**
- Competitor ad performance proxies (ratings, reviews, rank spikes)
- Category performance across countries
- App quality signals (1-star vs 5-star distribution)
- Market-level dashboards to advise clients

**Why They Use AppCortex:**
- Real-time app store intelligence to pitch clients
- Track campaign effectiveness
- Country and category performance insights

**Frontend Experience:**
- Country dropdowns everywhere
- Category-wise dashboards
- Review sentiment analytics prominently displayed
- Alerts: "Negative review spike" notifications
- Exportable reports

---

### **5️⃣ Market Analysts / Researchers / Students**
**Same as financial analysts using MoneyControl for reports**

**Their Needs:**
- Big picture: market trends
- Historical ranking charts
- Cross-country comparisons
- Download / rating correlations

**Why They Use AppCortex:**
- Historical + country + category data in one dashboard
- Research and academic purposes

**Frontend Experience:**
- Ability to export graphs
- Historical data snapshots
- Interactive charts with date range selection
- Cross-country comparison tools

---

## 📊 USER VALUE MATRIX

| User Type | What They Care About | What You Should Show Them |
|-----------|---------------------|-------------------------|
| **Indie Devs** | My app stats, reviews, competitors | Simple UI, clear insights, alerts |
| **Founders** | Category trends, competitor apps | Category dashboards, comparisons |
| **Investors** | Growth patterns, top gainers, trending apps | Ranking charts, top movers, momentum |
| **Marketing Agencies** | Sentiment, country trends, issues | Review analytics, country dashboards |
| **Analysts/Students** | Market data, historical trends | Exportable charts, long-term graphs |

---

## 🗺️ COMPLETE PAGE MAP: ~64 Pages/Buttons

### **A. Public & Marketing (8 pages)**

| ID | Route | Page Name | Backend Connection | Priority |
|----|-------|-----------|-------------------|----------|
| **P1** | `/` | **Home / Landing** | ✅ Optional: `/api/v1/apps?pageSize=10` for highlights | **P1** |
| P2 | `/why` | Why AppCortex (Use Cases) | 🔜 Static content | P2 |
| P3 | `/features` | Features Overview | 🔜 Static content | P2 |
| P4 | `/pricing` | Pricing (future SaaS) | 🔜 Static content | P3 |
| P5 | `/about` | About / Story | 🔜 Static content | P2 |
| P6 | `/contact` | Contact / Support | 🔜 Static content | P2 |
| P7 | `/faq` | FAQ | 🔜 Static content | P2 |
| P8 | `/legal` | Legal (Terms, Privacy) | 🔜 Static content | P2 |

**Details:**
- **P1 Home:** Hero + "MoneyControl for apps" explanation. Shows total apps, total reviews (simple stats). Links to explorer.
- **P2-P8:** Mostly static marketing pages. Can add later, don't block backend usage.

---

### **B. Market Overview & Dashboards (8 pages)**

| ID | Route | Page Name | Backend Connection | Priority |
|----|-------|-----------|-------------------|----------|
| **P1** | `/dashboard` | **Global App Market Dashboard** | ✅ `GET /api/v1/apps` (counts), `App`, `Review`, `AppRanking` tables | **P1** |
| P2 | `/dashboard/google` | Google Play Market Overview | ✅ `GET /api/v1/apps?store=GOOGLE_PLAY` | P2 |
| P3 | `/dashboard/apple` | Apple App Store Market Overview | ✅ `GET /api/v1/apps?store=APPLE_APP_STORE` | P2 |
| P4 | `/dashboard/country/us` | US Market Dashboard | ✅ `GET /api/v1/apps?country=us` | P2 |
| P5 | `/dashboard/country/in` | India Market Dashboard | ✅ `GET /api/v1/apps?country=in` | P2 |
| P6 | `/dashboard/country/gb` | UK Market Dashboard | ✅ `GET /api/v1/apps?country=gb` | P2 |
| P7 | `/dashboard/movers` | Top Gainers / Losers Today | 🔜 `AppRanking` + `AppDailyStat` (needs new API) | P2 |
| P8 | `/dashboard/trends` | Trends Over Time | 🔜 `AppDailyStat` + `AppRanking` (needs new API) | P3 |

**Details:**
- **P1 Global Dashboard:** Cards showing total apps, Google vs Apple counts, total reviews. Top 5 gainers/losers (rank change) per store (later).
- **P2-P3:** Store-specific overviews. Show #apps, average rating, top categories.
- **P4-P6:** Country-specific dashboards. Similar to global but filtered by country.
- **P7-P8:** Require new backend APIs for rank changes and trends over time.

**Backend Tables Used:**
- `App` - App counts, store breakdown
- `Review` - Review counts
- `AppRanking` - Ranking data (for movers)
- `AppDailyStat` - Daily metrics (for trends)

---

### **C. App Explorer & Search (10 pages)**

| ID | Route | Page Name | Backend Connection | Priority |
|----|-------|-----------|-------------------|----------|
| **P1** | `/apps` | **App Explorer (All Apps)** | ✅ `GET /api/v1/apps` | **P1** |
| **P1** | `/apps/google` | Google Play Apps | ✅ `GET /api/v1/apps?store=GOOGLE_PLAY` | **P1** |
| **P1** | `/apps/apple` | Apple Apps | ✅ `GET /api/v1/apps?store=APPLE_APP_STORE` | **P1** |
| P2 | `/apps/country/us` | US Apps | ✅ `GET /api/v1/apps?country=us` | P2 |
| P2 | `/apps/country/in` | India Apps | ✅ `GET /api/v1/apps?country=in` | P2 |
| P2 | `/apps/country/gb` | UK Apps | ✅ `GET /api/v1/apps?country=gb` | P2 |
| **P1** | `/search` | Search Results | ✅ `GET /api/v1/apps?search={query}` or `?q={query}` | **P1** |
| P2 | `/apps/screener` | Advanced Screener | 🔜 Needs backend extension (minRating, minReviews, rank range) | P2 |
| P3 | `/apps/saved-filters` | Saved Filters | 🔜 Requires user auth | P3 |
| P3 | `/apps/recent` | Recent Searches | 🔜 localStorage-based | P3 |

**Details:**
- **P1 App Explorer:** Core browsing page. Filters: store, country, category, search, sort. Table/grid view with pagination.
- **P1 Google/Apple:** Pre-filtered views. Same `/apps` page with store filter preset.
- **P2 Country Pages:** Pre-filtered by country. Same `/apps` page with country filter preset.
- **P1 Search:** Uses `search` or `q` query param. Highlights search terms in results.
- **P2 Advanced Screener:** More filters (minRating, minReviews, rank range). Needs backend extension.

**Backend API:**
```typescript
GET /api/v1/apps?store={store}&country={country}&category={category}&search={query}&page={page}&pageSize={pageSize}&sortBy={sortBy}&sortDir={sortDir}
```

**Backend Tables Used:**
- `App` - Main app listing
- `Category` - Category filtering
- `Developer` - Developer info in results

---

### **D. App Detail & Analytics (12 pages/tabs)**

| ID | Route | Page Name | Backend Connection | Priority |
|----|-------|-----------|-------------------|----------|
| **P1** | `/apps/[store]/[appId]` | **App Detail - Overview** | ✅ `GET /api/v1/apps/:store/:appId` | **P1** |
| **P2** | `/apps/[store]/[appId]#reviews` | Reviews Analytics Tab | ✅ `GET /api/v1/apps/:store/:appId/reviews-analytics` | **P1** |
| P2 | `/apps/[store]/[appId]/ranking` | Rank History | 🔜 Needs new API: `GET /api/v1/apps/:store/:appId/ranking` | P2 |
| P2 | `/apps/[store]/[appId]/stats` | Daily Stats | 🔜 Needs new API: `GET /api/v1/apps/:store/:appId/stats` | P2 |
| P2 | `/apps/[store]/[appId]/raw` | Raw Snapshot View | 🔜 `RawAppSnapshot` table (debug view) | P2 |
| P3 | `/apps/[store]/[appId]/similar` | Similar / Competitors | 🔜 Same category or developer (needs new API) | P3 |
| P3 | `/apps/[store]/[appId]/developer` | Developer Apps | 🔜 `Developer` table + `App` table | P3 |
| P3 | `/apps/[store]/[appId]/countries` | Country Comparison | 🔜 Multiple countries comparison (needs new API) | P3 |
| P3 | `/apps/[store]/[appId]/preview` | Storefront Preview | 🔜 Static preview | P3 |
| P3 | `/apps/[store]/[appId]/alerts` | Alerts (logged-in) | 🔜 Requires user auth | P3 |
| P3 | `/apps/[store]/[appId]/insights` | AI Insights (Phase 5) | 🔜 Future AI features | P3 |
| P3 | `/apps/[store]/[appId]/notes` | Notes (user notes) | 🔜 Requires user auth | P3 |

**Details:**
- **P1 Overview:** Icon, title, developer, rating, reviews, installs, price, category, country. Screenshots, description, details grid.
- **P2 Reviews Analytics:** Uses existing `/reviews-analytics` endpoint. Shows totalReviews, avgRating, ratingDistribution (1-5), last 7/30 days trend.
- **P2 Rank History:** Chart showing rank vs time. Requires new API endpoint using `AppRanking` table.
- **P2 Daily Stats:** Chart showing rating, reviews, installs over time. Requires new API endpoint using `AppDailyStat` table.
- **P3 Future Tabs:** Similar apps, developer apps, country comparison, etc.

**Backend APIs:**
```typescript
// Existing
GET /api/v1/apps/:store/:appId
GET /api/v1/apps/:store/:appId/reviews-analytics

// Needed
GET /api/v1/apps/:store/:appId/ranking  // Returns AppRanking[] with date, rank, chartType, country
GET /api/v1/apps/:store/:appId/stats   // Returns AppDailyStat[] with date, score, ratings, reviewCount
GET /api/v1/apps/:store/:appId/similar // Returns App[] from same category
GET /api/v1/apps/:store/:appId/developer // Returns Developer + App[] by same developer
```

**Backend Tables Used:**
- `App` - Main app details
- `Review` - Reviews data (via reviews-analytics)
- `AppRanking` - Ranking history
- `AppDailyStat` - Daily statistics
- `Developer` - Developer information
- `Category` - Category information
- `RawAppSnapshot` - Raw data (debug view)

---

### **E. Categories, Countries, Stores (8 pages)**

| ID | Route | Page Name | Backend Connection | Priority |
|----|-------|-----------|-------------------|----------|
| P2 | `/categories` | Category List | ✅ `Category` table | P2 |
| P2 | `/categories/[slug]` | Category Detail - Global | ✅ `GET /api/v1/apps?category={category}` | P2 |
| P2 | `/categories/[slug]/google` | Category Detail - Google | ✅ `GET /api/v1/apps?category={category}&store=GOOGLE_PLAY` | P2 |
| P2 | `/categories/[slug]/apple` | Category Detail - Apple | ✅ `GET /api/v1/apps?category={category}&store=APPLE_APP_STORE` | P2 |
| P2 | `/countries` | Country List | 🔜 Static list or `App` table aggregation | P2 |
| P2 | `/countries/[code]` | Country Detail | ✅ `GET /api/v1/apps?country={code}` | P2 |
| P2 | `/stores` | Stores Page | 🔜 Static content | P2 |
| P3 | `/stores/[store]` | Store Detail | ✅ `GET /api/v1/apps?store={store}` | P3 |

**Details:**
- **P2 Category List:** Grid of all categories with app counts. Links to category detail pages.
- **P2 Category Detail:** Shows top apps in that category. Can filter by store (Google/Apple).
- **P2 Country List:** List of all countries with flags and app counts.
- **P2 Country Detail:** Similar to `/dashboard/country/{code}` but focused on app listing.

**Backend Tables Used:**
- `Category` - Category list and details
- `App` - Apps filtered by category/country

---

### **F. Developers & Competitors (6 pages)**

| ID | Route | Page Name | Backend Connection | Priority |
|----|-------|-----------|-------------------|----------|
| P2 | `/developers` | Developer List | ✅ `Developer` table | P2 |
| P2 | `/developers/[id]` | Developer Detail | ✅ `App` table filtered by developer | P2 |
| P3 | `/developers/top-apps` | Top Developers by Apps Count | 🔜 `Developer` + `App` aggregation | P3 |
| P3 | `/developers/top-rating` | Top Developers by Rating | 🔜 `Developer` + `App` aggregation | P3 |
| P3 | `/developers/compare` | Publisher Comparison Tool | 🔜 Multiple developers comparison | P3 |
| P3 | `/developers/watchlist` | Developer Watchlist | 🔜 Requires user auth | P3 |

**Details:**
- **P2 Developer List:** List of all developers with app counts.
- **P2 Developer Detail:** Shows all apps by that developer. Uses `App` table filtered by `developerIdRef`.
- **P3 Advanced:** Top developers, comparison tools, watchlists (future).

**Backend Tables Used:**
- `Developer` - Developer information
- `App` - Apps by developer

---

### **G. User Account / Settings (6 pages)**

| ID | Route | Page Name | Backend Connection | Priority |
|----|-------|-----------|-------------------|----------|
| P3 | `/login` | Login | 🔜 Requires auth backend | P3 |
| P3 | `/register` | Register | 🔜 Requires auth backend | P3 |
| P3 | `/me/dashboard` | My Dashboard / Watchlist | 🔜 Requires user auth + `UserWatchlist` table | P3 |
| P3 | `/me/apps` | My Saved Apps | 🔜 Requires user auth + `UserSavedApps` table | P3 |
| P3 | `/me/alerts` | My Alerts | 🔜 Requires user auth + `UserAlerts` table | P3 |
| P3 | `/me/settings` | Account Settings | 🔜 Requires user auth | P3 |

**Details:**
- All P3 - Future features requiring authentication.
- Initially can be hidden or placeholders ("Coming soon").
- Requires new backend tables: `User`, `UserWatchlist`, `UserSavedApps`, `UserAlerts`.

---

### **H. Admin / Internal Tools (6 pages)**

| ID | Route | Page Name | Backend Connection | Priority |
|----|-------|-----------|-------------------|----------|
| P2 | `/admin` | Admin Home | 🔜 Admin dashboard | P2 |
| P2 | `/admin/scrapers` | Scraper Status | 🔜 `RawScrapeEvent` table | P2 |
| P2 | `/admin/db-stats` | Database Stats | ✅ `ts-node src/scripts/checkDatabase.ts` or new API | P2 |
| P3 | `/admin/logs` | Logs | 🔜 Log aggregation system | P3 |
| P3 | `/admin/apps/[id]` | App Debug View | 🔜 `RawAppSnapshot` + `App` tables | P3 |
| P3 | `/admin/stores` | Store Config | 🔜 Store configuration | P3 |

**Details:**
- **P2 Admin Home:** Overview dashboard for internal use.
- **P2 Scraper Status:** Shows last run time per store, last success/fail. Uses `RawScrapeEvent` table.
- **P2 Database Stats:** Calls `checkDatabase.ts` script or new API endpoint.
- Not exposed in public navbar - internal use only.

**Backend Tables Used:**
- `RawScrapeEvent` - Scraper execution logs
- `App`, `RawAppSnapshot` - Debug views

---

## 🎯 PRIORITY 1 (P1) PAGES - BUILD NOW

**These 8 pages connect directly to your existing backend:**

1. **`/`** - Home / Landing
   - API: Optional `GET /api/v1/apps?pageSize=10` for highlights
   - Shows: Total apps count, quick stats

2. **`/apps`** - App Explorer (All Apps)
   - API: `GET /api/v1/apps?store={store}&country={country}&category={category}&page={page}&pageSize={pageSize}&sortBy={sortBy}&sortDir={sortDir}`
   - Shows: Filterable app list with pagination

3. **`/apps/google`** - Google Play Apps
   - API: `GET /api/v1/apps?store=GOOGLE_PLAY&page={page}&pageSize={pageSize}`
   - Shows: Pre-filtered Google Play apps

4. **`/apps/apple`** - Apple Apps
   - API: `GET /api/v1/apps?store=APPLE_APP_STORE&page={page}&pageSize={pageSize}`
   - Shows: Pre-filtered Apple App Store apps

5. **`/search`** - Search Results
   - API: `GET /api/v1/apps?search={query}` or `?q={query}`
   - Shows: Search results with highlighted terms

6. **`/apps/[store]/[appId]`** - App Detail Overview
   - API: `GET /api/v1/apps/:store/:appId`
   - Shows: App icon, title, developer, rating, reviews, installs, price, category, screenshots, description

7. **`/apps/[store]/[appId]#reviews`** - Reviews Analytics (Tab on same page)
   - API: `GET /api/v1/apps/:store/:appId/reviews-analytics`
   - Shows: totalReviews, avgRating, ratingDistribution (1-5), trends

8. **`/dashboard`** - Global App Market Dashboard
   - API: `GET /api/v1/apps` (for counts)
   - Shows: Total apps, Google vs Apple breakdown, total reviews, key metrics cards

---

## 🔌 BACKEND API SUMMARY

### **Existing APIs (Ready to Use)**

```typescript
// List apps with filters
GET /api/v1/apps
Query params: store, country, category, search, q, page, pageSize, sortBy, sortDir
Response: { ok: true, data: App[], pagination: {...} }

// Get app details
GET /api/v1/apps/:store/:appId
Response: { ok: true, data: App }

// Get reviews analytics
GET /api/v1/apps/:store/:appId/reviews-analytics
Query params: country (optional)
Response: { ok: true, data: ReviewsAnalytics }

// Health check
GET /health
Response: { ok: true, status: "healthy" }
```

### **Backend Tables Available**

| Table | Purpose | Used By Pages |
|-------|---------|--------------|
| `App` | Normalized app info | All app listing/detail pages |
| `Review` | User reviews | Reviews analytics |
| `AppRanking` | Chart positions | Ranking history (needs API) |
| `AppDailyStat` | Daily metrics | Daily stats charts (needs API) |
| `Developer` | Developer info | Developer pages |
| `Category` | Category list | Category pages |
| `RawAppSnapshot` | Raw scraped data | Debug/admin views |
| `RawScrapeEvent` | Scraper logs | Admin scraper status |

### **APIs Needed (Future)**

```typescript
// Ranking history
GET /api/v1/apps/:store/:appId/ranking
Response: AppRanking[] with date, rank, chartType, country

// Daily stats
GET /api/v1/apps/:store/:appId/stats
Response: AppDailyStat[] with date, score, ratings, reviewCount

// Similar apps
GET /api/v1/apps/:store/:appId/similar
Response: App[] from same category

// Developer apps
GET /api/v1/apps/:store/:appId/developer
Response: { developer: Developer, apps: App[] }

// Top movers (gainers/losers)
GET /api/v1/dashboard/movers
Query params: store, country, period (24h, 7d, 30d)
Response: { gainers: App[], losers: App[] }

// Market stats
GET /api/v1/dashboard/stats
Query params: store, country
Response: { totalApps, totalReviews, avgRating, ... }
```

---

## 🎨 UI PATTERN PARALLELS: MoneyControl → AppCortex

### **Top Navigation Bar**

**MoneyControl:**
```
Markets | Stocks | Mutual Funds | News | IPO | ...
```

**AppCortex:**
```
Dashboard | Apps | Categories | Countries | Developers | (Insights - later)
```

---

### **Homepage Layout**

**MoneyControl Shows:**
- Index overview (Nifty, Sensex)
- Top gainers / losers
- News
- Quick links to markets, mutual funds, IPO

**AppCortex Shows:**
- App Indices ("Top 100 Google Play US", "Top 100 Apple US")
- Average rating / total installs snapshot
- Top Movers (biggest rank gainers/losers last 24h)
- Highlights ("Trending Categories", "Recently Added Apps")
- Quick Links (Explore Apps, Top Charts, Categories, Countries)

---

### **Stock List → App Explorer**

**MoneyControl Stock List:**
- Filters: Sector, Exchange
- Columns: Company, Price, Change, Volume
- Sortable table

**AppCortex App Explorer:**
- Filters: Store, Country, Category
- Columns: Icon + App Name, Store, Rank, Rating, Total Reviews
- Sortable table/grid

---

### **Stock Detail → App Detail**

**MoneyControl Stock Page:**
- Stock name, symbol, price, % change
- Charts (intraday, 1D, 1W)
- Fundamentals, financials
- News about company

**AppCortex App Detail:**
- App name, icon, store, country
- Rank today, rating, total reviews
- Installs range
- Charts: Ranking vs time, Rating vs time, Review volume vs time
- "News" equivalent: Review sentiment summary, Top review topics

---

### **Screeners Pattern**

**MoneyControl Mutual Fund Screener:**
- Complex filters (category, returns %, risk, AUM)
- Ranking funds within categories
- Performance over different periods

**AppCortex Advanced Screener:**
- Filters: Store, Country, Category, Rating >= X, Reviews >= X, Rank range
- Sort: Rank, Rating, Review count, Growth in rank over last 7 days

---

## 📐 PAGE-BY-PAGE DETAILED SPECIFICATIONS

### **P1. Homepage (`/`)**

**Purpose:** Market overview dashboard - "MoneyControl Markets" equivalent

**Layout:**
```
┌─────────────────────────────────────────────────┐
│  Header (Logo, Nav, Search, Sign In)           │
├─────────────────────────────────────────────────┤
│                                                 │
│  Hero Section                                   │
│  ┌─────────────────────────────────────────┐   │
│  │  "MoneyControl for App Markets"         │   │
│  │  "Track app performance across stores"   │   │
│  │  [Large Search Bar]                      │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│  Key Metrics Cards (4 columns)                  │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐         │
│  │19,288│ │44,494│ │465K  │ │32,550│         │
│  │ Apps │ │Snaps │ │Review│ │Rankng│         │
│  └──────┘ └──────┘ └──────┘ └──────┘         │
│                                                 │
│  Store Breakdown                                │
│  ┌──────────────┐ ┌──────────────┐           │
│  │ Google Play   │ │ Apple Store  │           │
│  │ 14,150 apps   │ │ 5,138 apps   │           │
│  └──────────────┘ └──────────────┘           │
│                                                 │
│  Top Charts (3 columns)                         │
│  ┌─────────────┐ ┌─────────────┐ ┌──────────┐ │
│  │ TOP FREE     │ │ TOP PAID    │ │ TOP GROS │ │
│  │ [App Cards]  │ │ [App Cards] │ │ [Cards]  │ │
│  └─────────────┘ └─────────────┘ └──────────┘ │
│                                                 │
│  Top Movers (Gainers & Losers)                  │
│  ┌──────────────┐ ┌──────────────┐           │
│  │ 🔺 Top Gainers│ │ 🔻 Top Losers │           │
│  │ [Rank up apps]│ │ [Rank down]   │           │
│  └──────────────┘ └──────────────┘           │
│                                                 │
│  Trending Categories                            │
│  [Category Cards Grid]                          │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Components:**
- `HeroSection` - Main CTA and search
- `MetricsCards` - Key statistics (total apps, snapshots, reviews, rankings)
- `StoreBreakdown` - Google vs Apple counts
- `TopCharts` - Top apps by chart type (TOP_FREE, TOP_PAID, TOP_GROSSING)
- `TopMovers` - Gainers and losers (requires new API)
- `TrendingCategories` - Popular categories

**API Calls:**
```typescript
// Optional - for highlights
GET /api/v1/apps?page=1&pageSize=10&sortBy=rank&sortDir=asc
GET /api/v1/apps?store=GOOGLE_PLAY&page=1&pageSize=5&sortBy=rank
GET /api/v1/apps?store=APPLE_APP_STORE&page=1&pageSize=5&sortBy=rank

// Future - for stats
GET /api/v1/dashboard/stats
```

**Backend Tables:**
- `App` - App counts
- `Review` - Review counts
- `AppRanking` - Ranking counts

---

### **P1. App Explorer (`/apps`)**

**Purpose:** Browse and filter all apps - "Stock Screener" equivalent

**Layout:**
```
┌─────────────────────────────────────────────────┐
│  Header                                         │
├─────────────────────────────────────────────────┤
│                                                 │
│  Filters (Top Bar)                              │
│  [Store ▼] [Country ▼] [Category ▼] [Search]   │
│                                                 │
│  Sort & View                                     │
│  Sort: [Rank ▼] View: [Grid] [List]            │
│                                                 │
│  App List (Grid/Table)                          │
│  ┌──────────────┐ ┌──────────────┐            │
│  │ [Icon]        │ │ [Icon]        │            │
│  │ App Name      │ │ App Name      │            │
│  │ Developer     │ │ Developer     │            │
│  │ ⭐ 4.5 (12M)  │ │ ⭐ 4.2 (8M)   │            │
│  │ Rank: #1      │ │ Rank: #5     │            │
│  │ [Store Badge]  │ │ [Store Badge] │            │
│  └──────────────┘ └──────────────┘            │
│  ... (25 per page)                              │
│                                                 │
│  [Pagination: 1 2 3 ... 100]                   │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Components:**
- `AppFilters` - Top bar filters (Store, Country, Category, Search)
- `AppList` - Grid/list of app cards
- `AppCard` - Individual app card component
- `Pagination` - Page navigation
- `SortControls` - Sort dropdown (Rank, Rating, Reviews, Name)

**API Calls:**
```typescript
GET /api/v1/apps?store={store}&country={country}&category={category}&search={query}&page={page}&pageSize={pageSize}&sortBy={sortBy}&sortDir={sortDir}
```

**Features:**
- Real-time filtering (debounced)
- URL state management (filters in query params)
- Grid/List view toggle
- Shareable URLs

**Backend Tables:**
- `App` - Main app listing
- `Category` - Category filtering
- `Developer` - Developer info in results

---

### **P1. App Detail (`/apps/[store]/[appId]`)**

**Purpose:** Comprehensive app information - "Stock Detail Page" equivalent

**Layout:**
```
┌─────────────────────────────────────────────────┐
│  Header                                         │
├─────────────────────────────────────────────────┤
│                                                 │
│  App Header Section                             │
│  ┌─────────────────────────────────────────┐   │
│  │ [Icon]  Title                    [Store] │   │
│  │         Developer                        │   │
│  │         ⭐ 4.5 (12M ratings)              │   │
│  │         #1 in Games | US                  │   │
│  │         [Share] [Compare] [Bookmark]      │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│  Tabs: [Overview] [Analytics] [Reviews] [Rank] │
│                                                 │
│  Overview Tab (Default)                          │
│  ┌─────────────────────────────────────────┐   │
│  │ Screenshots Carousel                     │   │
│  │ [Screenshot 1] [Screenshot 2] ...        │   │
│  │                                          │   │
│  │ Description                              │   │
│  │ [Full app description text]              │   │
│  │                                          │   │
│  │ Details Grid                             │   │
│  │ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐   │   │
│  │ │Price │ │Size  │ │Version│ │Rating│   │   │
│  │ │Free  │ │50 MB │ │2.1.0 │ │4+    │   │   │
│  │ └──────┘ └──────┘ └──────┘ └──────┘   │   │
│  │                                          │   │
│  │ Developer Info                           │   │
│  │ [Developer Name] [Website] [Email]       │   │
│  │                                          │   │
│  │ Category & Tags                          │   │
│  │ [Category] [Tag1] [Tag2]                │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│  Reviews Analytics Tab                          │
│  ┌─────────────────────────────────────────┐   │
│  │ Summary Cards                            │   │
│  │ ┌──────┐ ┌──────┐ ┌──────┐            │   │
│  │ │Total │ │Avg   │ │Trend │            │   │
│  │ │465K  │ │4.5   │ │↑ 0.1 │            │   │
│  │ └──────┘ └──────┘ └──────┘            │   │
│  │                                          │   │
│  │ Rating Distribution                      │   │
│  │ [Bar Chart: 1★ 2★ 3★ 4★ 5★]            │   │
│  │                                          │   │
│  │ Rating Trend (Last 30 Days)              │   │
│  │ [Line Chart: Rating over time]          │   │
│  │                                          │   │
│  │ Review Volume Trend                      │   │
│  │ [Bar Chart: Reviews per day]            │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│  Rankings Tab (Future)                          │
│  ┌─────────────────────────────────────────┐   │
│  │ Ranking History Chart                   │   │
│  │ [Line Chart: Rank position over time]    │   │
│  │                                          │   │
│  │ Chart Positions Table                    │   │
│  │ Date | Chart | Position | Country       │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Components:**
- `AppHeader` - Icon, title, developer, key metrics, action buttons
- `AppTabs` - Tab navigation (Overview, Analytics, Reviews, Rankings)
- `ScreenshotsCarousel` - Image carousel
- `RatingDistributionChart` - Bar chart (1-5 stars)
- `RatingTrendChart` - Line chart (rating over time)
- `ReviewVolumeChart` - Bar chart (reviews per day)
- `RankingHistoryChart` - Line chart (rank over time)

**API Calls:**
```typescript
// App details
GET /api/v1/apps/:store/:appId

// Reviews analytics
GET /api/v1/apps/:store/:appId/reviews-analytics?country={country}

// Future - Ranking history
GET /api/v1/apps/:store/:appId/ranking

// Future - Daily stats
GET /api/v1/apps/:store/:appId/stats
```

**Features:**
- Share button (copy link)
- Compare button (add to comparison)
- Bookmark/Favorite (future - requires auth)
- Export data (future)

**Backend Tables:**
- `App` - App details
- `Review` - Reviews data (via reviews-analytics)
- `AppRanking` - Ranking history (future)
- `AppDailyStat` - Daily statistics (future)
- `Developer` - Developer information
- `Category` - Category information

---

### **P1. Search Results (`/search?q=query`)**

**Purpose:** Search results page

**Layout:** Similar to App Explorer, but with:
- Search query highlighted in results
- "X results for 'query'" header
- Search suggestions (future)

**API Calls:**
```typescript
GET /api/v1/apps?search={query}
// or
GET /api/v1/apps?q={query}
```

**Components:**
- `SearchResults` - Filtered app list
- `SearchHighlight` - Highlight search terms in results
- `SearchSuggestions` - Auto-complete suggestions (future)

---

### **P1. Dashboard (`/dashboard`)**

**Purpose:** Global app market dashboard

**Layout:**
```
┌─────────────────────────────────────────────────┐
│  Header                                         │
├─────────────────────────────────────────────────┤
│                                                 │
│  Market Overview Cards                          │
│  ┌──────────────┐ ┌──────────────┐            │
│  │ Total Apps   │ │ Total Reviews│            │
│  │ 19,288       │ │ 465,607      │            │
│  └──────────────┘ └──────────────┘            │
│  ┌──────────────┐ ┌──────────────┐            │
│  │ Raw Snapshots │ │ Rankings    │            │
│  │ 44,494        │ │ 32,550      │            │
│  └──────────────┘ └──────────────┘            │
│                                                 │
│  Store Breakdown                                │
│  ┌──────────────┐ ┌──────────────┐            │
│  │ Google Play   │ │ Apple Store  │           │
│  │ 14,150 apps   │ │ 5,138 apps   │           │
│  │ 73%           │ │ 27%          │           │
│  └──────────────┘ └──────────────┘           │
│                                                 │
│  Top Categories                                 │
│  [Category Cards with app counts]              │
│                                                 │
│  Recent Activity                                │
│  [Timeline of recent scrapes/discoveries]      │
│                                                 │
└─────────────────────────────────────────────────┘
```

**API Calls:**
```typescript
// For counts
GET /api/v1/apps?pageSize=1  // Just to get total count
// Future: GET /api/v1/dashboard/stats
```

**Components:**
- `MarketOverviewCards` - Key metrics
- `StoreBreakdown` - Google vs Apple pie chart
- `TopCategories` - Category cards
- `RecentActivity` - Timeline (future)

---

## 🎨 DESIGN SYSTEM

### **Colors**
- **Primary:** Blue (#2563EB) - Links, buttons, highlights
- **Secondary:** Gray (#6B7280) - Text, borders
- **Success:** Green (#10B981) - Positive metrics, gainers
- **Warning:** Yellow (#F59E0B) - Warnings
- **Error:** Red (#EF4444) - Errors, losers
- **Background:** White (#FFFFFF) / Light Gray (#F9FAFB)

### **Typography**
- **Headings:** Inter, Bold
- **Body:** Inter, Regular
- **Monospace:** Numbers, IDs (JetBrains Mono)

### **Spacing**
- Base unit: 4px
- Common: 8px, 16px, 24px, 32px, 48px

### **Components Style**
- **Cards:** Rounded corners (8px), shadow (subtle)
- **Buttons:** Rounded (6px), padding (12px 24px)
- **Inputs:** Rounded (6px), border (1px solid gray)

---

## 📱 RESPONSIVE DESIGN

### **Breakpoints**
- **Mobile:** < 640px
- **Tablet:** 640px - 1024px
- **Desktop:** > 1024px

### **Mobile Adaptations**
- Filters become modal/drawer
- App cards stack vertically
- Charts become scrollable
- Tabs become swipeable

---

## 🔄 STATE MANAGEMENT

### **URL State**
- Filters stored in query params
- Shareable URLs
- Browser back/forward support

### **Client State**
- Selected apps for comparison
- User preferences (view mode, etc.)
- Search history (localStorage)

### **Server State**
- React Query / SWR for API data
- Automatic caching and refetching
- Optimistic updates

---

## 🚀 IMPLEMENTATION PLAN

### **Phase 1: Core Pages (Week 1-2)**
1. ✅ Homepage (`/`)
2. ✅ App Explorer (`/apps`)
3. ✅ App Detail (`/apps/[store]/[appId]`)
4. ✅ Search Results (`/search`)
5. ✅ Dashboard (`/dashboard`)

### **Phase 2: Navigation (Week 3)**
6. Category Browser (`/categories`)
7. Category Detail (`/categories/[slug]`)
8. Country Browser (`/countries`)
9. Country Detail (`/countries/[code]`)

### **Phase 3: Advanced Features (Week 4)**
10. Compare Apps (`/compare`)
11. Developer Profiles (`/developers/[id]`)
12. Ranking History Charts (needs backend API)
13. Daily Stats Charts (needs backend API)

### **Phase 4: Polish (Week 5)**
14. Responsive design
15. Performance optimization
16. Accessibility improvements

---

## 📋 NEXT STEPS

1. ✅ **Design Document Created** - This comprehensive document
2. ⏳ **Set up Next.js project** - Initialize Next.js 14 with App Router
3. ⏳ **Create component library** - Build reusable components
4. ⏳ **Implement P1 pages** - Start with 8 core pages connected to backend
5. ⏳ **Add backend APIs** - Implement ranking history and daily stats endpoints
6. ⏳ **Expand to P2 pages** - Categories, countries, developers

---

## 📊 SUMMARY: 64 Pages Total

- **P1 (Build Now):** 8 pages - Connected to existing backend
- **P2 (Next Phase):** 24 pages - Need some backend extensions
- **P3 (Future):** 32 pages - Require auth, new features, or advanced APIs

**Focus:** Start with 8 P1 pages to get a working frontend connected to your scraped data!

---

**Document Version:** 2.0  
**Last Updated:** December 3, 2025  
**Status:** Ready for Frontend Implementation

