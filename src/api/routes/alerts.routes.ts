import { Router } from "express";
import * as alertsController from "../controllers/alerts.controller.ts";
import { authenticate } from "../middleware/auth.middleware.ts";

const router = Router();

// All routes require authentication
router.use(authenticate);

/**
 * GET /api/v1/alerts
 * Get all alerts (optionally filtered by status)
 * Query params: status (active, paused, triggered, archived)
 */
router.get("/", alertsController.getAlerts);

/**
 * POST /api/v1/alerts
 * Create new alert
 */
router.post("/", alertsController.createAlert);

/**
 * GET /api/v1/alerts/history
 * Get alert trigger history
 * Query params: alertId (optional)
 */
router.get("/history", alertsController.getAlertHistory);

/**
 * GET /api/v1/alerts/:id
 * Get single alert
 */
router.get("/:id", alertsController.getAlert);

/**
 * PUT /api/v1/alerts/:id
 * Update alert
 */
router.put("/:id", alertsController.updateAlert);

/**
 * DELETE /api/v1/alerts/:id
 * Delete alert
 */
router.delete("/:id", alertsController.deleteAlert);

/**
 * PATCH /api/v1/alerts/:id/status
 * Update alert status (pause/resume)
 */
router.patch("/:id/status", alertsController.updateAlertStatus);

export default router;

