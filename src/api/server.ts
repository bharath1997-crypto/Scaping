import "dotenv/config";
import express from "express";
import cors from "cors";
import passport from "passport";
import appsRoutes from "./routes/apps.routes.ts";
import authRoutes from "./routes/auth.routes.ts";
import dashboardRoutes from "./routes/dashboard.routes.ts";
import contactRoutes from "./routes/contact.routes.ts";
import searchRoutes from "./routes/search.routes.ts";
import alertsRoutes from "./routes/alerts.routes.ts";
import reportsRoutes from "./routes/reports.routes.ts";
import userRoutes from "./routes/user.routes.ts";

const app = express();
const PORT = process.env.PORT || 4000;

// ============================================================================
// Log Environment Variables at Startup (for debugging)
// ============================================================================
console.log("\n🔍 Loaded ENV:");
console.log("  PORT =", process.env.PORT);
console.log("  CORS_ORIGIN =", process.env.CORS_ORIGIN);
console.log("  FRONTEND_URL =", process.env.FRONTEND_URL);
console.log("  GOOGLE_CLIENT_ID =", process.env.GOOGLE_CLIENT_ID ? `${process.env.GOOGLE_CLIENT_ID.substring(0, 20)}...` : "❌ undefined");
console.log("  GOOGLE_CLIENT_SECRET =", process.env.GOOGLE_CLIENT_SECRET ? "✅ Set (hidden)" : "❌ undefined");
console.log("  GOOGLE_CALLBACK_URL =", process.env.GOOGLE_CALLBACK_URL);
console.log("  NODE_ENV =", process.env.NODE_ENV || "development");
console.log("");

// Middleware
// Parse CORS_ORIGIN - handle comma-separated origins or single origin
const corsOrigin = process.env.CORS_ORIGIN || "*";
const corsOrigins = corsOrigin.includes(",") 
  ? corsOrigin.split(",").map(origin => origin.trim())
  : corsOrigin;
app.use(cors({ origin: corsOrigins }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Passport
app.use(passport.initialize());

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ============================================================================
// Debug Route: Test Google OAuth without Passport (for troubleshooting)
// ============================================================================
app.get("/api/v1/auth/google-debug", (req, res) => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = process.env.GOOGLE_CALLBACK_URL || "http://localhost:4000/api/v1/auth/google/callback";

  if (!clientId) {
    return res.status(500).json({
      error: "GOOGLE_CLIENT_ID not set in environment",
      message: "Check your .env file",
    });
  }

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile",
    access_type: "offline",
    prompt: "consent",
  });

  console.log("🔍 [DEBUG] Redirecting to Google with client_id:", clientId);
  const url = "https://accounts.google.com/o/oauth2/v2/auth?" + params.toString();
  res.redirect(url);
});

// Mount API routes
app.use("/api/v1/apps", appsRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/contact", contactRoutes);
app.use("/api/v1/search", searchRoutes);
app.use("/api/v1/alerts", alertsRoutes);
app.use("/api/v1/reports", reportsRoutes);
app.use("/api/v1/user", userRoutes);

// ============================================================================
// Error Handling Middleware (must be last, after all routes)
// ============================================================================
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("❌ Unhandled error:", err);
  
  // Don't leak error details in production
  const isDevelopment = process.env.NODE_ENV !== "production";
  
  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
    ...(isDevelopment && { stack: err.stack }),
  });
});

// ============================================================================
// 404 Handler (must be after all routes)
// ============================================================================
app.use((req: express.Request, res: express.Response) => {
  res.status(404).json({
    message: "Route not found",
    path: req.path,
  });
});

// ============================================================================
// START SERVER
// ============================================================================

