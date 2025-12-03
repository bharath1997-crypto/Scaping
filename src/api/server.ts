import "dotenv/config";
import express from "express";
import cors from "cors";
import appsRoutes from "./routes/apps.routes.ts";

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Mount API routes
app.use("/api/v1/apps", appsRoutes);

// TODO: Add other routes later
// app.use("/api/v1/rankings", rankingsRoutes);
// app.use("/api/v1/search", searchRoutes);

// ============================================
// START SERVER
// ============================================

app.listen(PORT, () => {
  console.log("╔════════════════════════════════════════════════════════════╗");
  console.log("║           AppCortex API Server Started                     ║");
  console.log("╠════════════════════════════════════════════════════════════╣");
  console.log(`║  URL: http://localhost:${PORT}                                 ║`);
  console.log(`║  Health: http://localhost:${PORT}/health                       ║`);
  console.log("╠════════════════════════════════════════════════════════════╣");
  console.log("║  Core Endpoints:                                          ║");
  console.log("║    GET /api/v1/apps                                       ║");
  console.log("║    GET /api/v1/apps/:store/:appId                         ║");
  console.log("║    GET /api/v1/apps/:store/:appId/reviews-analytics       ║");
  console.log("╚════════════════════════════════════════════════════════════╝");
});

export default app;

