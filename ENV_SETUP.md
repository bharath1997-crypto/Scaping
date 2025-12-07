# Environment Variables Setup

## Required Environment Variables

Add these variables to your `.env` file:

```env
# Database (already configured)
DATABASE_URL=postgresql://username:password@localhost:5432/appcortex

# Server (already configured)
PORT=4000
CORS_ORIGIN=*

# JWT Authentication (NEW - Required)
JWT_SECRET=your-super-secret-jwt-key-change-in-production-use-long-random-string
JWT_REFRESH_SECRET=your-super-secret-refresh-key-different-from-jwt-secret
JWT_EXPIRY=1h
JWT_REFRESH_EXPIRY=7d

# Google OAuth (NEW - Optional, for Google Sign-In)
GOOGLE_CLIENT_ID=your-google-client-id-from-google-console
GOOGLE_CLIENT_SECRET=your-google-client-secret-from-google-console
GOOGLE_CALLBACK_URL=http://localhost:4000/api/v1/auth/google/callback

# Frontend URL (NEW - for OAuth redirects)
FRONTEND_URL=http://localhost:3000

# SMS/OTP Service (NEW - Optional, for production SMS)
# For development, OTP will be logged to console (mock SMS)
# For production, configure Twilio or similar service:
# TWILIO_ACCOUNT_SID=your-twilio-account-sid
# TWILIO_AUTH_TOKEN=your-twilio-auth-token
# TWILIO_PHONE_NUMBER=+1234567890
```

## Google OAuth Setup (Optional)

To enable Google Sign-In:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Configure OAuth consent screen
6. Add authorized redirect URI: `http://localhost:4000/api/v1/auth/google/callback`
7. Copy Client ID and Client Secret to your `.env` file

## For Development (Minimal Setup)

You can start with just these authentication variables:

```env
JWT_SECRET=dev-secret-key-change-in-production
JWT_REFRESH_SECRET=dev-refresh-secret-key-change-in-production
JWT_EXPIRY=1h
JWT_REFRESH_EXPIRY=7d
FRONTEND_URL=http://localhost:3000
```

**Note:** 
- OTP will be logged to console in development (no SMS service needed)
- Google OAuth is optional - users can still register/login with email/password or phone
- For production, always use strong random secrets and configure real SMS service

