# AppCortex Authentication System

## Overview

AppCortex now has a complete authentication system supporting:

1. **Email/Password Authentication**
2. **Phone Number + OTP Authentication**
3. **Google OAuth 2.0 Authentication**

## Backend Architecture

### Database Schema

New tables added to `prisma/schema.prisma`:

- **User** - Core user account information
  - Supports email, phone, and Google OAuth
  - Tracks verification status for email and phone
  - Stores user role (USER, ADMIN, DEVELOPER)

- **OTPCode** - One-time password codes for phone verification
  - 6-digit codes with expiration
  - Tracks verification attempts
  - Supports multiple purposes (SIGNUP, LOGIN, VERIFY_PHONE)

- **RefreshToken** - Long-lived tokens for session management
  - JWT refresh tokens stored in database
  - Can be revoked for logout
  - Automatic expiration tracking

- **WatchlistApp** - User's saved/favorite apps (for future features)

### API Endpoints

All auth endpoints are prefixed with `/api/v1/auth`:

#### Email/Password Authentication

- **POST /register**
  - Body: `{ email, password, name? }`
  - Returns: `{ user, accessToken, refreshToken }`
  - Password requirements: 8+ chars, uppercase, lowercase, number

- **POST /login**
  - Body: `{ email, password }`
  - Returns: `{ user, accessToken, refreshToken }`

#### Phone/OTP Authentication

- **POST /send-otp**
  - Body: `{ phoneNumber, purpose? }`
  - Purpose: "SIGNUP" | "LOGIN" | "VERIFY_PHONE"
  - Returns: `{ success, message }`
  - Note: In development, OTP is logged to console (mock SMS)

- **POST /verify-otp**
  - Body: `{ phoneNumber, code, purpose? }`
  - Returns: `{ user, accessToken, refreshToken }`
  - Creates user account if doesn't exist (for SIGNUP)

#### Google OAuth

- **GET /google**
  - Initiates Google OAuth flow
  - Redirects to Google sign-in

- **GET /google/callback**
  - Google OAuth callback handler
  - Redirects to frontend with tokens: `${FRONTEND_URL}/auth/callback?accessToken=...&refreshToken=...`

#### Token Management

- **POST /refresh**
  - Body: `{ refreshToken }`
  - Returns: `{ accessToken, refreshToken }`
  - Issues new tokens, revokes old refresh token

- **POST /logout**
  - Body: `{ refreshToken }`
  - Revokes the refresh token

#### Protected Routes

- **GET /me**
  - Requires: `Authorization: Bearer {accessToken}` header
  - Returns: Current user profile

### Security Features

1. **Password Hashing**: bcrypt with 10 salt rounds
2. **JWT Tokens**: 
   - Access tokens: 1 hour expiry (configurable)
   - Refresh tokens: 7 days expiry (configurable)
3. **OTP Expiration**: 10 minutes
4. **Attempt Tracking**: Failed OTP attempts are logged
5. **Token Revocation**: Refresh tokens can be revoked
6. **OAuth State Management**: Secure Google OAuth flow

### Middleware

- **authenticate**: Verifies JWT access token, attaches user to `req.user`
- **authorize(...roles)**: Checks if user has required role(s)
- **optionalAuth**: Sets user if token present, but doesn't require it

## Frontend Integration

### Auth API Client

Location: `frontend/src/lib/auth-api.ts`

Functions:
- `registerWithEmail(email, password, name?)`
- `loginWithEmail(email, password)`
- `sendOTP(phoneNumber, purpose)`
- `verifyOTP(phoneNumber, code, purpose)`
- `refreshToken(refreshToken)`
- `logout(refreshToken)`
- `getCurrentUser(accessToken)`
- `initGoogleOAuth()` - Redirects to backend OAuth endpoint
- `storeAuthTokens(accessToken, refreshToken)` - Saves to localStorage
- `getStoredTokens()` - Retrieves from localStorage
- `clearAuthTokens()` - Removes from localStorage
- `isAuthenticated()` - Checks if user is logged in

### Pages

#### Sign In (`/login`)
- Email/password form with validation
- Google OAuth button
- Phone OTP login section
- Real-time error/success messages
- Auto-redirect to dashboard on success

#### Sign Up (`/register`)
- Email registration with password strength requirements
- Password confirmation
- Terms of service agreement
- Phone OTP registration
- Google OAuth signup

#### OAuth Callback (`/auth/callback`)
- Handles Google OAuth redirect
- Extracts tokens from URL
- Stores tokens in localStorage
- Redirects to dashboard

### Token Storage

Currently using `localStorage` for:
- `accessToken` - Short-lived JWT
- `refreshToken` - Long-lived JWT

**Future Enhancement**: Consider using httpOnly cookies for better security.

## Environment Setup

### Required Environment Variables

Backend (`.env`):

