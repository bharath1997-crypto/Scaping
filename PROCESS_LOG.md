## AppCortex Project Goal

**North Star**: AppCortex is the Bloomberg-style intelligence platform for the global app economy – real-time, multi-store, AI-powered app market intelligence for everyone.

- **Core vision**
  - Single source of truth for mobile app market data across Google Play, Apple App Store, and later Samsung, Huawei, Xiaomi, and regional stores.
  - Public website that is valuable even before login (AppBrain/MoneyControl-style), auto-updating and read-only for visitors.
  - Deep analytics, AI insights, and historical tracking gated behind login/subscriptions.
- **We exist to**
  - Solve fragmentation of app market data and limited visibility into competitors and trends.
  - Replace manual, store-by-store research with always-on, historical, multi-store tracking.
  - Help creators, investors, and product teams make faster, data-driven decisions.
- **Backend goals**
  - 24/7 scraping and serving with resilient, modular scrapers (per-store connectors, retry, backoff, and fallbacks).
  - Standardized APIs (stateless, versioned) and strong data storage (PostgreSQL, Redis/BullMQ, indexed, auditable).
  - High data accuracy, freshness (45 minutes–3 hours), observability, and error logging.
- **Frontend goals**
  - Clean, data-first UI that feels like a live market dashboard (tickers, timestamps, SEO-rich public pages).
  - Clear navigation (Home, Market, Explore, Insights, Developers, Pricing) and strong conversion from public → registered → paid.
- **AI goals**
  - Summaries and opportunity scores, review sentiment, feature gap analysis, clone/saturation detection, and growth forecasting.
- **Audiences**
  - Indie developers & small studios (primary), investors & analysts (secondary), product teams & startups (third).

### Progress Checkpoints (what we’ve achieved so far)
- **Backend foundation**: TypeScript ESM backend, modular connectors/services/scripts/types/utils in place and ready for multi-store expansion.
- **Resilient Google Play connector**: Real `google-play-scraper` integration with retry, UA rotation, HTML backup (axios + cheerio), and dummy fallback so flows never break.
- **Execution + tracking**: `npm run scrape` runner wired to the connector, with clear logs about which mode is used and this `PROCESS_LOG.md` to track changes/errors.

