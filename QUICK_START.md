# 🚀 Quick Start Guide - How to Run and Check AppCortex

## 📋 Prerequisites

Make sure you have:
- ✅ Node.js installed (v18+)
- ✅ PostgreSQL running
- ✅ Redis running (optional, for queues)
- ✅ `.env` file configured (use `.env.local` for development)

---

## 🔧 Step 1: Install Dependencies

### Backend (Root Directory)
```bash
npm install
```

### Frontend
```bash
cd frontend
npm install
cd ..
```

---

## 🎯 Step 2: Setup Environment

### For Local Development:
```bash
# This automatically switches to .env.local
npm run env:local
```

Or manually copy:
```bash
copy .env.local .env
```

### Verify Environment:
```bash
# Check that .env has local settings
Get-Content .env | Select-String "NODE_ENV|CORS_ORIGIN|GOOGLE_CALLBACK_URL"
```

Should show:
- `NODE_ENV=development`
- `CORS_ORIGIN=http://localhost:3000`
- `GOOGLE_CALLBACK_URL=http://localhost:4000/api/v1/auth/google/callback`

---

## 🖥️ Step 3: Start Backend API Server

### Option 1: Auto-switch to local + start (Recommended)
```bash
npm run dev
```

### Option 2: Start without env switching
```bash
npm run api
```

### Expected Output:
```
✅ Switched to LOCAL environment
   Copied .env.local → .env

🔍 Google OAuth Configuration Check:
  GOOGLE_CLIENT_ID from env = 368070439548-g9dtt0f...
  GOOGLE_CLIENT_SECRET from env = ✅ Set (hidden)
  GOOGLE_CALLBACK_URL from env = http://localhost:4000/api/v1/auth/google/callback
✅ Google OAuth configured successfully

🔍 Loaded ENV:
  PORT = 4000
  CORS_ORIGIN = http://localhost:3000
  FRONTEND_URL = http://localhost:3000
  ...

╔════════════════════════════════════════════════════════════╗
║           AppCortex API Server Started                     ║
╠════════════════════════════════════════════════════════════╣
║  URL: http://localhost:4000                                 ║
║  Health: http://localhost:4000/health                       ║
╚════════════════════════════════════════════════════════════╝
```

**Keep this terminal open!** The server runs here.

---

## 🌐 Step 4: Start Frontend (New Terminal)

Open a **new terminal window** and run:

```bash
cd frontend
npm run dev
```

### Expected Output:
```
  ▲ Next.js 14.2.0
  - Local:        http://localhost:3000
  - Ready in 2.5s
```

**Keep this terminal open too!**

---

## ✅ Step 5: Verify Everything Works

### 1. Check Backend Health
Open in browser: **http://localhost:4000/health**

Should return:
```json
{
  "status": "ok",
  "timestamp": "2024-..."
}
```

### 2. Check Backend API Endpoints
Open in browser: **http://localhost:4000/api/v1/apps**

Should return JSON with apps data (or empty array if no data).

### 3. Check Frontend Homepage
Open in browser: **http://localhost:3000**

Should see:
- ✅ Beautiful marketing homepage
- ✅ Hero section with gradients
- ✅ Features section
- ✅ Comparison table
- ✅ No console errors

### 4. Test Google OAuth Config
Open in browser: **http://localhost:4000/api/v1/auth/test-google-config**

Should return:
```json
{
  "success": true,
  "config": {
    "clientId": "368070439548-g9dtt0f...",
    "clientSecret": "✅ Set",
    "callbackUrl": "http://localhost:4000/api/v1/auth/google/callback",
    "isConfigured": true
  },
  "testUrl": "https://accounts.google.com/o/oauth2/v2/auth?..."
}
```

### 5. Test Google OAuth Debug Route
Open in browser: **http://localhost:4000/api/v1/auth/google-debug**

Should redirect to Google login page (if credentials are correct).

---

## 🔍 Common Checks

### Check if Ports are Available

**Windows PowerShell:**
```powershell
# Check port 4000 (backend)
netstat -ano | findstr :4000

# Check port 3000 (frontend)
netstat -ano | findstr :3000
```

If ports are in use, kill the process:
```powershell
# Find PID
netstat -ano | findstr :4000

# Kill process (replace <PID> with actual number)
taskkill /PID <PID> /F
```

### Check Database Connection

```bash
# Run Prisma Studio to verify database
npm run studio
```

Should open Prisma Studio at `http://localhost:5555`

### Check Environment Variables

```powershell
# Verify .env file
Get-Content .env | Select-String "GOOGLE_CLIENT_ID|DATABASE_URL|PORT"
```

---

## 🐛 Troubleshooting

### Error: "Port 4000 already in use"
```powershell
# Find and kill process
netstat -ano | findstr :4000
taskkill /PID <PID> /F
```

### Error: "Cannot connect to backend"
1. Check backend is running: `http://localhost:4000/health`
2. Check `CORS_ORIGIN` in `.env` matches frontend URL
3. Restart backend server

### Error: "Google OAuth not configured"
1. Check `.env` has `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
2. Verify no typos (especially `g9dtt0f` not `g9dttof`)
3. Restart backend server

### Frontend shows "Backend API not available"
1. Make sure backend is running on port 4000
2. Check `frontend/next.config.js` has correct `NEXT_PUBLIC_API_URL`
3. Check browser console for CORS errors

### Database Connection Error
1. Verify PostgreSQL is running
2. Check `DATABASE_URL` in `.env`
3. Run `npm run generate` to regenerate Prisma client

---

## 📊 Quick Test Checklist

- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] `http://localhost:4000/health` returns `{"status":"ok"}`
- [ ] `http://localhost:3000` shows homepage
- [ ] `http://localhost:4000/api/v1/apps` returns data (or empty array)
- [ ] Google OAuth config endpoint works
- [ ] No console errors in browser
- [ ] No errors in terminal

---

## 🎯 Next Steps

Once everything is running:

1. **Test Authentication:**
   - Visit `http://localhost:3000/login`
   - Try Google OAuth login
   - Try email/password registration

2. **Explore Apps:**
   - Visit `http://localhost:3000/apps`
   - Browse apps by store/category
   - View app details

3. **Check API Endpoints:**
   - `GET /api/v1/apps` - List apps
   - `GET /api/v1/apps/:store/:appId` - App details
   - `GET /api/v1/auth/me` - Current user (requires auth)

---

## 📝 Running in Production

For production deployment:

```bash
# Switch to production environment
npm run env:production

# Start production server
npm start
```

Make sure `.env.production` has:
- `NODE_ENV=production`
- `CORS_ORIGIN=https://appcortex.pro`
- `GOOGLE_CALLBACK_URL=https://appcortex.pro/api/v1/auth/google/callback`

---

## 🆘 Need Help?

Check these files:
- `ENV_SWITCHING_GUIDE.md` - Environment setup
- `GOOGLE_OAUTH_SETUP.md` - OAuth configuration
- `PRODUCTION_SETUP.md` - Production deployment

