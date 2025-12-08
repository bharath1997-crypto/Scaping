# 🚀 AppCortex - Multi-Store App Analytics Platform

**AppCortex** is a comprehensive, cloud-based intelligence platform for tracking and analyzing mobile app performance across multiple app stores. Think Bloomberg Terminal, but for the global app economy.

[![Status](https://img.shields.io/badge/status-production-green)]()
[![License](https://img.shields.io/badge/license-MIT-blue)]()

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Installation](#installation)
- [Development](#development)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Production Deployment](#production-deployment)
- [Contributing](#contributing)

---

## 🎯 Overview

AppCortex provides real-time analytics, insights, and intelligence for mobile applications across **5 major app stores**:

- ✅ **Google Play Store** (Active)
- ✅ **Apple App Store** (Active)
- ⚠️ **Samsung Galaxy Store** (Ready)
- ⚠️ **Huawei App Gallery** (Ready)
- ⚠️ **Xiaomi Mi Store** (Ready)

### What AppCortex Does

- **Multi-Store Tracking**: Monitor apps across Google Play, Apple App Store, Samsung, Huawei, and Xiaomi stores
- **Real-Time Analytics**: Track downloads, ratings, reviews, rankings, and revenue metrics
- **AI-Powered Insights**: Get intelligent analysis and predictions about app performance
- **Custom Alerts**: Set up alerts for downloads, ratings, reviews, sentiment, rankings, and revenue changes
- **Comprehensive Reports**: Generate PDF, Excel, PowerPoint, or CSV reports with customizable modules
- **Market Intelligence**: Discover trending apps, categories, and developers
- **App Idea Analyzer**: Check if your app idea exists and get originality scoring (World First!)

---

## ✨ Features

### Core Features

- 🔍 **App Explorer**: Browse and search through thousands of apps with advanced filters
- 📊 **Dashboard**: Real-time market overview with key metrics and insights
- 📈 **Analytics**: Deep-dive analytics for downloads, ratings, reviews, rankings, and revenue
- 🔔 **Alerts System**: Custom alerts for metric changes (downloads, ratings, reviews, sentiment, rankings, revenue)
- 📄 **Reports**: Generate comprehensive reports in multiple formats (PDF, Excel, PPTX, CSV)
- 👤 **User Accounts**: Email/password, Google OAuth, and phone number authentication
- 🔐 **API Access**: RESTful API with API key management
- 📱 **Watchlist**: Save and track your favorite apps
- 🌍 **Multi-Country**: Track apps across different countries and regions
- 📂 **Categories**: Browse apps by category across all stores

### Advanced Features

- 🤖 **AI-Powered Insights**: Sentiment analysis, trend predictions, and competitive intelligence
- 📊 **Ranking History**: Track app rankings over time across different charts
- 💬 **Review Analytics**: Analyze review sentiment, trends, and patterns
- 🔄 **Daily Stats**: Historical tracking of app metrics
- 👥 **Developer Profiles**: Track all apps by a developer
- 🔍 **App Screener**: Advanced filtering and screening tools
- 📈 **Trending Analysis**: Identify trending apps and categories

---

## 🏗️ Architecture

AppCortex follows a **3-layer data architecture**:

### Layer 1: Raw Ingestion (Unified)
```
RawAppSnapshot
├── Store-specific payload (JSON)
├── Common extracted fields
├── Payload hash (deduplication)
└── Discovery metadata
```
- Single source of truth for all raw scraped data
- Store-specific data preserved in JSON payload
- Common fields extracted for fast queries

### Layer 2: Normalized Core
```
App → Unified representation
Developer → Developer info
Category → Category info
```
- Normalized app data across all stores
- Developer and category relationships

### Layer 3: Analytics/Time-Series
```
AppDailyStat → Daily metrics
AppRanking → Chart positions
Review → Individual reviews
```
- Time-series data for analytics
- Historical tracking and trends

---

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: Passport.js (Google OAuth, JWT)
- **Job Queue**: BullMQ (Redis)
- **Scraping**: 
  - `google-play-scraper`
  - `app-store-scraper`
  - Custom scrapers for Samsung, Huawei, Xiaomi
- **Scheduling**: node-cron

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **State Management**: React Hooks

### Infrastructure
- **Database**: PostgreSQL
- **Cache/Queue**: Redis
- **Deployment**: Production-ready with environment switching

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Redis (for job queues)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Scraping
   ```

2. **Install dependencies**
   ```bash
   # Backend dependencies
   npm install
   
   # Frontend dependencies
   cd frontend
   npm install
   cd ..
   ```

3. **Set up environment variables**
   ```bash
   # Backend
   cp .env.example .env
   # Edit .env with your DATABASE_URL, REDIS_URL, etc.
   
   # Frontend
   cd frontend
   cp .env.local.example .env.local
   # Edit .env.local with your API URL
   ```

4. **Set up database**
   ```bash
   # Run migrations
   npm run migrate
   
   # Generate Prisma client
   npm run generate
   ```

5. **Start development servers**
   ```bash
   # Terminal 1: Backend API
   npm run dev
   
   # Terminal 2: Frontend
   cd frontend
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:4000
   - API Health: http://localhost:4000/health

---

## 💻 Development

### Backend Commands

```bash
# Development server
npm run dev

# Production server
npm start

# Run scrapers
npm run scrape:google      # Google Play
npm run scrape:apple       # Apple App Store
npm run scrape:samsung     # Samsung Galaxy Store
npm run scrape:huawei      # Huawei App Gallery
npm run scrape:mi          # Xiaomi Mi Store
npm run scrape:all         # All stores

# Continuous scraping
npm run scrape:continuous

# Database
npm run migrate            # Run migrations
npm run generate          # Generate Prisma client
npm run studio            # Open Prisma Studio

# Workers
npm run workers           # Start job queue workers
```

### Frontend Commands

```bash
cd frontend

# Development server
npm run dev

# Production build
npm run build
npm start

# Linting
npm run lint
```

### Environment Switching

The project supports environment switching for local and production:

```bash
# Switch to local environment
npm run env:local

# Switch to production environment
npm run env:production
```

---

## 📡 API Documentation

### Base URL
- **Local**: `http://localhost:4000/api/v1`
- **Production**: `https://appcortex.pro/api/v1`

### Authentication

Most endpoints require authentication via JWT token:

```bash
# Login
POST /api/v1/auth/login
Body: { "email": "user@example.com", "password": "password" }

# Register
POST /api/v1/auth/register
Body: { "email": "user@example.com", "password": "password", "name": "User Name" }

# Google OAuth
GET /api/v1/auth/google

# Get current user
GET /api/v1/auth/me
Headers: { "Authorization": "Bearer <token>" }
```

### App Endpoints

```bash
# List apps
GET /api/v1/apps?store=GOOGLE_PLAY&category=GAME&page=1&limit=20

# Get app details
GET /api/v1/apps/:store/:appId

# Get reviews analytics
GET /api/v1/apps/:store/:appId/reviews-analytics
```

### Dashboard Endpoints

```bash
# Get dashboard data
GET /api/v1/dashboard?timeRange=7d
```

### Search Endpoints

```bash
# Search apps
GET /api/v1/search?q=keyword&store=GOOGLE_PLAY
```

### Alerts Endpoints

```bash
# List alerts
GET /api/v1/alerts

# Create alert
POST /api/v1/alerts
Body: {
  "name": "Alert Name",
  "appId": "app-id",
  "metric": "DOWNLOADS",
  "condition": "ABOVE",
  "threshold": "1000000",
  "frequency": "DAILY"
}

# Update alert
PUT /api/v1/alerts/:id

# Delete alert
DELETE /api/v1/alerts/:id

# Toggle alert status
PATCH /api/v1/alerts/:id/status

# Get alert history
GET /api/v1/alerts/history
```

### Reports Endpoints

```bash
# List reports
GET /api/v1/reports

# Create report
POST /api/v1/reports
Body: {
  "name": "Report Name",
  "format": "PDF",
  "modules": ["Overview", "Downloads"],
  "appIds": ["app-id-1", "app-id-2"]
}

# Get report
GET /api/v1/reports/:id

# Download report
GET /api/v1/reports/:id/download

# Delete report
DELETE /api/v1/reports/:id
```

### User Endpoints

```bash
# Get profile
GET /api/v1/user/profile

# Update profile
PUT /api/v1/user/profile

# Change password
POST /api/v1/user/change-password

# API Keys
GET /api/v1/user/api-keys
POST /api/v1/user/api-keys
DELETE /api/v1/user/api-keys/:id

# Notification preferences
GET /api/v1/user/notifications
PUT /api/v1/user/notifications

# Tracked apps
GET /api/v1/user/tracked-apps
```

### Contact Endpoints

```bash
# Submit contact form
POST /api/v1/contact
Body: {
  "name": "Name",
  "email": "email@example.com",
  "subject": "general",
  "message": "Message"
}
```

---

## 📁 Project Structure

```
Scraping/
├── src/
│   ├── api/                    # REST API (Express.js)
│   │   ├── controllers/        # Request handlers
│   │   ├── routes/             # API routes
│   │   ├── middleware/         # Auth, validation, etc.
│   │   ├── services/           # Business logic
│   │   └── server.ts           # Express app setup
│   ├── connectors/             # Store-specific scrapers
│   │   ├── googlePlay/
│   │   ├── appleAppStore/
│   │   ├── samsungGalaxyStore/
│   │   ├── huaweiAppGallery/
│   │   └── xiaomiMiStore/
│   ├── services/               # Core business logic
│   │   ├── normalizationService.ts
│   │   ├── scraperService.ts
│   │   ├── ranking.service.ts
│   │   └── discovery/          # Discovery services
│   ├── queues/                 # BullMQ job queues
│   ├── schedulers/             # Cron schedulers
│   ├── workers/                # Queue workers
│   └── scripts/                # Utility scripts
├── frontend/
│   ├── src/
│   │   ├── app/                # Next.js App Router pages
│   │   │   ├── page.tsx        # Homepage
│   │   │   ├── apps/           # App pages
│   │   │   ├── dashboard/      # Dashboard
│   │   │   ├── alerts/         # Alerts management
│   │   │   ├── reports/        # Reports
│   │   │   ├── search/         # Search
│   │   │   ├── auth/           # Authentication
│   │   │   └── ...
│   │   ├── components/         # React components
│   │   └── lib/                # Utilities and API client
│   └── public/                 # Static assets
├── prisma/
│   ├── schema.prisma           # Database schema
│   └── migrations/             # Database migrations
└── scripts/                    # Utility scripts
```

---

## 🚢 Production Deployment

### Domain Setup

AppCortex is configured for production deployment at **appcortex.pro**.

See detailed guides:
- [`DOMAIN_SETUP.md`](./DOMAIN_SETUP.md) - Domain configuration
- [`PRODUCTION_SETUP.md`](./PRODUCTION_SETUP.md) - Production deployment guide

### Environment Variables

#### Backend `.env`
```env
# Database
DATABASE_URL=postgresql://user:password@host:5432/appcortex

# Server
NODE_ENV=production
PORT=4000
FRONTEND_URL=https://appcortex.pro
CORS_ORIGIN=https://appcortex.pro,https://www.appcortex.pro

# Redis
REDIS_URL=redis://localhost:6379

# Google OAuth
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_CALLBACK_URL=https://appcortex.pro/api/v1/auth/google/callback

# JWT
JWT_SECRET=your-jwt-secret
JWT_REFRESH_SECRET=your-refresh-secret
```

#### Frontend `.env.local`
```env
NEXT_PUBLIC_API_URL=https://appcortex.pro/api/v1
NEXT_PUBLIC_DOMAIN=appcortex.pro
NEXT_PUBLIC_SITE_URL=https://appcortex.pro
```

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create OAuth 2.0 credentials
3. Add authorized redirect URIs:
   - `https://appcortex.pro/api/v1/auth/google/callback`
   - `http://localhost:4000/api/v1/auth/google/callback` (for local dev)
4. Add authorized JavaScript origins:
   - `https://appcortex.pro`
   - `http://localhost:4000` (for local dev)

### Database Migration

```bash
# Run migrations in production
npm run migrate

# Generate Prisma client
npm run generate
```

### Build and Deploy

```bash
# Build frontend
cd frontend
npm run build

# Start production servers
# Backend
npm start

# Frontend
npm start
```

---

## 📊 Current Status

### Database Statistics

- **Total Apps**: 19,288+
  - Google Play: 14,150+ apps
  - Apple App Store: 5,138+ apps
- **Raw Snapshots**: 44,494+
- **Reviews**: 465,607+
- **Rankings**: 32,550+
- **Daily Stats**: 31,478+

### Store Implementation Status

| Store | Status | Notes |
|-------|--------|-------|
| Google Play | ✅ Active | Fully functional, actively scraping |
| Apple App Store | ✅ Active | Fully functional, actively scraping |
| Samsung Galaxy Store | ⚠️ Ready | Implemented, needs testing |
| Huawei App Gallery | ⚠️ Ready | Implemented, needs testing |
| Xiaomi Mi Store | ⚠️ Ready | Implemented, needs testing |

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write tests for new features
- Update documentation as needed
- Follow the existing code style
- Ensure all migrations are reversible

---

## 📚 Documentation

- [`DOMAIN_SETUP.md`](./DOMAIN_SETUP.md) - Domain configuration guide
- [`PRODUCTION_SETUP.md`](./PRODUCTION_SETUP.md) - Production deployment guide
- [`FINAL_PROJECT_SUMMARY.md`](./FINAL_PROJECT_SUMMARY.md) - Project summary
- [`API_IMPLEMENTATION_SUMMARY.md`](./API_IMPLEMENTATION_SUMMARY.md) - API details
- [`AUTH_SYSTEM.md`](./AUTH_SYSTEM.md) - Authentication system documentation

---

## 📝 License

[TO BE ADDED]

---

## 🆘 Support

- **Website**: https://appcortex.pro
- **Contact**: Use the contact form at `/contact`
- **Documentation**: See the `/docs` directory

---

## 🎯 Roadmap

### Short Term
- [ ] Complete Samsung, Huawei, and Xiaomi store implementations
- [ ] Enhanced AI insights and predictions
- [ ] Mobile app (iOS/Android)
- [ ] Advanced analytics dashboards

### Long Term
- [ ] Real-time data streaming
- [ ] Advanced competitor analysis
- [ ] Market trend predictions
- [ ] API marketplace
- [ ] White-label solutions

---

**Built with ❤️ by the AppCortex Team**

*Last Updated: December 2025*