### Full AppCortex Goal Breakdown (200 points)
1. Our project goal is to build **AppCortex**, the Bloomberg-style intelligence platform for the global app economy. 
2. We aim to become a single source of truth for mobile app market data across stores. 
3. We will track apps from Google Play, Apple App Store, and later Samsung, Huawei, Xiaomi, and regional stores. 
4. We will scrape and refresh app data every 45 minutes to 3 hours. 
5. The public website must be valuable even before login, like AppBrain/MoneyControl style. 
6. Public mode will auto-update and be read-only for visitors. 
7. Users should instantly understand what AppCortex is and why it matters. 
8. We will provide trending apps, categories, and market snapshots publicly. 
9. Deeper analytics will be gated behind login/subscription. 
10. We exist to solve fragmentation of app market data. 
11. We exist to solve limited visibility into competitors and trends. 
12. We exist to replace manual store-by-store research. 
13. We exist to create historical tracking that stores do not provide. 
14. Our dataset will store both live snapshots and long-term history. 
15. We want users to check AppCortex daily, like a market news dashboard. 
16. We will build category heatmaps showing growth/decline. 
17. We will build top charts (free, paid, new, trending). 
18. We will build regional views (Global, US, India, UAE, etc.). 
19. We will enable search for any app or developer in public preview. 
20. We will provide basic app preview pages publicly. 
21. We will add AI summaries to make data readable fast. 
22. AI will extract sentiment from reviews at scale. 
23. AI will identify feature gaps in competitor apps. 
24. AI will generate opportunity scores for new app ideas. 
25. AI will detect clone apps and saturation patterns. 
26. AI will help forecast category or app growth. 
27. Our primary audience is indie developers and small studios. 
28. We want to answer “Should I build this app?” with data. 
29. We want to show how crowded a niche is before devs invest time. 
30. We will show top competitors and their trajectories. 
31. We will surface user pain points from reviews. 
32. We will recommend pricing/monetization directions. 
33. Our secondary audience is investors and analysts. 
34. They will use us to find emerging categories early. 
35. They will track portfolio apps with dashboards and alerts. 
36. Our third audience is product teams and startups. 
37. They will use us for competitive intelligence and roadmap decisions. 
38. We will democratize access with a useful free tier. 
39. We will keep paid plans affordable for creators. 
40. We will offer enterprise plans for large-scale API access. 
41. The backend goal is to run 24/7 scraping + serving reliably. 
42. We will use a stateless API design for scaling. 
43. We will process heavy jobs asynchronously via queues. 
44. We will store data in PostgreSQL with strong indexing. 
45. We will use Redis + BullMQ for scraping job orchestration. 
46. We will log all jobs, errors, and progress for transparency. 
47. We will maintain high data accuracy and freshness targets. 
48. We will provide health checks and observability. 
49. We will build APIs for apps, market stats, and scrapers. 
50. We will standardize response formats for frontend ease. 
51. Frontend goal is a clean, data-first, investor-ready UI. 
52. It must feel alive with live tickers and timestamps. 
53. It must be SEO-rich with public category/app pages. 
54. It must convert public users into registered users. 
55. Home page goal: global app economy snapshot. 
56. Market tab goal: real-time indices and movers. 
57. Explore tab goal: search and browse any app easily. 
58. Insights tab goal: publish AI-assisted reports and trends. 
59. Developers tab goal: community stories and leaderboards. 
60. Pricing tab goal: clear funnel from free to pro.
61. We will update public rankings multiple times per day. 
62. We will show only partial lists publicly to tease depth. 
63. We will add CTAs on every page for sign-up. 
64. We will add newsletter capture in public mode. 
65. We will brand ourselves as “App economy intelligence.” 
66. We will keep data ethical and transparent. 
67. We will avoid copying UI blindly; we will add unique value. 
68. We will differentiate with multi-store coverage. 
69. We will differentiate with faster refresh cycles. 
70. We will differentiate with AI opportunity scoring. 
71. We will differentiate with developer-first UX. 
72. We will differentiate with regional focus and localization.
73. We will support app idea validation workflows. 
74. We will support competitor watchlists (post-login). 
75. We will support alerts for rank/ratings changes (post-login). 
76. We will support exports for researchers (post-login). 
77. We will build “Cortex Index” metrics for market health. 
78. We will show index trends publicly like stock indices. 
79. We will add sub-indices (games, fintech, AI tools, etc.). 
80. We will provide “top risers/fallers” by app and category. 
81. We will provide “new launches” tracking. 
82. We will track app updates and version changes. 
83. We will keep raw scrape events for auditability. 
84. We will have internal admin tools to manage scraping. 
85. We will design for horizontal scaling (multi-API, multi-worker). 
86. We will be resilient to store layout changes. 
87. We will add retry and backoff for scraping stability. 
88. We will handle rate limits safely. 
89. We will keep costs low via open-source stack. 
90. We will ship MVP first, then iterate in phases. 
91. Phase 1 goal: public portal + core scraping. 
92. Phase 2 goal: user accounts + watchlists. 
93. Phase 3 goal: full AI analytics and forecasting. 
94. Phase 4 goal: enterprise APIs and white-label reports. 
95. Phase 5 goal: ecosystem marketplace and community. 
96. We will focus on usability for non-technical creators. 
97. We will provide clear charts, not just raw tables. 
98. We will add quick AI “what’s happening now” notes.
99. We will prioritize speed and responsiveness. 
100. We will ensure public pages load fast and clean. 
101. We will allow app search by keyword, dev, category, store. 
102. We will normalize categories across stores internally. 
103. We will store country/region signals per app. 
104. We will compute growth rates weekly/monthly. 
105. We will compute saturation indicators per niche. 
106. We will support “similar apps” discovery. 
107. We will support developer portfolio pages publicly (limited). 
108. We will let verified developers post stories later.
109. We will add sponsored placements as a revenue stream. 
110. We will help users avoid building useless clone apps. 
111. We will highlight underserved opportunities. 
112. We will visualize market gaps clearly. 
113. We will make app-economy data as easy as stock data.
114. We will provide public education content via Insights. 
115. We will publish recurring “Top AI apps” type reports. 
116. We will design a consistent UI system across pages. 
117. We will keep navigation simple: Home, Market, Explore, Insights, Developers. 
118. We will include a visible live ticker in header. 
119. We will show “last updated” on every widget. 
120. We will maintain strict input validation in backend. 
121. We will secure APIs with rate limits. 
122. We will add auth (JWT) when login ships. 
123. We will keep API versions stable (/api/v1). 
124. We will log structured JSON for easy monitoring. 
125. We will containerize with Docker for dev=prod parity. 
126. We will later add CI/CD pipelines. 
127. We will be ready for cloud scaling. 
128. We will keep a roadmap visible internally. 
129. We will measure success by coverage, freshness, and users. 
130. Year-1 target: at least 1M apps tracked. 
131. Year-1 target: 10M reviews analyzed. 
132. Year-1 target: 10k registered users. 
133. Year-1 target: 1k paying subscribers. 
134. Year-1 target: strong SEO footprint via public pages. 
135. We will treat public site as the top funnel. 
136. We will treat AI insights as our moat. 
137. We will treat multi-store data as our moat. 
138. We will treat historical tracking as our moat. 
139. We will optimize for developer stickiness.
140. We will optimize for investor credibility.
141. We will keep UX simple but information-dense. 
142. We will avoid clutter like typical analytics dashboards. 
143. We will allow platform toggles (Android/iOS). 
144. We will provide store links for verification. 
145. We will handle deleted/removed apps in history. 
146. We will preserve lifecycle trajectories. 
147. We will compute install/rank deltas over time. 
148. We will offer a clean public API preview later.
149. We will build trust through transparency and consistency. 
150. We will grow into the standard for app market data. 
151. We will support founders to validate timing and launch strategy. 
152. We will help teams prioritize features based on market evidence. 
153. We will provide simple “market health” numbers by category. 
154. We will surface cross-region adoption differences. 
155. We will spotlight breakout apps quickly via fast refresh. 
156. We will support multiple languages later for global reach. 
157. We will add an “investor media kit” section. 
158. We will add case studies of successful apps.
159. We will add a “tools/SDK usage” analytics area later.
160. We will keep iterating based on real user behavior. 
161. We will collect internal metrics on what public features convert best.
162. We will keep development solo-friendly and automated. 
163. We will rely on AI tools to accelerate build speed. 
164. We will document everything in a “main brain” guide. 
165. We will keep the system modular for adding new stores. 
166. We will use strategy/factory patterns for scraper plugins. 
167. We will test scrapers regularly. 
168. We will prioritize reliability over risky scraping hacks. 
169. We will add Puppeteer only where needed for dynamic pages. 
170. We will keep Cheerio/Axios for speed where possible. 
171. We will store data in normalized, query-friendly tables. 
172. We will keep migration/version control clean. 
173. We will ensure API latency stays low (<500ms goal). 
174. We will ensure uptime target 99.9%. 
175. We will keep a free public entrance forever. 
176. We will treat public pages as marketing + utility. 
177. We will create habit loops via “what’s trending now.” 
178. We will expand to web apps/SaaS listings later. 
179. We will open future integrations with other datasets. 
180. We will position AppCortex as essential infra for creators. 
181. We will keep storytelling community features to build loyalty. 
182. We will allow developers to advertise ethically. 
183. We will avoid dark-pattern paywalls. 
184. We will keep our insights actionable, not academic only. 
185. We will keep room for patents/unique IP as we mature. 
186. We will keep improving “Cortex Score” algorithms. 
187. We will eventually support M&A and valuation intelligence. 
188. We will build toward being an industry standard. 
189. We will start with a strong MVP, not a bloated v1. 
190. We will iterate fast with real data pipelines. 
191. We will keep the brand trustable, clean, and global.
192. We will prioritize user clarity over noise in every page. 
193. We will keep the whole system as “app economy newsroom.” 
194. We will empower smarter building, investing, and research. 
195. We will make app markets understandable in minutes. 
196. We will help creators win by choosing the right problems. 
197. We will help users avoid wasted development time. 
198. We will help the ecosystem grow with transparency. 
199. Ultimately, AppCortex will be the place people go to learn “what’s happening in apps.”
200. That’s the North Star: **real-time, multi-store, AI-powered app market intelligence for everyone.** 

