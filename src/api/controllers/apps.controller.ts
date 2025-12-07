import type { Request, Response } from "express";
import { AppsService } from "../services/apps.service.ts";
import type { Store } from "@prisma/client";

/**
 * Parse store parameter from request
 */
function parseStore(value?: string): Store | undefined {
  if (!value) return undefined;
  const v = value.toLowerCase();
  if (v === "google" || v === "google_play") return Store.GOOGLE_PLAY;
  if (v === "apple" || v === "ios" || v === "app_store" || v === "apple_app_store")
    return Store.APPLE_APP_STORE;
  if (v === "samsung" || v === "samsung_galaxy_store")
    return Store.SAMSUNG_GALAXY_STORE;
  if (v === "huawei" || v === "huawei_app_gallery")
    return Store.HUAWEI_APP_GALLERY;
  if (v === "xiaomi" || v === "mi" || v === "xiaomi_mi_store")
    return Store.XIAOMI_MI_STORE;
  return undefined;
}

/**
 * Controller layer - handles HTTP requests and responses
 */
export class AppsController {
  /**
   * GET /api/v1/apps
   * List apps with filtering, pagination, and sorting
   */
  static async listApps(req: Request, res: Response) {
    try {
      const {
        store: storeParam,
        country,
        category,
        search,
        q, // Alias for search
        page = "1",
        pageSize = "25",
        sortBy,
        sortDir,
      } = req.query;

      const store = parseStore(storeParam as string | undefined);

      const pageNum = Math.max(parseInt(page as string, 10) || 1, 1);
      const pageSizeNum = Math.min(
        Math.max(parseInt(pageSize as string, 10) || 25, 1),
        100
      );

      const result = await AppsService.listApps({
        store,
        country: (country as string | undefined)?.toLowerCase(),
        category: category as string | undefined,
        search: search as string | undefined,
        q: q as string | undefined,
        page: pageNum,
        pageSize: pageSizeNum,
        sortBy: (sortBy as any) ?? "rank",
        sortDir: (sortDir as "asc" | "desc") ?? "asc",
      });

      res.json({
        ok: true,
        data: result.items,
        pagination: {
          total: result.total,
          page: result.page,
          pageSize: result.pageSize,
          totalPages: Math.ceil(result.total / result.pageSize),
        },
      });
    } catch (err: any) {
      console.error("[AppsController.listApps] Error:", err);
      res.status(500).json({
        ok: false,
        error: "INTERNAL_ERROR",
        message: err?.message ?? "Unexpected error",
      });
    }
  }

  /**
   * GET /api/v1/apps/:store/:appId
   * Get detailed app information
   */
  static async getAppDetail(req: Request, res: Response) {
    try {
      const { store: storeParam, appId } = req.params;

      const store = parseStore(storeParam);
      if (!store) {
        return res.status(400).json({
          ok: false,
          error: "INVALID_STORE",
          message: `Invalid store: ${storeParam}. Valid values: google, apple, samsung, huawei, xiaomi`,
        });
      }

      const app = await AppsService.getAppDetail(store, appId);

      if (!app) {
        return res.status(404).json({
          ok: false,
          error: "APP_NOT_FOUND",
          message: `App not found: ${store}/${appId}`,
        });
      }

      res.json({
        ok: true,
        data: app,
      });
    } catch (err: any) {
      console.error("[AppsController.getAppDetail] Error:", err);
      res.status(500).json({
        ok: false,
        error: "INTERNAL_ERROR",
        message: err?.message ?? "Unexpected error",
      });
    }
  }

  /**
   * GET /api/v1/apps/:store/:appId/reviews-analytics
   * Get app reviews and analytics
   */
  static async getAppReviewsAnalytics(req: Request, res: Response) {
    try {
      const { store: storeParam, appId } = req.params;
      const { country } = req.query;

      const store = parseStore(storeParam);
      if (!store) {
        return res.status(400).json({
          ok: false,
          error: "INVALID_STORE",
          message: `Invalid store: ${storeParam}. Valid values: google, apple, samsung, huawei, xiaomi`,
        });
      }

      const analytics = await AppsService.getAppReviewsAnalytics(
        store,
        appId,
        country as string | undefined
      );

      if (!analytics) {
        return res.status(404).json({
          ok: false,
          error: "APP_NOT_FOUND",
          message: `App not found: ${store}/${appId}`,
        });
      }

      res.json({
        ok: true,
        data: analytics,
      });
    } catch (err: any) {
      console.error("[AppsController.getAppReviewsAnalytics] Error:", err);
      res.status(500).json({
        ok: false,
        error: "INTERNAL_ERROR",
        message: err?.message ?? "Unexpected error",
      });
    }
  }
}

