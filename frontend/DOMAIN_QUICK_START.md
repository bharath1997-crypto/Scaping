# Domain Setup - Quick Start Guide

## 🚀 Fast Setup (3 Steps)

### Step 1: Run Setup Script

**Windows (PowerShell):**
```powershell
cd frontend
.\env-setup.ps1
```

**Mac/Linux:**
```bash
cd frontend
chmod +x env-setup.sh
./env-setup.sh
```

**Or use npm script:**
```bash
cd frontend
npm run setup:domain
```

### Step 2: Update Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. APIs & Services → Credentials → Your OAuth Client
3. Add redirect URI: `https://yourdomain.com/api/v1/auth/google/callback`
4. Add JavaScript origin: `https://yourdomain.com`

### Step 3: Configure DNS & SSL

**DNS Records:**
```
Type: A
Name: @
Value: YOUR_SERVER_IP
```

**SSL Certificate:**
```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## 📝 Manual Setup

If you prefer to set up manually:

1. **Create `.env.local` in `frontend/` directory:**
   ```env
   NEXT_PUBLIC_API_URL=https://yourdomain.com/api/v1
   NEXT_PUBLIC_DOMAIN=yourdomain.com
   NEXT_PUBLIC_SITE_URL=https://yourdomain.com
   ```

2. **Update backend `.env`:**
   ```env
   NODE_ENV=production
   FRONTEND_URL=https://yourdomain.com
   CORS_ORIGIN=https://yourdomain.com,https://www.yourdomain.com
   GOOGLE_CALLBACK_URL=https://yourdomain.com/api/v1/auth/google/callback
   ```

## ✅ Verify Setup

```bash
# Check environment variables
cat frontend/.env.local

# Test API
curl https://yourdomain.com/api/v1/health

# Build frontend
cd frontend
npm run build
```

## 📚 Full Documentation

See `DOMAIN_SETUP.md` for complete instructions.

