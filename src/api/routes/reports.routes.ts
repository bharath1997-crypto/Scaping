import { Router } from "express";
import * as reportsController from "../controllers/reports.controller.ts";
import { authenticate } from "../middleware/auth.middleware.ts";

const router = Router();

// All routes require authentication
router.use(authenticate);

/**
 * GET /api/v1/reports
 * Get all reports (optionally filtered by frequency)
 * Query params: frequency (once, daily, weekly, monthly)
 */
router.get("/", reportsController.getReports);

/**
 * POST /api/v1/reports
 * Create new report
 */
router.post("/", reportsController.createReport);

/**
 * GET /api/v1/reports/:id
 * Get single report
 */
router.get("/:id", reportsController.getReport);

/**
 * DELETE /api/v1/reports/:id
 * Delete report
 */
router.delete("/:id", reportsController.deleteReport);

/**
 * GET /api/v1/reports/:id/download
 * Download report file
 */
router.get("/:id/download", reportsController.downloadReport);

/**
 * PATCH /api/v1/reports/:id/schedule
 * Update report schedule
 */
router.patch("/:id/schedule", reportsController.updateReportSchedule);

export default router;

