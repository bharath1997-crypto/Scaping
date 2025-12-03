# 🎨 FRONTEND DESIGN - AppCortex Platform

**Based on:** `PROJECT_STATUS.md`  
**Design Style:** AppBrain-style (data-rich, analytics-focused)  
**Framework:** Next.js 14 (App Router)  
**Status:** Design Phase

---

## 🎯 DESIGN PRINCIPLES

### **AppBrain-Style Characteristics**
- **Data-Dense:** Show maximum information without clutter
- **Analytics-First:** Charts, trends, and metrics prominently displayed
- **Professional:** Clean, modern, business-focused design
- **Fast Navigation:** Quick access to filters, search, and comparisons
- **Visual Hierarchy:** Important metrics stand out (ratings, installs, rankings)

---

## 🗺️ NEXT.JS ROUTE STRUCTURE

### **Route Map**

```
/                           → Homepage (Dashboard/Overview)
/apps                      → App Explorer (List/Browse)
/apps/[store]              → Apps by Store
/apps/[store]/[appId]      → App Detail Page
/categories                 → Category Browser
/categories/[category]     → Apps by Category
/countries                  → Country/Region Browser
/countries/[country]        → Apps by Country
/developers                 → Developer Browser
/developers/[developerId]   → Developer Profile
/charts                     → Chart Rankings
/charts/[chartType]         → Specific Chart (TOP_FREE, etc.)
/search                     → Search Results
/compare                    → App Comparison Tool
/about                      → About Page
```

---

## 📄 PAGE DESIGNS

### **1. Homepage (`/`)**

**Purpose:** Dashboard overview showing key metrics and trends

