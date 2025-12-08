import { Router } from "express";
import * as searchController from "../controllers/search.controller.ts";
import { authenticate } from "../middleware/auth.middleware.ts";

const router = Router();

/**
 * GET /api/v1/search
 * Search apps with filters and pagination
 * Query params: q, category, stores, page, pageSize, sortBy, minInstalls, maxInstalls, minRating, country
 */
router.get("/", authenticate, searchController.searchApps);

export default router;

