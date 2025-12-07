import { Router } from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import * as authController from "../controllers/auth.controller.ts";
import { authenticate } from "../middleware/auth.middleware.ts";
import * as authService from "../services/auth.service.ts";

const router = Router();

// ============================================================================
// Configure Google OAuth Strategy
// ============================================================================
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL || "http://localhost:4000/api/v1/auth/google/callback";

// Debug logging to verify env variables are loaded
console.log("🔍 Google OAuth Configuration Check:");
console.log("  GOOGLE_CLIENT_ID from env =", GOOGLE_CLIENT_ID ? `${GOOGLE_CLIENT_ID.substring(0, 20)}...` : "❌ undefined");
console.log("  GOOGLE_CLIENT_SECRET from env =", GOOGLE_CLIENT_SECRET ? "✅ Set (hidden)" : "❌ undefined");
console.log("  GOOGLE_CALLBACK_URL from env =", GOOGLE_CALLBACK_URL);

if (GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET) {
  console.log("✅ Google OAuth configured successfully");
  
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: GOOGLE_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const authResponse = await authService.handleGoogleOAuth(profile);
          done(null, authResponse);
        } catch (error) {
          done(error as Error, undefined);
        }
      }
    )
  );
} else {
  console.warn("⚠️  Google OAuth not configured. Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env");
}

// ============================================================================
// Email/Password Authentication Routes
// ============================================================================

/**
 * POST /api/v1/auth/register
 * Register with email and password
 */
router.post("/register", authController.register);

/**
 * POST /api/v1/auth/login
 * Login with email and password
 */
router.post("/login", authController.login);

// ============================================================================
// Phone/OTP Authentication Routes
// ============================================================================

/**
 * POST /api/v1/auth/send-otp
 * Send OTP to phone number
 * Body: { phoneNumber: string, purpose?: "SIGNUP" | "LOGIN" | "VERIFY_PHONE" }
 */
router.post("/send-otp", authController.sendOTP);

/**
 * POST /api/v1/auth/verify-otp
 * Verify OTP and login/register
 * Body: { phoneNumber: string, code: string, purpose?: string }
 */
router.post("/verify-otp", authController.verifyOTP);

// ============================================================================
// Google OAuth Routes (only register if credentials are configured)
// ============================================================================

if (GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET) {
  /**
   * GET /api/v1/auth/google
   * Initiate Google OAuth flow
   */
  router.get(
    "/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
      session: false,
    })
  );

  /**
   * GET /api/v1/auth/google/callback
   * Google OAuth callback
   */
  router.get(
    "/google/callback",
    passport.authenticate("google", { session: false, failureRedirect: "/login?error=auth_failed" }),
    (req, res) => {
      try {
        const authResponse = req.user as any;

        // In production, redirect to frontend with tokens in URL params (or use httpOnly cookies)
        const frontendURL = process.env.FRONTEND_URL || "http://localhost:3000";
        const redirectURL = `${frontendURL}/auth/callback?accessToken=${authResponse.accessToken}&refreshToken=${authResponse.refreshToken}`;

        res.redirect(redirectURL);
      } catch (error) {
        res.redirect("/login?error=auth_failed");
      }
    }
  );
} else {
  /**
   * GET /api/v1/auth/google
   * Google OAuth not configured - redirect to frontend with error
   */
  router.get("/google", (req, res) => {
    const frontendURL = process.env.FRONTEND_URL || "http://localhost:3000";
    res.redirect(`${frontendURL}/login?error=google_oauth_not_configured`);
  });

  /**
   * GET /api/v1/auth/google/callback
   * Google OAuth callback - not configured
   */
  router.get("/google/callback", (req, res) => {
    const frontendURL = process.env.FRONTEND_URL || "http://localhost:3000";
    res.redirect(`${frontendURL}/login?error=google_oauth_not_configured`);
  });
}

// ============================================================================
// Token Management Routes
// ============================================================================

/**
 * POST /api/v1/auth/refresh
 * Refresh access token
 * Body: { refreshToken: string }
 */
router.post("/refresh", authController.refresh);

/**
 * POST /api/v1/auth/logout
 * Logout and revoke refresh token
 * Body: { refreshToken: string }
 */
router.post("/logout", authController.logout);

// ============================================================================
// Protected Routes
// ============================================================================

/**
 * GET /api/v1/auth/me
 * Get current user profile (requires authentication)
 */
router.get("/me", authenticate, authController.getMe);

// ============================================================================
// Debug/Test Routes
// ============================================================================

/**
 * GET /api/v1/auth/test-google-config
 * Test endpoint to verify Google OAuth configuration
 */
router.get("/test-google-config", (req, res) => {
  const clientId = process.env.GOOGLE_CLIENT_ID || "";
  const callbackUrl = process.env.GOOGLE_CALLBACK_URL || "http://localhost:4000/api/v1/auth/google/callback";
  
  // Build test Google OAuth URL
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: callbackUrl,
    response_type: "code",
    scope: "openid email profile",
    access_type: "offline",
    prompt: "consent",
  });
  
  const testUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  
  res.json({
    success: true,
    config: {
      clientId: clientId ? `${clientId.substring(0, 20)}...` : "❌ Not set",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ? "✅ Set" : "❌ Not set",
      callbackUrl,
      isConfigured: !!(clientId && process.env.GOOGLE_CLIENT_SECRET),
    },
    testUrl,
    instructions: {
      step1: "Copy the testUrl above",
      step2: "Paste it in your browser",
      step3: "If Google shows consent screen → credentials are correct",
      step4: "If Google shows 'invalid_client' → check client_id matches Google Console",
    },
  });
});

export default router;

