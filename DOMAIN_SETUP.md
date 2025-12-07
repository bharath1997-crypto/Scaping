# Domain Setup Guide for AppCortex

## 🎯 Quick Setup

This guide will help you configure your domain (`appcortex.pro`) for production deployment.

## 📋 Step 1: Create Environment Files

### Frontend Environment

1. **For Production:**
   ```bash
   cd frontend
   cp .env.production.example .env.local
   ```

2. **Edit `.env.local`** and update:
   ```env
   NEXT_PUBLIC_API_URL=https://appcortex.pro/api/v1
   NEXT_PUBLIC_DOMAIN=appcortex.pro
   NEXT_PUBLIC_SITE_URL=https://appcortex.pro
   ```

3. **For Local Development:**
   ```bash
   cp .env.local.example .env.local
   ```
   (Already configured for localhost)

### Backend Environment

Create/update `.env` in the root directory:

```env
# Domain Configuration
NODE_ENV=production
FRONTEND_URL=https://appcortex.pro

# CORS - Allow your domain
CORS_ORIGIN=https://appcortex.pro,https://www.appcortex.pro

# Google OAuth Callback
GOOGLE_CALLBACK_URL=https://appcortex.pro/api/v1/auth/google/callback

# API Port (if running separately)
PORT=4000
```

## 📋 Step 2: Update Google OAuth Settings

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to: **APIs & Services** → **Credentials** → Your OAuth 2.0 Client
3. Add these **Authorized redirect URIs**:
   ```
   https://appcortex.pro/api/v1/auth/google/callback
   https://www.appcortex.pro/api/v1/auth/google/callback
   ```
4. Add these **Authorized JavaScript origins**:
   ```
   https://appcortex.pro
   https://www.appcortex.pro
   ```

## 📋 Step 3: DNS Configuration

Add these DNS records at your domain registrar:

### Option A: Single Domain (appcortex.pro)

```
Type: A
Name: @
Value: YOUR_SERVER_IP_ADDRESS
TTL: 3600

Type: A
Name: www
Value: YOUR_SERVER_IP_ADDRESS
TTL: 3600
```

### Option B: Separate API Subdomain

```
Type: A
Name: @
Value: YOUR_SERVER_IP_ADDRESS
TTL: 3600

Type: A
Name: www
Value: YOUR_SERVER_IP_ADDRESS
TTL: 3600

Type: A
Name: api
Value: YOUR_SERVER_IP_ADDRESS
TTL: 3600
```

Then update:
- Frontend `.env.local`: `NEXT_PUBLIC_API_URL=https://api.appcortex.pro/api/v1`
- Backend `.env`: `GOOGLE_CALLBACK_URL=https://api.appcortex.pro/api/v1/auth/google/callback`

## 📋 Step 4: SSL Certificate (HTTPS)

### Option A: Using Nginx + Let's Encrypt (Recommended)

1. Install Certbot:
   ```bash
   sudo apt-get install certbot python3-certbot-nginx
   ```

2. Get SSL certificate:
   ```bash
   sudo certbot --nginx -d appcortex.pro -d www.appcortex.pro
   ```

### Option B: Using Cloudflare (Easier)

1. Add domain to Cloudflare
2. Update nameservers at your registrar
3. Enable SSL/TLS → Full mode
4. Cloudflare handles SSL automatically

## 📋 Step 5: Verify Domain Configuration

### Test DNS Resolution

```bash
# Check if domain resolves
nslookup appcortex.pro

# Check if www subdomain resolves
nslookup www.appcortex.pro
```

### Test SSL Certificate

```bash
# Check SSL certificate
openssl s_client -connect appcortex.pro:443 -servername appcortex.pro
```

### Test API Endpoints

```bash
# Health check
curl https://appcortex.pro/api/v1/health

# Test Google OAuth config
curl https://appcortex.pro/api/v1/auth/test-google-config
```

## 📋 Step 6: Build and Deploy

### Frontend

```bash
cd frontend

# Build for production
npm run build

# Start production server
npm start
```

### Backend

```bash
# Install dependencies
npm install

# Run migrations
npm run migrate

# Start server
npm start
```

## 📋 Step 7: Environment-Specific Configuration

### Development (Local)

**Frontend `.env.local`:**
```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
NEXT_PUBLIC_DOMAIN=localhost
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Backend `.env`:**
```env
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
CORS_ORIGIN=http://localhost:3000
GOOGLE_CALLBACK_URL=http://localhost:4000/api/v1/auth/google/callback
```

### Production

**Frontend `.env.local`:**
```env
NEXT_PUBLIC_API_URL=https://appcortex.pro/api/v1
NEXT_PUBLIC_DOMAIN=appcortex.pro
NEXT_PUBLIC_SITE_URL=https://appcortex.pro
```

**Backend `.env`:**
```env
NODE_ENV=production
FRONTEND_URL=https://appcortex.pro
CORS_ORIGIN=https://appcortex.pro,https://www.appcortex.pro
GOOGLE_CALLBACK_URL=https://appcortex.pro/api/v1/auth/google/callback
```

## 🔍 Troubleshooting

### Domain Not Resolving

1. Check DNS propagation: `nslookup appcortex.pro`
2. Verify A records point to correct IP
3. Wait up to 48 hours for DNS propagation
4. Clear DNS cache: `ipconfig /flushdns` (Windows) or `sudo dscacheutil -flushcache` (Mac)

### SSL Certificate Issues

1. Verify domain points to your server before requesting certificate
2. Check firewall allows ports 80/443
3. Ensure Nginx/webserver is running
4. Check certificate: `certbot certificates`

### Google OAuth Not Working

1. Verify redirect URI matches exactly in Google Console
2. Check SSL certificate is valid
3. Verify CORS settings allow your domain
4. Check environment variables are loaded correctly
5. Test with: `curl https://appcortex.pro/api/v1/auth/test-google-config`

### API Not Accessible

1. Check backend is running: `pm2 list`
2. Verify CORS_ORIGIN includes your domain
3. Check firewall allows port 4000 (or your API port)
4. Test API directly: `curl https://appcortex.pro/api/v1/health`

## ✅ Checklist

- [ ] Created `.env.local` in frontend directory
- [ ] Updated backend `.env` with production values
- [ ] Added domain to Google OAuth settings
- [ ] Configured DNS records (A records)
- [ ] Set up SSL certificate (HTTPS)
- [ ] Built frontend: `npm run build`
- [ ] Started services (PM2 or similar)
- [ ] Tested domain: `https://appcortex.pro`
- [ ] Tested API: `https://appcortex.pro/api/v1/health`
- [ ] Tested Google OAuth login
- [ ] Verified all pages load correctly

## 🚀 Quick Commands

```bash
# Check current environment
echo $NODE_ENV

# Check DNS
nslookup appcortex.pro

# Test SSL
curl -I https://appcortex.pro

# Check backend logs
pm2 logs appcortex-api

# Check frontend logs
pm2 logs appcortex-frontend

# Restart services
pm2 restart all
```

---

**Need help?** Check the logs:
- Backend: `pm2 logs appcortex-api`
- Frontend: `pm2 logs appcortex-frontend`
- Nginx: `sudo tail -f /var/log/nginx/error.log`