---

### Session 1 – Initial backend base setup
- **Actions**
  - Added TypeScript ESM backend structure (`src/connectors`, `src/services`, `src/scripts`, `src/types`, `src/utils`).
  - Added dummy `BaseConnector` and `GooglePlayConnector` plus `ScraperService` and `runScraper` runner.
  - Added `tsconfig.json` and updated `package.json` for ESM + `ts-node`.
- **Commands to run**
  - `npm run scrape`
- **Issues / mistakes**
  - None recorded for this stage.

### Session 2 – Fixing `.ts` import issues
- **Actions**
  - Enabled `allowImportingTsExtensions` in `tsconfig.json` to allow `.ts` suffix in imports.
  - Added `noEmit: true` to satisfy TypeScript’s requirement when using `allowImportingTsExtensions`.
- **Commands to run**
  - `npm run scrape` (after TS config updates).
- **Issues / mistakes**
  - Error: `An import path can only end with a '.ts' extension when 'allowImportingTsExtensions' is enabled.`
  - Error: `Option 'allowImportingTsExtensions' can only be used when either 'noEmit' or 'emitDeclarationOnly' is set.`
  - Both resolved by updating `tsconfig.json` accordingly.

### Session 3 – Upgrading Google Play scraper to real mode
- **Actions**
  - Updated `googlePlayConnector.ts` to use:
    - Real `google-play-scraper` API with retry logic and User-Agent rotation (now using literal `'topselling_free'` instead of `TOP_FREE`).
    - HTML backup scraper with `axios` + `cheerio`.
    - Dummy fallback so callers never break.
  - Updated `scraperService.ts` to log which mode is used (real API, HTML backup, or dummy).
  - Added `cheerio` dependency in `package.json`.
