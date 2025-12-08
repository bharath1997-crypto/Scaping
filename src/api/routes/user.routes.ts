import { Router } from "express";
import * as userController from "../controllers/user.controller.ts";
import { authenticate } from "../middleware/auth.middleware.ts";

const router = Router();

// All routes require authentication
router.use(authenticate);

/**
 * GET /api/v1/user/profile
 * Get user profile
 */
router.get("/profile", userController.getProfile);

/**
 * PUT /api/v1/user/profile
 * Update user profile
 */
router.put("/profile", userController.updateProfile);

/**
 * POST /api/v1/user/change-password
 * Change password
 */
router.post("/change-password", userController.changePassword);

/**
 * GET /api/v1/user/api-keys
 * Get API keys
 */
router.get("/api-keys", userController.getAPIKeys);

/**
 * POST /api/v1/user/api-keys
 * Create API key
 */
router.post("/api-keys", userController.createAPIKey);

/**
 * DELETE /api/v1/user/api-keys/:id
 * Delete API key
 */
router.delete("/api-keys/:id", userController.deleteAPIKey);

/**
 * GET /api/v1/user/notifications
 * Get notification preferences
 */
router.get("/notifications", userController.getNotificationPreferences);

/**
 * PUT /api/v1/user/notifications
 * Update notification preferences
 */
router.put("/notifications", userController.updateNotificationPreferences);

/**
 * GET /api/v1/user/tracked-apps
 * Get user's tracked apps
 */
router.get("/tracked-apps", userController.getTrackedApps);

export default router;

