# Production Setup Guide for appcortex.pro

## 🎯 Domain Configuration

Your domain: **appcortex.pro**

## 📋 Step 1: Google Cloud Console - Update OAuth Settings

### 1.1 Authorized Redirect URIs

Go to [Google Cloud Console](https://console.cloud.google.com/) → APIs & Services → Credentials → Your OAuth 2.0 Client

Add these **Authorized redirect URIs**:

```
http://localhost:4000/api/v1/auth/google/callback          (for local development)
https://appcortex.pro/api/v1/auth/google/callback          (for production)
https://www.appcortex.pro/api/v1/auth/google/callback      (if using www subdomain)
```

### 1.2 Authorized JavaScript Origins

Add these **Authorized JavaScript origins**:

```
http://localhost:4000                                      (for local development)
http://localhost:3000                                       (for local frontend)
https://appcortex.pro                                       (for production)
https://www.appcortex.pro                                   (if using www subdomain)
```

### 1.3 OAuth Consent Screen

- Go to APIs & Services → OAuth consent screen
- Update **Authorized domains** to include: `appcortex.pro`
- Add your production support email
- Update app name, logo, etc. for production

## 📋 Step 2: Environment Variables

### 2.1 Backend Production `.env` (on your server)

Create/update `.env` file on your production server:

```env
# Database (Production PostgreSQL)
DATABASE_URL=postgresql://username:password@your-db-host:5432/appcortex

# Server
PORT=4000
NODE_ENV=production
CORS_ORIGIN=https://appcortex.pro,https://www.appcortex.pro

# JWT (USE STRONG RANDOM SECRETS!)
JWT_SECRET=your-production-jwt-secret-min-32-characters-long-random-string
JWT_REFRESH_SECRET=your-production-refresh-secret-different-from-jwt-secret
JWT_EXPIRY=1h
JWT_REFRESH_EXPIRY=7d

# Google OAuth (Production)
GOOGLE_CLIENT_ID=368070439548-g9dtt0fnccjvpp6t06ttr1ege2qpe2ua.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=https://appcortex.pro/api/v1/auth/google/callback

# Frontend URL (Production)
FRONTEND_URL=https://appcortex.pro

# SMS/OTP Service (Production - configure Twilio or similar)
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=+1234567890
```

### 2.2 Frontend Production `.env.local` (on your server)

Create `.env.local` in the `frontend` directory:

```env
NEXT_PUBLIC_API_URL=https://appcortex.pro/api/v1
```

Or if you're using a separate API subdomain:

```env
NEXT_PUBLIC_API_URL=https://api.appcortex.pro/api/v1
```

## 📋 Step 3: DNS Configuration

### 3.1 Basic Setup (appcortex.pro → Your Server)

Add these DNS records:

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

### 3.2 If Using Separate API Subdomain

```
Type: A
Name: api
Value: YOUR_SERVER_IP_ADDRESS
TTL: 3600
```

Then update:
- Backend `GOOGLE_CALLBACK_URL`: `https://api.appcortex.pro/api/v1/auth/google/callback`
- Frontend `NEXT_PUBLIC_API_URL`: `https://api.appcortex.pro/api/v1`

## 📋 Step 4: SSL Certificate (HTTPS)

### Option A: Using Nginx Reverse Proxy (Recommended)

1. Install Nginx on your server
2. Install Certbot for Let's Encrypt SSL:
   ```bash
   sudo apt-get install certbot python3-certbot-nginx
   ```
3. Get SSL certificate:
   ```bash
   sudo certbot --nginx -d appcortex.pro -d www.appcortex.pro
   ```

### Option B: Using Cloudflare (Easier)

1. Add your domain to Cloudflare
2. Update nameservers at your domain registrar
3. Enable "SSL/TLS" → "Full" mode
4. Cloudflare will handle SSL automatically

### Option C: Using PM2 with SSL

If running Node.js directly, use PM2 with SSL certificates.

## 📋 Step 5: Server Configuration

### 5.1 Nginx Configuration (if using Nginx)

Create `/etc/nginx/sites-available/appcortex.pro`:

```nginx
# Frontend (Next.js)
server {
    listen 80;
    listen [::]:80;
    server_name appcortex.pro www.appcortex.pro;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# Backend API
server {
    listen 80;
    listen [::]:80;
    server_name api.appcortex.pro;  # or use appcortex.pro/api

    location / {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Then enable SSL with Certbot (see Step 4).

### 5.2 PM2 Process Manager (Recommended)

Install PM2:
```bash
npm install -g pm2
```

Start backend:
```bash
cd /path/to/your/project
pm2 start npm --name "appcortex-api" -- run api
pm2 save
pm2 startup  # Enable auto-start on reboot
```

Start frontend:
```bash
cd /path/to/your/project/frontend
pm2 start npm --name "appcortex-frontend" -- run start
pm2 save
```

## 📋 Step 6: Database Setup (Production)

### 6.1 PostgreSQL on Production Server

```bash
# Install PostgreSQL
sudo apt-get install postgresql postgresql-contrib

# Create database
sudo -u postgres psql
CREATE DATABASE appcortex;
CREATE USER appcortex_user WITH PASSWORD 'your-secure-password';
GRANT ALL PRIVILEGES ON DATABASE appcortex TO appcortex_user;
\q
```

### 6.2 Run Migrations

```bash
cd /path/to/your/project
npm run migrate
# or
npx prisma migrate deploy
```

## 📋 Step 7: Testing Production Setup

### 7.1 Test Google OAuth

1. Visit: `https://appcortex.pro/login`
2. Click "Continue with Google"
3. Should redirect to Google sign-in
4. After sign-in, should redirect back to your app

### 7.2 Test API Endpoints

```bash
# Health check
curl https://appcortex.pro/api/v1/health

# Test Google OAuth config
curl https://appcortex.pro/api/v1/auth/test-google-config
```

## 📋 Step 8: Security Checklist

- [ ] Use strong, random JWT secrets (32+ characters)
- [ ] Enable HTTPS/SSL (required for OAuth)
- [ ] Set `NODE_ENV=production`
- [ ] Configure CORS to only allow your domain
- [ ] Set up firewall (only allow ports 80, 443, 22)
- [ ] Use environment variables (never commit secrets)
- [ ] Enable rate limiting on API endpoints
- [ ] Set up monitoring/logging (e.g., PM2 logs)
- [ ] Configure database backups
- [ ] Set up error tracking (e.g., Sentry)

## 📋 Step 9: Environment-Specific Configs

### Development (Local)
```env
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
GOOGLE_CALLBACK_URL=http://localhost:4000/api/v1/auth/google/callback
```

### Production
```env
NODE_ENV=production
FRONTEND_URL=https://appcortex.pro
GOOGLE_CALLBACK_URL=https://appcortex.pro/api/v1/auth/google/callback
```

## 🚀 Quick Deployment Checklist

1. ✅ Update Google Cloud Console OAuth settings
2. ✅ Set up DNS records (A records)
3. ✅ Configure SSL certificate (HTTPS)
4. ✅ Set production environment variables
5. ✅ Deploy backend to server
6. ✅ Deploy frontend to server
7. ✅ Run database migrations
8. ✅ Start services with PM2
9. ✅ Test Google OAuth flow
10. ✅ Test all authentication methods

## 📞 Troubleshooting

### Google OAuth not working in production
- Check redirect URI matches exactly in Google Console
- Verify SSL certificate is valid
- Check CORS settings allow your domain
- Verify environment variables are loaded

### Domain not resolving
- Check DNS propagation: `nslookup appcortex.pro`
- Verify A records point to correct IP
- Wait up to 48 hours for DNS propagation

### SSL certificate issues
- Verify domain points to your server before requesting certificate
- Check firewall allows port 80/443
- Ensure Nginx/webserver is running

---

**Need help?** Check the logs:
```bash
# Backend logs
pm2 logs appcortex-api

# Frontend logs
pm2 logs appcortex-frontend

# Nginx logs
sudo tail -f /var/log/nginx/error.log
```