- **Commands to run**
  - `npm install` (to ensure `cheerio` and other deps are installed, including `npm install cheerio`).
  - `npm run scrape`
- **Issues / mistakes**
  - None outstanding; runner should still complete even when Play Store requests fail (falls back to dummy data).

### Session 4 – Prisma + rich app storage
- **Actions**
  - Expanded `prisma/schema.prisma` to:
    - Enrich `App` with many fields (identity, developer, category, ratings, installs/pricing, version/device, policy, misc).
    - Enrich `AppDailyStat` with ratings/reviews/min/max installs and rank.
    - Add `ScrapeMode` enum and `RawScrapeEvent` model for JSON payload archiving.
  - Expanded `AppInfo` in `src/types/global.d.ts` to mirror the richer Google Play fields.
  - Upgraded `GooglePlayConnector.fetchTopFree` to:
    - Call `gplay.list` then `gplay.app` per app to enrich data.
    - Map as many fields as possible into `AppInfo`.
  - Upgraded `ScraperService.runGooglePlayDemo` to:
    - Upsert into `App` (without overwriting non-null fields with null).
    - Insert `AppDailyStat` snapshots.
    - Insert `RawScrapeEvent` rows with normalized payload and mode used.
- **Commands to run**
  - Ensure `DATABASE_URL` is set in `.env` for PostgreSQL.
  - `npx prisma migrate dev --name enrich_app_fields`
  - `npx prisma generate`
  - `npm run scrape`
- **Issues / mistakes**
  - None recorded yet; future sessions will refine mappings and add Apple/other stores.

### Session 5 – Developer/Category models + Prisma-style ScraperService
- **Actions**
  - Extended `App` model with `developerRefId`/`developerRef` and `categoryRefId`/`categoryRef` relations.
  - Added `Developer` and `Category` models with proper uniques and indexes.
  - Replaced `ScraperService` class with a Prisma-style service object that:
    - Provides `getOrCreateDeveloper`, `getOrCreateCategory`, `scrapeAndSaveApp`, and `scrapeTopApps`.
    - Uses `GooglePlayConnector` to fetch rich `AppInfo` and persist into `App`, `AppDailyStat`, and `RawScrapeEvent`.
  - Updated `runScraper.ts` to call `ScraperService.scrapeTopApps(Store.GOOGLE_PLAY, 10, "us")`.