```env
# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-in-production
JWT_EXPIRY=1h
JWT_REFRESH_EXPIRY=7d

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:4000/api/v1/auth/google/callback

# Frontend URL
FRONTEND_URL=http://localhost:3000

# SMS Service (optional, for production)
# TWILIO_ACCOUNT_SID=your-twilio-account-sid
# TWILIO_AUTH_TOKEN=your-twilio-auth-token
# TWILIO_PHONE_NUMBER=+1234567890
```

Frontend (`.env.local`):

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
```

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:4000/api/v1/auth/google/callback`
6. Copy Client ID and Secret to `.env`

## Development Mode

### Mock SMS Service

In development, OTP codes are logged to the backend console instead of being sent via SMS:

```
[MOCK SMS] Sending to +11234567890: Your AppCortex verification code is: 123456. Valid for 10 minutes.
```

You can copy the code from console and paste it in the frontend.

### Production SMS Setup

For production, implement a real SMS service in `src/api/utils/otp.ts`:

```typescript
// Example with Twilio
const twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
await twilio.messages.create({
  body: message,
  from: process.env.TWILIO_PHONE_NUMBER,
  to: phoneNumber
});
```

## Testing the System

### 1. Start Backend

```bash
npm run api
```

Backend will start on `http://localhost:4000`

### 2. Start Frontend

```bash
cd frontend
npm run dev
```

Frontend will start on `http://localhost:3000`

### 3. Test Email Registration

1. Go to `http://localhost:3000/register`
2. Fill in email, password (must meet requirements), and name
3. Check "I agree to terms"
4. Click "Create Account"
5. Should redirect to `/dashboard` with tokens stored

### 4. Test Email Login

1. Go to `http://localhost:3000/login`
2. Enter same email and password
3. Click "Sign In"
4. Should redirect to `/dashboard`

### 5. Test Phone OTP

1. Go to `/register` or `/login`
2. Scroll to "Phone Number" section
3. Select country code and enter phone number
4. Click "Send OTP"
5. Check backend console for OTP code
6. Enter the 6-digit code
7. Click "Verify"
8. Should create account/login and redirect

### 6. Test Google OAuth (if configured)

1. Click "Continue with Google" button
2. Should redirect to Google sign-in
3. Select Google account
4. Should redirect back to `/auth/callback`
5. Should automatically redirect to `/dashboard`

## API Usage Examples

### Register

```bash
curl -X POST http://localhost:4000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "SecurePass123",
    "name": "Test User"
  }'
```

### Login

```bash
curl -X POST http://localhost:4000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "SecurePass123"
  }'
```

### Send OTP

```bash
curl -X POST http://localhost:4000/api/v1/auth/send-otp \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumber": "+11234567890",
    "purpose": "SIGNUP"
  }'
```

### Verify OTP

```bash
curl -X POST http://localhost:4000/api/v1/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumber": "+11234567890",
    "code": "123456",
    "purpose": "SIGNUP"
  }'
```

### Get Current User

```bash
curl http://localhost:4000/api/v1/auth/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Refresh Token

```bash
curl -X POST http://localhost:4000/api/v1/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "YOUR_REFRESH_TOKEN"
  }'
```

## Future Enhancements

1. **Email Verification**: Send verification email after registration
2. **Password Reset**: Forgot password flow with email link
3. **2FA**: Two-factor authentication with TOTP
4. **Social Logins**: Facebook, Apple, GitHub OAuth
5. **Account Linking**: Link multiple auth methods to one account
6. **Session Management**: View and revoke active sessions
7. **Security Logs**: Track login attempts, location, device
8. **Rate Limiting**: Prevent brute force attacks
9. **CAPTCHA**: Add CAPTCHA for registration/login
10. **Magic Links**: Passwordless email authentication

## Troubleshooting

### "No token provided" error
- Make sure you're including the `Authorization: Bearer {token}` header
- Check if token is stored in localStorage

### "Invalid or expired token" error
- Access token may have expired (1 hour lifetime)
- Use refresh token to get new access token
- If refresh token also expired, user needs to login again

### OTP not working
- Check backend console for the mock OTP code in development
- Ensure phone number format is correct (+countrycode + number)
- OTP expires after 10 minutes

### Google OAuth redirects to error page
- Check if GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are set
- Verify callback URL matches in Google Console
- Ensure FRONTEND_URL is set correctly

## Security Best Practices

1. **Never commit `.env` file** - It's in `.gitignore`
2. **Use strong JWT secrets** - Use long random strings in production
3. **Enable HTTPS in production** - Never send tokens over HTTP
4. **Implement rate limiting** - Prevent brute force attacks
5. **Rotate refresh tokens** - We already revoke old ones on refresh
6. **Monitor suspicious activity** - Log failed login attempts
7. **Use httpOnly cookies** - Consider switching from localStorage
8. **Implement CORS properly** - Restrict allowed origins in production

