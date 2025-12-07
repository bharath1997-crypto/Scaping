# Google OAuth Setup Guide

## Step 1: Add Credentials to .env File

Open your `.env` file in the root directory and add these three lines:

```env
GOOGLE_CLIENT_ID=your-actual-google-client-id-here
GOOGLE_CLIENT_SECRET=your-actual-google-client-secret-here
GOOGLE_CALLBACK_URL=http://localhost:4000/api/v1/auth/google/callback
```

**Important:** Replace `your-actual-google-client-id-here` and `your-actual-google-client-secret-here` with your actual credentials from Google Cloud Console.

## Step 2: Verify Google Cloud Console Settings

Make sure in your Google Cloud Console:

1. **OAuth Consent Screen** is configured:
   - Go to: APIs & Services → OAuth consent screen
   - Set User Type (Internal/External)
   - Add your app name, support email, etc.

2. **Authorized Redirect URIs** includes:
   - `http://localhost:4000/api/v1/auth/google/callback`
   - (For production, also add your production URL)

3. **Authorized JavaScript origins** includes:
   - `http://localhost:4000`
   - `http://localhost:3000`
   - (For production, add your production domains)

## Step 3: Restart Backend Server

After adding the credentials, restart your backend server:

```bash
# Stop the current server (Ctrl+C if running in terminal)
# Then restart:
npm run api
```

You should see in the console:
- ✅ No warning about Google OAuth not being configured
- ✅ Server starts successfully

## Step 4: Test Google Sign-In

1. Go to `http://localhost:3000/login` (or `/register`)
2. Click "Continue with Google"
3. You should be redirected to Google's sign-in page
4. After signing in, you'll be redirected back to your app

## Troubleshooting

### Error: "redirect_uri_mismatch"
- Check that `GOOGLE_CALLBACK_URL` in `.env` matches exactly what's in Google Console
- Default should be: `http://localhost:4000/api/v1/auth/google/callback`

### Error: "invalid_client"
- Verify `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are correct
- Make sure there are no extra spaces or quotes in `.env` file

### Still seeing "Google OAuth not configured" error
- Make sure you restarted the backend server after adding credentials
- Check that `.env` file is in the root directory (same folder as `package.json`)
- Verify the variable names are exactly: `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` (case-sensitive)

### Server won't start
- Check for syntax errors in `.env` file
- Make sure each line has `KEY=value` format (no spaces around `=`)
- Don't use quotes unless the value contains spaces

## Example .env File

```env
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/appcortex

# Server
PORT=4000
CORS_ORIGIN=*

# JWT
JWT_SECRET=your-jwt-secret-here
JWT_REFRESH_SECRET=your-refresh-secret-here
JWT_EXPIRY=1h
JWT_REFRESH_EXPIRY=7d

# Google OAuth
GOOGLE_CLIENT_ID=123456789-abcdefghijklmnop.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-abcdefghijklmnopqrstuvwxyz
GOOGLE_CALLBACK_URL=http://localhost:4000/api/v1/auth/google/callback

# Frontend
FRONTEND_URL=http://localhost:3000
```

## Security Notes

- ⚠️ **Never commit `.env` file to git** (it's already in `.gitignore`)
- ⚠️ Use different credentials for development and production
- ⚠️ Keep your `GOOGLE_CLIENT_SECRET` secure - treat it like a password



