import express from "express";
import { AppsController } from "../controllers/apps.controller.ts";

const { Router } = express;

const router = Router();

/**
 * GET /api/v1/apps
 * List apps with filtering, pagination, and sorting
 * Query params: store, country, category, search, page, pageSize, sort
 */
router.get("/", AppsController.listApps);

/**
 * GET /api/v1/apps/:store/:appId
 * Get detailed app information
 */
router.get("/:store/:appId", AppsController.getAppDetail);

/**
 * GET /api/v1/apps/:store/:appId/reviews-analytics
 * Get app reviews and analytics
 */
router.get("/:store/:appId/reviews-analytics", AppsController.getAppReviewsAnalytics);

export default router;

