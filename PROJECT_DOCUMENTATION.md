# AppCortex - Complete Project Documentation

**Version:** 1.0  
**Last Updated:** 2024-11-22  
**Status:** Backend MVP Complete, Frontend Scaffolding Ready

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Architecture](#architecture)
4. [Project Structure](#project-structure)
5. [Development Journey](#development-journey)
6. [Current State](#current-state)
7. [Commands Reference](#commands-reference)
8. [Tools & Dependencies](#tools--dependencies)
9. [Database Schema](#database-schema)
10. [API Endpoints (Planned)](#api-endpoints-planned)
11. [Next Steps](#next-steps)

---

## 🎯 Project Overview

### Vision

**AppCortex** is the Bloomberg-style intelligence platform for the global app economy – real-time, multi-store, AI-powered app market intelligence for everyone.

### Core Mission

- **Single source of truth** for mobile app market data across Google Play, Apple App Store, Samsung, Huawei, Xiaomi, and regional stores
- **Public-first approach**: Valuable even before login (AppBrain/MoneyControl-style)
- **AI-powered insights**: Sentiment analysis, feature gap detection, opportunity scoring, forecasting
- **Historical tracking**: Long-term data that stores don't provide
- **Developer-focused**: Help creators, investors, and product teams make data-driven decisions

### Target Audiences

1. **Primary**: Indie developers & small studios
2. **Secondary**: Investors & analysts
3. **Tertiary**: Product teams & startups

---

## 🛠 Tech Stack

### Backend

- **Runtime**: Node.js (ESM modules)
- **Language**: TypeScript 5.9.3
- **Database**: PostgreSQL (via Prisma ORM)
- **ORM**: Prisma 6.19.0
- **Scraping**: 
  - `google-play-scraper` 10.1.2
  - `axios` 1.13.2 (HTTP requests)
  - `cheerio` 1.1.2 (HTML parsing fallback)
- **Environment**: `dotenv` 16.6.1
- **Script Runner**: `ts-node` 10.9.2

### Frontend (Scaffolding Ready)

- **Framework**: Next.js 14 + React + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Charts**: recharts
- **HTTP Client**: axios

### Development Tools

- **TypeScript**: 5.9.3
- **Package Manager**: npm
- **Version Control**: Git
- **Database Migrations**: Prisma Migrate

---

## 🏗 Architecture

### Backend Architecture

```
┌─────────────────────────────────────────────────┐
│              Scraper Service                    │
│  (scraperService.ts)                            │
│  - Orchestrates scraping workflow               │
│  - Manages Developer/Category creation          │
│  - Handles data persistence                     │
└──────────────────┬──────────────────────────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
┌───────▼────────┐   ┌────────▼──────────┐
│   Connectors   │   │   Prisma ORM      │
│                │   │                   │
│ - Google Play  │   │ - App             │
│ - Base (dummy) │   │ - AppDailyStat    │
│                │   │ - Review          │
│ (Future:       │   │ - AppRanking      │
│  Apple, etc.) │   │ - Developer       │
└────────────────┘   │ - Category        │
                     │ - RawScrapeEvent  │
                     └────────┬──────────┘
                              │
                     ┌────────▼──────────┐
                     │   PostgreSQL      │
                     │   Database        │
                     └───────────────────┘
```

### Data Flow

1. **Scraper Runner** (`runScraper.ts`) → Calls `ScraperService.scrapeTopApps()`
2. **ScraperService** → Calls `GooglePlayConnector.fetchTopFree()`
3. **GooglePlayConnector** → 
   - Tries real API (`google-play-scraper`)
   - Falls back to HTML scraping (axios + cheerio)
   - Falls back to dummy data (never breaks)
4. **ScraperService** → For each app:
   - Upserts `App` record
   - Creates `AppDailyStat` snapshot
   - Fetches and stores `Review` records
   - Fetches and stores `AppRanking` records
   - Creates `RawScrapeEvent` for audit trail

### Resilience Strategy

- **3-Tier Fallback**: Real API → HTML Backup → Dummy Data
- **Retry Logic**: 2 retries with 500ms delay
- **User-Agent Rotation**: 3 different UAs to avoid blocking
- **Never Break**: Always returns data, even if all scraping fails

---

## 📁 Project Structure

```
scraping/
├── prisma/
│   ├── schema.prisma              # Database schema (all models)
│   └── migrations/                # Prisma migration history
│       ├── 20251121084629_init/
│       ├── 20251121150027_add_dev_category/
│       └── 20251122071637_bigint_counts_fix/
│
├── src/
│   ├── connectors/                # Store-specific scrapers
│   │   ├── baseConnector.ts       # Base class with dummy fallback
│   │   └── googlePlayConnector.ts # Google Play scraper (real + HTML + dummy)
│   │
│   ├── services/                  # Business logic
│   │   └── scraperService.ts      # Main scraping orchestration
│   │
│   ├── scripts/                   # Executable scripts
│   │   └── runScraper.ts          # Main entry point (npm run scrape)
│   │
│   ├── types/                     # TypeScript type definitions
│   │   ├── global.d.ts           # Global AppInfo type
│   │   ├── appInfo.ts            # AppInfo, ReviewInfo, RankingInfo
│   │   └── google-play-scraper.d.ts # Module declaration
│   │
│   ├── utils/                     # Utilities
│   │   ├── logger.ts             # Logging helpers
│   │   └── prisma.ts             # Prisma client singleton
│   │
│   └── test.ts                    # Simple test script
│
├── frontend/                      # Frontend scaffolding (Next.js)
│   ├── src/
│   │   ├── components/reviews/   # Review & Ratings UI components
│   │   └── hooks/                # React hooks
│   └── CURSOR_PROMPT.md          # Cursor AI prompts
│
├── package.json                   # Dependencies & scripts
├── tsconfig.json                  # TypeScript configuration
├── PROCESS_LOG.md                 # Detailed session history
└── PROJECT_DOCUMENTATION.md       # This file
```

---

## 🚀 Development Journey

### Session 1: Initial Backend Base Setup
**Date**: Project Start

**What We Built:**
- TypeScript ESM backend structure
- Folder organization (connectors, services, scripts, types, utils)
- Dummy `BaseConnector` and `GooglePlayConnector`
- `ScraperService` and `runScraper` runner
- `tsconfig.json` with ESM support
- `package.json` with ESM + ts-node

**Key Files Created:**
- `src/connectors/baseConnector.ts`
- `src/connectors/googlePlayConnector.ts`
- `src/services/scraperService.ts`
- `src/scripts/runScraper.ts`
- `tsconfig.json`

---

### Session 2: Fixing TypeScript Import Issues
**Issue**: `.ts` extension imports not allowed

**Solution:**
- Added `allowImportingTsExtensions: true` to `tsconfig.json`
- Added `noEmit: true` (required when using `allowImportingTsExtensions`)

**Result**: All relative imports now work with `.ts` extensions

---

### Session 3: Upgrading to Real Google Play Scraping
**What We Built:**
- Real `google-play-scraper` API integration
- Retry logic (2 retries, 500ms delay)
- User-Agent rotation (3 different UAs)
- HTML backup scraper (axios + cheerio)
- Dummy fallback (never breaks)

**Key Features:**
- 3-tier fallback system
- Resilient to API failures
- Always returns data

---

### Session 4: Prisma + Rich App Storage
**What We Built:**
- Expanded Prisma schema with 50+ fields
- `App` model: Identity, developer, category, ratings, installs, pricing, version, policy
- `AppDailyStat` model: Daily snapshots for history
- `RawScrapeEvent` model: JSON payload archiving
- `ScrapeMode` enum: REAL_API, HTML_BACKUP, DUMMY_FALLBACK

**Data Collected:**
- App metadata (title, description, screenshots, etc.)
- Developer info (name, email, website, address)
- Ratings (score, total ratings/reviews, histogram)
- Installs (ranges, min/max)
- Pricing (price, currency, IAP, free/paid)
- Version tracking
- Policy info (privacy policy, ads, content rating)

---

### Session 5: Developer/Category Models + Prisma-Style Service
**What We Built:**
- `Developer` model: Normalized developer entities
- `Category` model: Store-specific categories with slugs
- Prisma-style `ScraperService` object (not class)
- `getOrCreateDeveloper()` method
- `getOrCreateCategory()` method
- `scrapeAndSaveApp()` method
- `scrapeTopApps()` method

**Benefits:**
- Normalized data (no duplicate developers/categories)
- Clean Prisma patterns
- Easy to extend for new stores

---

### Session 6: BigInt Fix for Large Counts
**Problem**: PostgreSQL INT4 can't hold numbers > 2.147B (Google Play has 5B+ installs)

**Solution:**
- Changed `ratings`, `reviews`, `minInstalls`, `maxInstalls` to `BigInt?`
- Added `toBigIntOrNull()` helper function
- Updated all mappings to use BigInt

**Result**: Database now handles massive numbers (10B+ installs)

---

### Session 7: Star Breakdown Columns
**What We Built:**
- Added `star1Count` through `star5Count` columns (BigInt)
- Added `parseStars()` helper to extract from histogram JSON
- Stores both JSON (flexibility) and columns (analytics)

**Benefits:**
- Easy analytics queries ("% 5-star apps by category")
- Review bombing detection
- Fast aggregations

---

### Session 8: Reviews & Rankings Implementation
**What We Built:**
- `Review` model: Individual reviews with text, rating, date, helpful count, developer reply
- `AppRanking` model: Chart positions (TOP_FREE, TOP_PAID, TOP_GROSSING)
- `ChartType` enum
- `GooglePlayConnector.fetchReviews()` method
- `GooglePlayConnector.getAppRanking()` method
- Review deduplication logic
- Ranking storage per scrape

**Data Collected:**
- Up to 100 reviews per app
- Chart positions for multiple chart types
- Historical ranking tracking

---

### Session 9: Frontend Scaffolding
**What We Built:**
- Complete React/Next.js component scaffolding
- `ReviewsRatingsTab` main component
- Chart components (Star breakdown, Rating trend, Review volume)
- Insight components (Keywords, Complaints/Praises, Feature requests, Trust alerts)
- `useAppReviewsAnalytics` hook with mock data fallback
- Cursor AI prompts for future development

**Status**: Ready to integrate into Next.js project

---

## ✅ Current State

### What's Working

✅ **Backend Scraping Pipeline**
- Google Play scraper with 3-tier fallback
- Retry logic + User-Agent rotation
- Resilient to failures

✅ **Database Schema**
- 6 models: App, AppDailyStat, Review, AppRanking, Developer, Category
- Rich field coverage (50+ fields per app)
- BigInt for large numbers
- Star breakdown columns
- Historical tracking (daily stats)

✅ **Data Collection**
- App metadata (full)
- Ratings & reviews (aggregate + individual)
- Rankings (chart positions)
- Developer & category normalization
- Raw event archiving

✅ **Frontend Scaffolding**
- Complete React components
- Charts ready (recharts)
- Mock data for development
- TypeScript types

### What's Missing

⚠️ **Backend API**
- REST API endpoints not yet built
- Need Express/Fastify server
- Need `/api/v1/apps/:store/:appId/reviews-analytics` endpoint

⚠️ **AI Processing**
- Sentiment analysis (Phase 3)
- Topic clustering
- Keyword extraction
- Feature request detection

⚠️ **Additional Stores**
- Apple App Store connector
- Samsung/Huawei connectors

⚠️ **Frontend Integration**
- Next.js project setup
- API integration
- Full UI implementation

---

## 📝 Commands Reference

### Setup Commands

```bash
# Install dependencies
npm install

# Setup environment
# Create .env file with:
# DATABASE_URL="postgresql://user:password@localhost:5432/appcortex"
```

### Database Commands

```bash
# Create new migration
npx prisma migrate dev --name migration_name

# Generate Prisma client (after schema changes)
npx prisma generate

# Open Prisma Studio (database GUI)
npx prisma studio

# Reset database (WARNING: deletes all data)
npx prisma migrate reset
```

### Development Commands

```bash
# Run scraper
npm run scrape

# Run test script
npm test

# Type check
npx tsc --noEmit
```

### Migration History

1. `npx prisma migrate dev --name enrich_app_fields` (Session 4)
2. `npx prisma migrate dev --name add_dev_category` (Session 5)
3. `npx prisma migrate dev --name bigint_counts_fix` (Session 6)
4. `npx prisma migrate dev --name add_star_breakdown` (Session 7)
5. `npx prisma migrate dev --name add_reviews_rankings` (Session 8)

---

## 🔧 Tools & Dependencies

### Production Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `@prisma/client` | ^6.19.0 | Prisma ORM client |
| `axios` | ^1.13.2 | HTTP requests (HTML fallback) |
| `cheerio` | ^1.1.2 | HTML parsing (fallback scraper) |
| `dotenv` | ^16.6.1 | Environment variables |
| `google-play-scraper` | ^10.1.2 | Google Play Store API |

### Development Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `prisma` | ^6.19.0 | Prisma CLI (migrations, studio) |
| `ts-node` | ^10.9.2 | TypeScript execution |
| `typescript` | ^5.9.3 | TypeScript compiler |

### Frontend Dependencies (Scaffolding)

| Package | Purpose |
|---------|---------|
| `next` | React framework |
| `react` | UI library |
| `recharts` | Chart library |
| `axios` | HTTP client |
| `tailwindcss` | CSS framework |
| `shadcn/ui` | UI components |

---

## 🗄 Database Schema

### Models Overview

#### 1. App
**Purpose**: Main app record with all metadata

**Key Fields:**
- Identity: `appId`, `title`, `summary`, `description`, `url`, `icon`, `screenshots`, `video`
- Developer: `developer`, `developerId`, `developerEmail`, `developerWebsite`, `developerAddress`, `developerRefId`
- Category: `genre`, `genreId`, `tags`, `categoryRefId`
- Ratings: `score`, `ratings` (BigInt), `reviews` (BigInt), `histogram` (JSON), `star1Count`-`star5Count` (BigInt)
- Installs: `installs`, `minInstalls` (BigInt), `maxInstalls` (BigInt)
- Pricing: `free`, `price`, `currency`, `offersIAP`, `IAPRange`
- Version: `version`, `realVersion`, `updated`, `released`, `size`, `androidVersion`
- Policy: `privacyPolicy`, `adSupported`, `containsAds`, `contentRating`

**Relations:**
- `developerRef` → Developer
- `categoryRef` → Category
- `dailyStats[]` → AppDailyStat
- `reviews[]` → Review
- `rankings[]` → AppRanking
- `scrapeEvents[]` → RawScrapeEvent

#### 2. AppDailyStat
**Purpose**: Daily snapshots for historical tracking

**Key Fields:**
- `date`, `score`, `ratings` (BigInt), `reviews` (BigInt)
- `installs`, `minInstalls` (BigInt), `maxInstalls` (BigInt)
- `histogram` (JSON), `star1Count`-`star5Count` (BigInt)
- `rank`, `country`

**Indexes:** `date`, `country`

#### 3. Review
**Purpose**: Individual user reviews

**Key Fields:**
- `reviewId`, `rating` (1-5), `reviewText`, `reviewDate`
- `reviewerName`, `helpfulCount` (BigInt), `appVersion`
- `developerReply`, `developerReplyDate`
- `country`

**Indexes:** `appIdRef`, `reviewDate`, `rating`, `country`

#### 4. AppRanking
**Purpose**: Chart position tracking

**Key Fields:**
- `chartType` (enum: TOP_FREE, TOP_PAID, TOP_GROSSING, etc.)
- `position`, `category`, `country`, `date`

**Unique Constraint:** `(appIdRef, chartType, category, country, date)`

**Indexes:** `appIdRef`, `date`, `chartType`, `country`, `category`

#### 5. Developer
**Purpose**: Normalized developer entities

**Key Fields:**
- `name` (unique)

**Relations:** `apps[]` → App

#### 6. Category
**Purpose**: Store-specific categories

**Key Fields:**
- `store` (enum), `name`, `slug`

**Unique Constraint:** `(store, slug)`

**Relations:** `apps[]` → App

#### 7. RawScrapeEvent
**Purpose**: Audit trail with full JSON payloads

**Key Fields:**
- `store`, `mode` (enum: REAL_API, HTML_BACKUP, DUMMY_FALLBACK)
- `appId`, `country`, `payload` (JSON), `scrapedAt`

**Indexes:** `scrapedAt`, `store`, `mode`

### Enums

- **Store**: GOOGLE_PLAY, APPLE_APP_STORE, SAMSUNG_GALAXY_STORE, HUAWEI_APP_GALLERY, OTHER
- **ScrapeMode**: REAL_API, HTML_BACKUP, DUMMY_FALLBACK
- **ChartType**: TOP_FREE, TOP_PAID, TOP_GROSSING, TRENDING, NEW_APPS, CATEGORY_TOP_FREE, etc.

---

## 🌐 API Endpoints (Planned)

### Current Status: Not Yet Implemented

### Planned Endpoints

```
GET  /api/v1/apps/:store/:appId
     → App details

GET  /api/v1/apps/:store/:appId/reviews-analytics
     → Reviews & ratings analytics (for frontend)

GET  /api/v1/apps/:store/:appId/reviews
     → Paginated reviews list

GET  /api/v1/apps/:store/:appId/rankings
     → Historical rankings

GET  /api/v1/charts/:chartType/:country
     → Top apps by chart type

GET  /api/v1/developers/:developerId
     → Developer portfolio

GET  /api/v1/categories/:store/:category
     → Apps in category
```

---

## 🎯 Next Steps

### Immediate (Week 1-2)

1. **Build REST API**
   - Express/Fastify server setup
   - Implement `/api/v1/apps/:store/:appId/reviews-analytics`
   - Add other core endpoints

2. **Frontend Integration**
   - Set up Next.js project
   - Integrate `ReviewsRatingsTab` components
   - Connect to API

3. **Testing**
   - Test scraper with real data
   - Verify database storage
   - Test API endpoints

### Short-term (Month 1)

4. **Apple App Store Connector**
   - Create `appleAppStoreConnector.ts`
   - Normalize data to same `App` model
   - Add to `ScraperService`

5. **Enhanced Rankings**
   - Category-specific rankings
   - Regional rankings
   - Ranking velocity calculations

6. **Review Analysis**
   - Basic keyword extraction
   - Sentiment scoring (simple)
   - Topic clustering (basic)

### Medium-term (Month 2-3)

7. **AI Processing Pipeline**
   - OpenAI/Claude integration
   - Sentiment analysis
   - Feature request detection
   - Pain point identification

8. **Frontend Features**
   - App search
   - Category browser
   - Developer portfolios
   - Ranking trends visualization

9. **Scheduling**
   - Cron jobs for automatic scraping
   - Queue system (BullMQ + Redis)
   - Job monitoring

### Long-term (Month 4+)

10. **Additional Stores**
    - Samsung Galaxy Store
    - Huawei App Gallery
    - Regional stores

11. **Advanced Analytics**
    - Revenue estimation models
    - Download forecasting
    - Market opportunity scoring

12. **User Features**
    - User accounts
    - Watchlists
    - Alerts
    - Exports

---

## 📊 Data Collection Status

### Currently Collecting ✅

- App metadata (50+ fields)
- Ratings aggregate (score, totals, histogram, star breakdown)
- Individual reviews (up to 100 per app)
- Chart rankings (TOP_FREE, TOP_PAID, TOP_GROSSING)
- Daily snapshots (historical tracking)
- Developer & category normalization
- Raw event archiving

### Storage Estimates

```
10,000 apps:
- App rows: ~20 MB
- AppDailyStat: ~7.3 GB (730 days)
- RawScrapeEvent: ~36.5 GB
- Reviews: ~20 GB (1,000 reviews/app)
- Rankings: ~3.65 GB
Total: ~68 GB

Cost: ~$20-30/month (PostgreSQL cloud)
```

---

## 🐛 Known Issues & Solutions

### Issue 1: TypeScript `.ts` Extension Imports
**Status**: ✅ Fixed (Session 2)
**Solution**: Added `allowImportingTsExtensions: true` and `noEmit: true` to `tsconfig.json`

### Issue 2: PostgreSQL INT4 Overflow
**Status**: ✅ Fixed (Session 6)
**Solution**: Changed large count fields to `BigInt`

### Issue 3: Missing Review Deduplication
**Status**: ✅ Fixed (Session 8)
**Solution**: Check by `reviewId` first, then by content+date+rating

---

## 📚 Additional Resources

- **Process Log**: See `PROCESS_LOG.md` for detailed session history
- **Frontend Prompts**: See `frontend/CURSOR_PROMPT.md` for Cursor AI prompts
- **Prisma Docs**: https://www.prisma.io/docs
- **Google Play Scraper**: https://github.com/facundoolano/google-play-scraper

---

## 🎉 Achievements

✅ **Production-ready scraping pipeline** with 3-tier fallback  
✅ **Rich database schema** with 50+ fields per app  
✅ **Historical tracking** via daily snapshots  
✅ **Review storage** for AI analysis  
✅ **Ranking tracking** for trend analysis  
✅ **Frontend scaffolding** ready for integration  
✅ **BigInt support** for massive numbers (10B+ installs)  
✅ **Normalized data** (developers, categories)  
✅ **Audit trail** via raw event storage  

---

**Project Status**: 🟢 Backend MVP Complete | Frontend Scaffolding Ready | API Endpoints Pending

**Last Updated**: 2024-11-22