- **Commands to run**
  - `npx prisma migrate dev --name add_dev_category`
  - `npx prisma generate`
  - `npm run scrape`
- **Issues / mistakes**
  - Ensure `ScrapeMode` enum is generated by Prisma (run migrate+generate) so the new service compiles cleanly.

### Session 6 – BigInt fix for large counts (ratings/reviews/installs)
- **Actions**
  - Changed `ratings`, `reviews`, `minInstalls`, `maxInstalls` from `Int?` to `BigInt?` in both `App` and `AppDailyStat` models (PostgreSQL INT4 can't hold values > 2.147B).
  - Added `toBigIntOrNull()` helper in `scraperService.ts` to safely convert JS numbers to Prisma `BigInt`.
  - Updated `baseData` mapping and `AppDailyStat.create` to use `toBigIntOrNull()` for those fields.
- **Commands to run**
  - `npx prisma migrate dev --name bigint_counts_fix`
  - `npx prisma generate`
  - `npm run scrape`
- **Issues / mistakes**
  - Fixed: PostgreSQL INT4 overflow when Google Play returns huge numbers (e.g., 5B+ installs). BigInt (64-bit) is now used for all count fields, making the DB future-proof for AppCortex scale.

### Session 7 – Star breakdown columns for analytics
- **Actions**
  - Added `star1Count`, `star2Count`, `star3Count`, `star4Count`, `star5Count` as `BigInt?` columns to both `App` and `AppDailyStat` models.
  - Added `parseStars()` helper function to extract star counts from histogram JSON and convert to BigInt.
  - Updated `baseData` mapping to include `...parseStars(scrapedApp.histogram)` after `histogram`.
  - Updated `AppDailyStat.create` to include both `histogram` JSON and `...parseStars()` for column-based analytics.
- **Commands to run**
  - `npx prisma migrate dev --name add_star_breakdown`
  - `npx prisma generate`
  - `npm run scrape`
- **Issues / mistakes**
  - None; this enables easy analytics queries (e.g., "% 5-star apps by category", "review bombing detection") while keeping histogram JSON for flexibility and future fields.

---

## 📊 **COMPREHENSIVE DATA INVENTORY & FEATURE ROADMAP**

### **Data Collection Map (Complete Inventory)**

**Available Data Categories:**
1. **App Metadata** (✅ Currently collecting): Name, developer, description, screenshots, version, pricing, IAP, content rating, etc.
2. **Downloads & Installs** (✅ Currently collecting): Download ranges, min/max installs (BigInt)
3. **Ratings & Reviews** (⚠️ Partial): Overall rating, total ratings/reviews, histogram/star breakdown (✅), but **individual reviews not yet stored**
4. **Rankings** (⚠️ Partial): Daily rank in `AppDailyStat`, but **chart positions and category rankings not yet normalized**
5. **Financial Data** (✅ Basic): Price, IAP range, free/paid flag (revenue estimation requires ML model later)
6. **Technical Data** (✅ Basic): App size, Android version, permissions (partial)
7. **Competitive Intelligence** (⚠️ Requires multi-app comparison logic)
8. **Trend & Forecast** (⚠️ Requires historical data + ML models)
9. **Time-Series** (✅ Foundation): `AppDailyStat` table tracks daily snapshots

### **Recommended Next Steps (Priority Order)**

**🎯 Phase 1: Reviews & Rankings (High Value, Medium Effort)**
- **Why**: Reviews are the highest-value data for AI features (sentiment, topics, pain points). Rankings enable trending features.
- **What to add**:
  - `Review` model: Store individual reviews (text, rating, date, version, helpful count, developer reply)
  - `AppRanking` model: Store chart positions (top free, top paid, top grossing, category ranks, regional ranks)
- **Features enabled**: Review browser, sentiment analysis, topic clustering, ranking trends, trending apps

**🚀 Phase 2: Enhanced Rankings & Historical Tracking (Medium Value, Low Effort)**
- **What to add**:
  - Expand `AppDailyStat` with more ranking fields (category rank, subcategory rank, regional ranks)
  - Add ranking velocity calculations (change_24h, change_7d, change_30d)
- **Features enabled**: Rank forecasting, category dominance analysis, regional insights

**💎 Phase 3: AI Processing Layer (High Value, High Effort)**
- **What to add**:
  - Review sentiment analysis (positive/negative/neutral scores)
  - Topic clustering (performance, UI/UX, pricing, bugs, features, support)
  - Keyword extraction and frequency analysis
  - Feature request detection
  - Pain point identification
- **Storage**: New `ReviewAnalysis` model or JSON fields on `Review`
- **Features enabled**: AI-powered insights, competitor comparison, market intelligence

**🔮 Phase 4: Forecasting & ML Models (Very High Value, Very High Effort)**
- **What to add**:
  - Download estimation model (from rank + signals)
  - Revenue estimation model (from downloads + IAP + benchmarks)
  - Rating/rank forecasting (time-series ML)
  - Review bombing detection (anomaly detection)
- **Features enabled**: Investment scoring, market forecasting, risk alerts

### **Current Schema Coverage**

✅ **Fully Supported:**
- App metadata (identity, developer, category, description, media)
- Ratings aggregate (score, total ratings/reviews, star breakdown)
- Installs (ranges, min/max as BigInt)
- Pricing (price, currency, IAP, free/paid)
- Version tracking (version, updated, released)
- Daily snapshots (`AppDailyStat` with history)
- Raw event archiving (`RawScrapeEvent` JSON payloads)

⚠️ **Partially Supported:**
- Rankings (only daily rank in `AppDailyStat`, missing chart positions and category ranks)
- Reviews (aggregate counts only, no individual review storage)

❌ **Not Yet Supported:**
- Individual review storage and analysis
- Chart position tracking (top free, top paid, top grossing)
- Category/subcategory rankings
- Regional rankings
- Review text analysis (sentiment, topics, keywords)
- Financial estimation models
- Forecasting models

### **Storage Estimates (Based on Inventory)**

```
Current schema (10,000 apps):
- App rows: ~10,000 × 2 KB = 20 MB
- AppDailyStat: 10,000 × 730 days × 1 KB = 7.3 GB
- RawScrapeEvent: 10,000 × 730 × 5 KB = 36.5 GB
- Total: ~44 GB

With Reviews (Phase 1):
- Review rows: 10,000 apps × 1,000 reviews × 2 KB = 20 GB
- Total: ~64 GB

With Rankings (Phase 1):
- AppRanking rows: 10,000 × 730 × 0.5 KB = 3.65 GB
- Total: ~68 GB

Full system (all phases):
- Reviews + Analysis: ~80 GB
- Rankings: ~5 GB
- Historical snapshots: ~10 GB
- Total: ~95-100 GB

Cost estimate: $20-30/month (PostgreSQL on cloud)
```

### **Next Immediate Action**

**Recommendation: Start with Reviews & Rankings (Phase 1)**

This provides:
- ✅ Immediate user value (review browser, ranking trends)
- ✅ Foundation for AI features (sentiment analysis on stored reviews)
- ✅ Competitive moat (historical review data is irreplaceable)
- ✅ Manageable scope (2 new models, extend existing scrapers)

**Would you like me to:**
1. ✅ **Extend Prisma schema** with `Review` and `AppRanking` models
2. ✅ **Update GooglePlayConnector** to fetch and return reviews + chart positions
3. ✅ **Update ScraperService** to store reviews and rankings
4. ✅ **Add migration commands** to the process log

**Or would you prefer to:**
- Build the REST API first (so frontend can read existing data)
- Focus on a different data category
- Design the AI processing pipeline architecture

### Session 8 – Phase 1: Reviews & Rankings implementation
- **Actions**
  - Added `Review` model to Prisma schema:
    - Fields: reviewId, rating (1-5), reviewText, reviewDate, reviewerName, helpfulCount, appVersion, country, developerReply, developerReplyDate
    - Indexes on appIdRef, reviewDate, rating, country for fast queries
  - Added `AppRanking` model to Prisma schema:
    - Fields: chartType (enum: TOP_FREE, TOP_PAID, TOP_GROSSING, etc.), position, category, country, date
    - Unique constraint on (appIdRef, chartType, category, country, date) to prevent duplicates
    - Indexes for fast lookups by chart type, country, category
  - Added `ChartType` enum to Prisma schema
  - Extended `App` model with `reviews` and `rankings` relations
  - Added `ReviewInfo` and `RankingInfo` types to `src/types/appInfo.ts`
  - Added `GooglePlayConnector.fetchReviews()` method:
    - Fetches up to 100 reviews per app using `gplay.reviews()`
    - Maps to `ReviewInfo` with retry logic and UA rotation
    - Falls back gracefully if reviews unavailable
  - Added `GooglePlayConnector.fetchChartRankings()` and `getAppRanking()` methods:
    - Fetches chart positions for TOP_FREE, TOP_PAID, TOP_GROSSING
    - Supports category-specific and regional charts
  - Updated `ScraperService.scrapeAndSaveApp()` to:
    - Fetch and store up to 100 reviews per app (deduplicates by reviewId or content)
    - Fetch and store current rankings for TOP_FREE, TOP_PAID, TOP_GROSSING
    - Updates existing reviews if developer replies are added
  - Updated `ScraperService.scrapeTopApps()` to:
    - Store TOP_FREE ranking position from list order
- **Commands to run**
  - `npx prisma migrate dev --name add_reviews_rankings`
  - `npx prisma generate`
  - `npm run scrape`
- **Issues / mistakes**
  - Review deduplication uses reviewId when available, otherwise falls back to content+date+rating matching
  - Rankings are stored per scrape, allowing historical ranking tracking over time
  - This enables: review browser, sentiment analysis (Phase 3), ranking trends, trending apps detection

### Session 9 – Frontend scaffolding: Reviews & Ratings Intelligence UI
- **Actions**
  - Created frontend scaffolding for Reviews & Ratings Intelligence section:
    - `frontend/src/hooks/useAppReviewsAnalytics.ts`: React hook with axios + mock data fallback
    - `frontend/src/components/reviews/ReviewsRatingsTab.tsx`: Main tab component with KPI row, charts, insights
    - `frontend/src/components/reviews/StarBreakdownChart.tsx`: Bar chart for 5-star distribution
    - `frontend/src/components/reviews/RatingTrendChart.tsx`: Line chart for rating trends over 30 days
    - `frontend/src/components/reviews/ReviewVolumeChart.tsx`: Area chart for review volume over time
    - `frontend/src/components/reviews/KeywordCloud.tsx`: Keyword tags display
    - `frontend/src/components/reviews/InsightsCards.tsx`: Complaints vs Praises comparison cards
    - `frontend/src/components/reviews/FeatureRequestsList.tsx`: Ranked feature requests list
    - `frontend/src/components/reviews/TrustAlerts.tsx`: Trust flags and manipulation alerts
  - Created `frontend/CURSOR_PROMPT.md` with:
    - Main Cursor AI prompt for generating the Reviews & Ratings section
    - Phase-2 upgrade prompt for AI insights enhancements
    - Folder structure documentation
    - API contract specification
- **Tech stack**
  - Next.js 14 + React + TypeScript
  - Tailwind CSS + shadcn/ui
  - recharts for data visualization
  - axios for API calls
- **API endpoint needed**
  - `GET /api/v1/apps/:store/:appId/reviews-analytics`
  - Returns: app metadata, dailyStats (30 days), AI insights (keywords, complaints, praises, feature requests, sentiment, trust flags)
- **Commands to run**
  - Copy `frontend/` files into your Next.js project
  - Install dependencies: `npm install recharts axios`
  - Integrate `ReviewsRatingsTab` into your App Details page
  - Build backend endpoint `/api/v1/apps/:store/:appId/reviews-analytics` (see next session)
- **Issues / mistakes**
  - Frontend code is ready but requires backend API endpoint to be fully functional
  - Mock data is included for development/testing
  - Components use TypeScript `any` types - should be replaced with proper types from backend API