app.listen(PORT, () => {
  console.log("╔════════════════════════════════════════════════════════════╗");
  console.log("║           AppCortex API Server Started                     ║");
  console.log("╠════════════════════════════════════════════════════════════╣");
  console.log(`║  URL: http://localhost:${PORT}                                 ║`);
  console.log(`║  Health: http://localhost:${PORT}/health                       ║`);
  console.log("╠════════════════════════════════════════════════════════════╣");
  console.log("║  App Endpoints:                                           ║");
  console.log("║    GET /api/v1/apps                                       ║");
  console.log("║    GET /api/v1/apps/:store/:appId                         ║");
  console.log("║    GET /api/v1/apps/:store/:appId/reviews-analytics       ║");
  console.log("╠════════════════════════════════════════════════════════════╣");
  console.log("║  Auth Endpoints:                                          ║");
  console.log("║    POST /api/v1/auth/register                             ║");
  console.log("║    POST /api/v1/auth/login                                ║");
  console.log("║    POST /api/v1/auth/send-otp                             ║");
  console.log("║    POST /api/v1/auth/verify-otp                           ║");
  console.log("║    GET  /api/v1/auth/google                               ║");
  console.log("║    GET  /api/v1/auth/google-debug                         ║");
  console.log("║    GET  /api/v1/auth/test-google-config                   ║");
  console.log("║    GET  /api/v1/auth/me                                   ║");
  console.log("║    POST /api/v1/auth/refresh                              ║");
  console.log("║    POST /api/v1/auth/logout                               ║");
  console.log("╠════════════════════════════════════════════════════════════╣");
  console.log("║  Dashboard Endpoints:                                     ║");
  console.log("║    GET /api/v1/dashboard                                  ║");
  console.log("╠════════════════════════════════════════════════════════════╣");
  console.log("║  Contact Endpoints:                                       ║");
  console.log("║    POST /api/v1/contact                                   ║");
  console.log("╠════════════════════════════════════════════════════════════╣");
  console.log("║  Search Endpoints:                                        ║");
  console.log("║    GET /api/v1/search                                      ║");
  console.log("╠════════════════════════════════════════════════════════════╣");
  console.log("║  Alerts Endpoints:                                        ║");
  console.log("║    GET    /api/v1/alerts                                   ║");
  console.log("║    POST   /api/v1/alerts                                   ║");
  console.log("║    GET    /api/v1/alerts/:id                              ║");
  console.log("║    PUT    /api/v1/alerts/:id                              ║");
  console.log("║    DELETE /api/v1/alerts/:id                              ║");
  console.log("║    PATCH  /api/v1/alerts/:id/status                       ║");
  console.log("║    GET    /api/v1/alerts/history                          ║");
  console.log("╠════════════════════════════════════════════════════════════╣");
  console.log("║  Reports Endpoints:                                       ║");
  console.log("║    GET    /api/v1/reports                                  ║");
  console.log("║    POST   /api/v1/reports                                  ║");
  console.log("║    GET    /api/v1/reports/:id                              ║");
  console.log("║    DELETE /api/v1/reports/:id                              ║");
  console.log("║    GET    /api/v1/reports/:id/download                    ║");
  console.log("║    PATCH  /api/v1/reports/:id/schedule                     ║");
  console.log("╠════════════════════════════════════════════════════════════╣");
  console.log("║  User Endpoints:                                          ║");
  console.log("║    GET    /api/v1/user/profile                            ║");
  console.log("║    PUT    /api/v1/user/profile                            ║");
  console.log("║    POST   /api/v1/user/change-password                    ║");
  console.log("║    GET    /api/v1/user/api-keys                           ║");
  console.log("║    POST   /api/v1/user/api-keys                            ║");
  console.log("║    DELETE /api/v1/user/api-keys/:id                        ║");
  console.log("║    GET    /api/v1/user/notifications                      ║");
  console.log("║    PUT    /api/v1/user/notifications                      ║");
  console.log("║    GET    /api/v1/user/tracked-apps                       ║");
  console.log("╚════════════════════════════════════════════════════════════╝");
});

export default app;

