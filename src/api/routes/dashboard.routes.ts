import { Router } from "express";
import * as dashboardController from "../controllers/dashboard.controller.ts";
import { authenticate } from "../middleware/auth.middleware.ts";

const router = Router();

/**
 * GET /api/v1/dashboard
 * Get dashboard data (stats, recent apps, insights, activity)
 * Query params: timeRange (7d, 30d, 90d)
 */
router.get("/", authenticate, dashboardController.getDashboard);

export default router;