**Layout:**
```
┌─────────────────────────────────────────────────┐
│  Header (Logo, Nav, Search, Sign In)           │
├─────────────────────────────────────────────────┤
│                                                 │
│  Hero Section                                   │
│  ┌─────────────────────────────────────────┐   │
│  │  "Track App Performance Across Stores"   │   │
│  │  [Search Bar - Large]                    │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│  Key Metrics Cards (4 columns)                  │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐         │
│  │19,288│ │44,494│ │465K  │ │32,550│         │
│  │ Apps │ │Snaps │ │Review│ │Rankng│         │
│  └──────┘ └──────┘ └──────┘ └──────┘         │
│                                                 │
│  Top Charts (3 columns)                         │
│  ┌─────────────┐ ┌─────────────┐ ┌──────────┐ │
│  │ TOP FREE    │ │ TOP PAID    │ │ TOP GROS │ │
│  │ [App Cards] │ │ [App Cards] │ │ [Cards]  │ │
│  └─────────────┘ └─────────────┘ └──────────┘ │
│                                                 │
│  Trending Categories                            │
│  [Category Cards Grid]                          │
│                                                 │
│  Recent Discoveries                             │
│  [App Cards Grid - Latest scraped apps]         │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Components:**
- `HeroSection` - Main CTA and search
- `MetricsCards` - Key statistics
- `TopCharts` - Top apps by chart type
- `TrendingCategories` - Popular categories
- `RecentDiscoveries` - Latest apps added

**API Calls:**
- `GET /api/v1/apps?page=1&pageSize=10&sort=rank` (Top Free)
- `GET /api/v1/apps?page=1&pageSize=10&sort=rank&chartType=TOP_PAID` (Top Paid)
- `GET /api/v1/apps?page=1&pageSize=10&sort=rank&chartType=TOP_GROSSING` (Top Grossing)

---

### **2. App Explorer (`/apps`)**

**Purpose:** Browse and filter all apps

**Layout:**
```
┌─────────────────────────────────────────────────┐
│  Header                                         │
├─────────────────────────────────────────────────┤
│                                                 │
│  Filters Sidebar (Left)    │  App List (Right) │
│  ┌─────────────────────┐  │  ┌──────────────┐ │
│  │ Store Filter         │  │  │ Search Bar   │ │
│  │ ☑ Google Play        │  │  └──────────────┘ │
│  │ ☑ Apple App Store    │  │                   │
│  │ ☐ Samsung            │  │  Sort: [Rank ▼]  │
│  │                      │  │                   │
│  │ Country Filter       │  │  ┌──────────────┐ │
│  │ [Dropdown: US ▼]     │  │  │ App Card 1   │ │
│  │                      │  │  │ [Icon] Title │ │
│  │ Category Filter      │  │  │ Developer    │ │
│  │ [Dropdown: All ▼]    │  │  │ ⭐ 4.5 (12M) │ │
│  │                      │  │  │ Rank: #1     │ │
│  │ Price Filter         │  │  └──────────────┘ │
│  │ ○ All                │  │  ┌──────────────┐ │
│  │ ○ Free               │  │  │ App Card 2   │ │
│  │ ○ Paid               │  │  │ ...          │ │
│  │                      │  │  └──────────────┘ │
│  │ Rating Filter        │  │  ... (25 per page)│
│  │ [Slider: 0-5]        │  │                   │
│  │                      │  │  [Pagination]     │
│  └─────────────────────┘  │  └──────────────┘ │
│                            │                   │
└─────────────────────────────────────────────────┘
```

**Components:**
- `AppFilters` - Sidebar with all filters
- `AppList` - Grid/list of app cards
- `AppCard` - Individual app card component
- `Pagination` - Page navigation
- `SortControls` - Sort dropdown

**API Calls:**
- `GET /api/v1/apps?store={store}&country={country}&category={category}&page={page}&pageSize={pageSize}&sort={sort}`

**Features:**
- Real-time filtering (debounced)
- URL state management (filters in query params)
- Infinite scroll option
- Grid/List view toggle

---

### **3. App Detail Page (`/apps/[store]/[appId]`)**

**Purpose:** Comprehensive app information and analytics

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
│  │         #1 in Games                      │   │
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
│  └─────────────────────────────────────────┘   │
│                                                 │
│  Analytics Tab                                  │
│  ┌─────────────────────────────────────────┐   │
│  │ Rating Trend Chart                       │   │
│  │ [Line Chart: Rating over time]           │   │
│  │                                          │   │
│  │ Reviews Trend                            │   │
│  │ [Bar Chart: Reviews per day]             │   │
│  │                                          │   │
│  │ Ranking History                          │   │
│  │ [Line Chart: Rank position over time]    │   │
│  │                                          │   │
│  │ Rating Distribution                      │   │
│  │ [Bar Chart: 1★ 2★ 3★ 4★ 5★]            │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│  Reviews Tab                                    │
│  ┌─────────────────────────────────────────┐   │
│  │ Filter: [All Ratings ▼] [Sort: Recent ▼]│   │
│  │                                          │   │
│  │ Review Card 1                            │   │
│  │ ⭐⭐⭐⭐⭐ John D. - 2 days ago          │   │
│  │ "Great app! Very useful..."              │   │
│  │                                          │   │
│  │ Review Card 2                            │   │
│  │ ...                                      │   │
│  │                                          │   │
│  │ [Load More Reviews]                      │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│  Rankings Tab                                   │
│  ┌─────────────────────────────────────────┐   │
│  │ Chart Position History                   │   │
│  │ [Table: Date | Chart | Position | Country]│ │
│  │                                          │   │
│  │ Ranking Trend Chart                      │   │
│  │ [Line Chart: Position over time]          │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Components:**
- `AppHeader` - Icon, title, developer, key metrics
- `AppTabs` - Tab navigation (Overview, Analytics, Reviews, Rankings)
- `ScreenshotsCarousel` - Image carousel
- `RatingTrendChart` - Line chart component
- `ReviewsList` - Paginated reviews
- `RankingHistory` - Table and chart

**API Calls:**
- `GET /api/v1/apps/:store/:appId` - App details
- `GET /api/v1/apps/:store/:appId/reviews-analytics` - Analytics
- `GET /api/v1/apps/:store/:appId/reviews` - Reviews list (future)

**Features:**
- Share button (copy link)
- Compare button (add to comparison)
- Bookmark/Favorite (future)
- Export data (future)

---

### **4. Category Browser (`/categories`)**

**Purpose:** Browse apps by category

**Layout:**
```
┌─────────────────────────────────────────────────┐
│  Header                                         │
├─────────────────────────────────────────────────┤
│                                                 │
│  Category Grid                                  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│  │ Games    │ │ Business │ │ Education│        │
│  │ 2,450    │ │ 1,230    │ │ 890      │        │
│  │ apps     │ │ apps     │ │ apps     │        │
│  └──────────┘ └──────────┘ └──────────┘        │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│  │ Shopping │ │ Social   │ │ ...      │        │
│  │ ...      │ │ ...      │ │ ...      │        │
│  └──────────┘ └──────────┘ └──────────┘        │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Components:**
- `CategoryGrid` - Grid of category cards
- `CategoryCard` - Individual category card

