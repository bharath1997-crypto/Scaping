# Environment Configuration Guide

## 📋 Current Setup

Your `.env.local` file (in `frontend/` directory) controls where your frontend connects to the backend API.

## 🔍 How to Check Your Current Configuration

### Option 1: View the file directly

Open: `frontend/.env.local`

You should see something like:

**For Development:**
```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
NEXT_PUBLIC_DOMAIN=localhost
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**For Production:**
```env
NEXT_PUBLIC_API_URL=https://appcortex.pro/api/v1
NEXT_PUBLIC_DOMAIN=appcortex.pro
NEXT_PUBLIC_SITE_URL=https://appcortex.pro
```

### Option 2: Check what the frontend is using

When you run `npm run dev`, check the browser console. The auth API will log:
```
Redirecting to Google OAuth: [URL]
```

This shows which API URL is being used.

## ⚙️ How It Works

### Environment Variables Used

1. **`NEXT_PUBLIC_API_URL`**
   - Used by: `auth-api.ts` and `api.ts`
   - Should be: `http://localhost:4000/api/v1` (dev) or `https://yourdomain.com/api/v1` (prod)
   - **Important:** This is where ALL API calls go

2. **`NEXT_PUBLIC_DOMAIN`**
   - Used by: Next.js config for image optimization
   - Should be: `localhost` (dev) or `yourdomain.com` (prod)

3. **`NEXT_PUBLIC_SITE_URL`**
   - Used by: Next.js config, can be used for absolute URLs
   - Should be: `http://localhost:3000` (dev) or `https://yourdomain.com` (prod)

### Where These Are Used

- **`frontend/src/lib/auth-api.ts`** - All authentication API calls
- **`frontend/src/lib/api.ts`** - All app data API calls
- **`frontend/next.config.js`** - Next.js configuration

## 🔄 Switching Between Dev and Production

### Quick Switch Script

```bash
cd frontend
npm run setup:domain
```

Then:
- Enter domain: `appcortex.pro` (or your domain)
- Choose: `1` for Production or `2` for Development

### Manual Switch

Edit `frontend/.env.local`:

**For Local Development:**
```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
NEXT_PUBLIC_DOMAIN=localhost
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**For Production:**
```env
NEXT_PUBLIC_API_URL=https://appcortex.pro/api/v1
NEXT_PUBLIC_DOMAIN=appcortex.pro
NEXT_PUBLIC_SITE_URL=https://appcortex.pro
```

**Important:** After changing `.env.local`, restart your Next.js dev server:
```bash
# Stop the server (Ctrl+C)
# Then restart
npm run dev
```

## ✅ Verification Checklist

### For Local Development

1. ✅ `.env.local` has `NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1`
2. ✅ Backend is running on `http://localhost:4000`
3. ✅ Frontend is running on `http://localhost:3000`
4. ✅ Test: Visit `http://localhost:3000/login` and try Google login

### For Production

1. ✅ `.env.local` has `NEXT_PUBLIC_API_URL=https://appcortex.pro/api/v1`
2. ✅ Backend is deployed and accessible at `https://appcortex.pro/api/v1`
3. ✅ DNS is configured correctly
4. ✅ SSL certificate is valid
5. ✅ Google OAuth redirect URI matches: `https://appcortex.pro/api/v1/auth/google/callback`

## 🐛 Troubleshooting

### Frontend can't connect to backend

**Check:**
1. Is backend running? Test: `curl http://localhost:4000/api/v1/health`
2. Is `NEXT_PUBLIC_API_URL` correct in `.env.local`?
3. Did you restart Next.js after changing `.env.local`?

### Google OAuth not working

**Check:**
1. Is `NEXT_PUBLIC_API_URL` pointing to the correct backend?
2. Does backend have Google OAuth configured?
3. Is the redirect URI correct in Google Console?

### Wrong API URL being used

**Check:**
1. Open browser DevTools → Network tab
2. Look at API request URLs
3. They should match your `NEXT_PUBLIC_API_URL`
4. If not, restart Next.js dev server

## 📝 Example Configurations

### Development (Local)
```env
# frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
NEXT_PUBLIC_DOMAIN=localhost
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Production (Deployed)
```env
# frontend/.env.local
NEXT_PUBLIC_API_URL=https://appcortex.pro/api/v1
NEXT_PUBLIC_DOMAIN=appcortex.pro
NEXT_PUBLIC_SITE_URL=https://appcortex.pro
```

### Production with Separate API Subdomain
```env
# frontend/.env.local
NEXT_PUBLIC_API_URL=https://api.appcortex.pro/api/v1
NEXT_PUBLIC_DOMAIN=appcortex.pro
NEXT_PUBLIC_SITE_URL=https://appcortex.pro
```

## 🚀 Quick Commands

```bash
# Check current config (Windows PowerShell)
Get-Content frontend\.env.local

# Check current config (Mac/Linux)
cat frontend/.env.local

# Switch to development
cd frontend
npm run setup:domain
# Choose option 2

# Switch to production
cd frontend
npm run setup:domain
# Choose option 1
```

---

**Remember:** After changing `.env.local`, always restart your Next.js dev server!

