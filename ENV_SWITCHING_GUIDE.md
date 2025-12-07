# Environment Switching Guide

## 🎯 Overview

This project uses **separate environment files** for local development and production to ensure Google OAuth, CORS, and other settings are correctly configured for each environment.

## 📁 Environment Files

| File | Purpose | When to Use |
|-----|---------|-------------|
| `.env` | **Active configuration** (ignored by git) | Automatically loaded by Node.js |
| `.env.local` | Local development template | Development on your laptop |
| `.env.production` | Production template | Deployment to live server |
| `.env.example` | Documentation template | Reference for team members |

## 🚀 Quick Start

### For Local Development

```bash
# Option 1: Use npm script (automatically switches)
npm run dev

# Option 2: Switch manually, then start
npm run env:local
npm run api
```

### For Production Deployment

```bash
# Option 1: Use npm script (automatically switches)
npm start

# Option 2: Switch manually, then start
npm run env:production
npm run api
```

## 📋 Manual Switching

### Using Node.js Script (Cross-platform)

```bash
# Switch to local
node scripts/env-switch.js local

# Switch to production
node scripts/env-switch.js production
```

### Using PowerShell (Windows)

```powershell
# Switch to local
.\scripts\env-local.ps1

# Switch to production
.\scripts\env-production.ps1
```

### Using CMD (Windows)

```cmd
# Switch to local
scripts\env-local.cmd

# Switch to production
scripts\env-production.cmd
```

## ⚙️ Automated Scripts

The `package.json` includes automated scripts:

- **`npm run dev`** → Automatically switches to `.env.local` and starts server
- **`npm start`** → Automatically switches to `.env.production` and starts server
- **`npm run env:local`** → Switch to local without starting server
- **`npm run env:production`** → Switch to production without starting server

## 🔍 Verify Current Environment

After switching, check your active `.env` file:

```bash
# Windows PowerShell
Get-Content .env | Select-String "^(NODE_ENV|CORS_ORIGIN|FRONTEND_URL|GOOGLE_CALLBACK_URL)="

# Linux/Mac
grep -E "^(NODE_ENV|CORS_ORIGIN|FRONTEND_URL|GOOGLE_CALLBACK_URL)=" .env
```

## ⚠️ Important Notes

### Google OAuth Configuration

**CRITICAL:** The `GOOGLE_CALLBACK_URL` must match exactly what's configured in Google Cloud Console:

- **Local:** `http://localhost:4000/api/v1/auth/google/callback`
- **Production:** `https://appcortex.pro/api/v1/auth/google/callback`

Both URLs can be registered in Google Console simultaneously - Google will use whichever matches the request.

### CORS Configuration

- **Local:** `CORS_ORIGIN=http://localhost:3000` (frontend dev server)
- **Production:** `CORS_ORIGIN=https://appcortex.pro,https://www.appcortex.pro`

### Never Commit `.env`

The `.env` file is ignored by git. Always use `.env.local` or `.env.production` as templates.

## 🐛 Troubleshooting

### "Error: invalid_client" from Google

1. Check which environment you're using: `Get-Content .env | Select-String "GOOGLE_CALLBACK_URL"`
2. Verify the callback URL matches Google Console:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - APIs & Services → Credentials → Your OAuth Client
   - Check "Authorized redirect URIs"
3. Make sure you restarted the server after switching environments

### "CORS error" in browser

1. Verify `CORS_ORIGIN` matches your frontend URL
2. For local: Should be `http://localhost:3000`
3. For production: Should be `https://appcortex.pro`
4. Restart backend server after changing `.env`

### Environment not switching

1. Check that `.env.local` or `.env.production` exists
2. Verify the script ran successfully (check console output)
3. Manually verify: `Get-Content .env | Select-String "NODE_ENV"`

## 📝 Creating New Environment Files

If you need to create `.env.local` or `.env.production`:

1. Copy from `.env.example`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your values (especially Google OAuth credentials)

3. For production, also update:
   - `NODE_ENV=production`
   - `CORS_ORIGIN` to your production domain
   - `FRONTEND_URL` to your production domain
   - `GOOGLE_CALLBACK_URL` to production URL
   - Generate strong `JWT_SECRET` and `JWT_REFRESH_SECRET`

## 🔐 Security Best Practices

1. **Never commit `.env`, `.env.local`, or `.env.production`** to git
2. **Use strong secrets in production:**
   ```bash
   openssl rand -base64 32  # Generate JWT_SECRET
   openssl rand -base64 32  # Generate JWT_REFRESH_SECRET
   ```
3. **Different Google OAuth credentials** for dev/prod (optional but recommended)
4. **Rotate secrets regularly** in production
5. **Use environment variables** on your hosting platform instead of `.env` files when possible

## 🎯 Summary

- **Local development** → Use `.env.local` (via `npm run dev`)
- **Production deployment** → Use `.env.production` (via `npm start`)
- **Always restart server** after switching environments
- **Verify Google Console** redirect URIs match your callback URLs

