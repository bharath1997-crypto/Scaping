# 🚀 AppCortex - Multi-Store App Analytics Platform

A cloud-based web application platform for tracking and analyzing mobile app performance across multiple app stores.

## 📊 Current Status

- **Total Apps:** 19,288
  - Google Play: 14,150 apps
  - Apple App Store: 5,138 apps
- **Raw Snapshots:** 44,494
- **Reviews:** 465,607
- **Rankings:** 32,550
- **Daily Stats:** 31,478

## 🏗️ Architecture

### **3-Layer Data Model**
1. **Raw Ingestion** - `RawAppSnapshot` (preserves original data)
2. **Normalized Core** - `App`, `Developer`, `Category`
3. **Analytics/Time-Series** - `AppDailyStat`, `AppRanking`, `Review`

### **Supported Stores**
- ✅ Google Play Store (Active)
- ✅ Apple App Store (Active)
- ⚠️ Samsung Galaxy Store (Ready, needs testing)
- ⚠️ Huawei App Gallery (Ready, needs testing)
- ⚠️ Xiaomi Mi Store (Ready, needs testing)

## 🚀 Quick Start

### **Prerequisites**
- Node.js 18+
- PostgreSQL database
- npm or yarn

### **Installation**
```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your DATABASE_URL

# Run database migrations
npm run migrate

# Generate Prisma client
npm run generate
```

### **Development**
```bash
# Start API server
npm run api

# Run scraper
npm run scrape:google    # Google Play
npm run scrape:apple     # Apple App Store

# Check database stats
ts-node src/scripts/checkDatabase.ts
```

## 📁 Project Structure

```
src/
├── api/              # REST API (Express.js)
├── connectors/       # Store-specific scrapers
├── services/         # Core business logic
├── scripts/         # Utility scripts
└── utils/           # Utilities

prisma/
└── schema.prisma    # Database schema
```

## 🔌 API Endpoints

- `GET /api/v1/apps` - List apps with filters
- `GET /api/v1/apps/:store/:appId` - App details
- `GET /api/v1/apps/:store/:appId/reviews-analytics` - Reviews analytics
- `GET /health` - Health check

See `PROJECT_STATUS.md` for complete API documentation.

## 📚 Documentation

- `PROJECT_STATUS.md` - Complete project status and database structure
- `FRONTEND_DESIGN.md` - Frontend design and Next.js route structure
- `API_IMPLEMENTATION_SUMMARY.md` - API endpoint details

## 🛠️ Technology Stack

- **Backend:** Node.js, TypeScript, Express.js
- **Database:** PostgreSQL, Prisma ORM
- **Scraping:** google-play-scraper, app-store-scraper, axios, cheerio

## 📝 License

[TO BE ADDED]

## 🤝 Contributing

[TO BE ADDED]

---

**Status:** Backend Complete | Frontend Ready to Build  
**Last Updated:** December 3, 2025