**API Calls:**
- `GET /api/v1/apps?category={category}` (for category detail page)

---

### **5. Category Detail (`/categories/[category]`)**

**Purpose:** Show all apps in a specific category

**Layout:** Similar to `/apps` but pre-filtered by category

**Components:** Same as App Explorer, but with category filter pre-applied

---

### **6. Country Browser (`/countries`)**

**Purpose:** Browse apps by country/region

**Layout:** Similar to Category Browser, but with country flags and names

**Components:**
- `CountryGrid` - Grid of country cards
- `CountryCard` - Individual country card with flag

---

### **7. Search Results (`/search?q=query`)**

**Purpose:** Search results page

**Layout:** Similar to App Explorer, but with search query highlighted

**Components:**
- `SearchResults` - Filtered app list
- `SearchHighlight` - Highlight search terms in results

---

### **8. Compare Apps (`/compare`)**

**Purpose:** Side-by-side app comparison

**Layout:**
```
┌─────────────────────────────────────────────────┐
│  Compare Apps                                   │
├─────────────────────────────────────────────────┤
│                                                 │
│  [App 1 Select]  vs  [App 2 Select]            │
│                                                 │
│  ┌──────────────┐    ┌──────────────┐         │
│  │ App 1        │    │ App 2        │         │
│  │ [Icon]       │    │ [Icon]       │         │
│  │ Title        │    │ Title        │         │
│  │              │    │              │         │
│  │ Rating: 4.5   │    │ Rating: 4.2  │         │
│  │ Reviews: 12M │    │ Reviews: 8M  │         │
│  │ Installs: 5B │    │ Installs: 3B │         │
│  │ Price: Free  │    │ Price: $4.99 │         │
│  │              │    │              │         │
│  │ [Chart]      │    │ [Chart]      │         │
│  └──────────────┘    └──────────────┘         │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Components:**
- `AppSelector` - Search/select apps to compare
- `ComparisonTable` - Side-by-side comparison
- `ComparisonCharts` - Overlaid charts

---

## 🧩 COMPONENT LIBRARY

### **Core Components**

#### **AppCard**
```typescript
<AppCard
  app={{
    id: string,
    title: string,
    developer: string,
    icon: string,
    score: number,
    ratings: number,
    rank?: number,
    store: string,
    free: boolean,
    price?: number
  }}
  showRank?: boolean
  size?: "small" | "medium" | "large"
/>
```

#### **AppFilters**
```typescript
<AppFilters
  stores: string[]
  countries: string[]
  categories: string[]
  onFilterChange: (filters) => void
/>
```

#### **RatingChart**
```typescript
<RatingChart
  data: { date: string, rating: number }[]
  height?: number
/>
```

#### **RankingChart**
```typescript
<RankingChart
  data: { date: string, position: number }[]
  chartType: string
/>
```

#### **ReviewsList**
```typescript
<ReviewsList
  reviews: Review[]
  pagination: PaginationInfo
  onLoadMore: () => void
/>
```

---

## 🎨 DESIGN SYSTEM

### **Colors**
- **Primary:** Blue (#2563EB) - Links, buttons, highlights
- **Secondary:** Gray (#6B7280) - Text, borders
- **Success:** Green (#10B981) - Positive metrics
- **Warning:** Yellow (#F59E0B) - Warnings
- **Error:** Red (#EF4444) - Errors
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

### **Phase 1: Core Pages** (Week 1-2)
1. Homepage (`/`)
2. App Explorer (`/apps`)
3. App Detail (`/apps/[store]/[appId]`)

### **Phase 2: Navigation** (Week 3)
4. Category Browser (`/categories`)
5. Country Browser (`/countries`)
6. Search Results (`/search`)

### **Phase 3: Advanced Features** (Week 4)
7. Compare Apps (`/compare`)
8. Developer Profiles (`/developers/[id]`)
9. Chart Rankings (`/charts`)

### **Phase 4: Polish** (Week 5)
10. Responsive design
11. Performance optimization
12. Accessibility improvements

---

## 📋 NEXT STEPS

1. ✅ **Design Document Created** - This document
2. ⏳ **Set up Next.js project** - Initialize Next.js 14 with App Router
3. ⏳ **Create component library** - Build reusable components
4. ⏳ **Implement homepage** - Start with dashboard
5. ⏳ **Implement app explorer** - Core browsing experience
6. ⏳ **Implement app detail** - Comprehensive app pages

---

**Document Version:** 1.0  
**Last Updated:** December 3, 2025

