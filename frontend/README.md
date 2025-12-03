# AppCortex Frontend

Next.js 14 frontend application for the AppCortex platform.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Backend API running on `http://localhost:3001` (or configure `NEXT_PUBLIC_API_URL`)

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.local.example .env.local

# Edit .env.local if your backend runs on a different port
# NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Development

```bash
# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Homepage (/)
│   │   ├── apps/              # App pages
│   │   │   ├── page.tsx       # App Explorer (/apps)
│   │   │   └── [store]/[appId]/ # App Detail (/apps/[store]/[appId])
│   │   ├── dashboard/         # Dashboard page
│   │   └── search/            # Search page
│   ├── components/            # React components
│   │   ├── apps/              # App-related components
│   │   ├── dashboard/         # Dashboard components
│   │   └── layout/            # Layout components
│   └── lib/                   # Utilities
│       └── api.ts             # API client
```

## 🎨 Pages Implemented

### ✅ P1 Pages (Core - Connected to Backend)

1. **Homepage (`/`)** - Hero, metrics cards, top charts
2. **App Explorer (`/apps`)** - Browse apps with filters and pagination
3. **App Detail (`/apps/[store]/[appId]`)** - Comprehensive app information with tabs
4. **Search (`/search`)** - Search results page
5. **Dashboard (`/dashboard`)** - Market overview dashboard

## 🔌 API Integration

The frontend connects to the backend API at `NEXT_PUBLIC_API_URL`:

- `GET /api/v1/apps` - List apps with filters
- `GET /api/v1/apps/:store/:appId` - Get app details
- `GET /api/v1/apps/:store/:appId/reviews-analytics` - Get reviews analytics

See `src/lib/api.ts` for the API client implementation.

## 🎨 Design System

- **Framework:** Next.js 14 with App Router
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Icons:** SVG (inline)

## 📝 Next Steps

- [ ] Add more P2 pages (Categories, Countries, Developers)
- [ ] Implement ranking history charts (needs backend API)
- [ ] Add daily stats charts (needs backend API)
- [ ] Add user authentication
- [ ] Add app comparison feature
- [ ] Add watchlist functionality

## 🐛 Troubleshooting

### Backend Connection Issues

If you see API errors, make sure:
1. Backend API is running on `http://localhost:3001`
2. `NEXT_PUBLIC_API_URL` in `.env.local` matches your backend URL
3. CORS is configured correctly in the backend

### Image Loading Issues

App icons may fail to load if:
- The image URL is invalid
- CORS is blocking the image request
- The domain is not in `next.config.js` image domains

