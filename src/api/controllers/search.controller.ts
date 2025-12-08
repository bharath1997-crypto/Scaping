import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * GET /api/v1/search
 * Search apps with filters and pagination
 */
export async function searchApps(req: Request, res: Response) {
  try {
    const userId = req.authUser?.id;
    const {
      q = "",
      category,
      stores,
      page = "1",
      pageSize = "20",
      sortBy = "relevance",
      minInstalls,
      maxInstalls,
      minRating,
      country,
    } = req.query;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const pageNum = parseInt(page as string, 10);
    const pageSizeNum = parseInt(pageSize as string, 10);
    const skip = (pageNum - 1) * pageSizeNum;

    // Build where clause
    const where: any = {};

    // Search query
    if (q) {
      where.OR = [
        { name: { contains: q as string, mode: "insensitive" } },
        { developer: { contains: q as string, mode: "insensitive" } },
        { description: { contains: q as string, mode: "insensitive" } },
      ];
    }

    // Category filter
    if (category && category !== "all") {
      where.category = category;
    }

    // Store filter
    if (stores) {
      const storeArray = (stores as string).split(",");
      where.store = { in: storeArray };
    }

    // Downloads range
    if (minInstalls) {
      where.installs = { ...where.installs, gte: parseInt(minInstalls as string, 10) };
    }
    if (maxInstalls) {
      where.installs = { ...where.installs, lte: parseInt(maxInstalls as string, 10) };
    }

    // Rating filter
    if (minRating) {
      where.rating = { gte: parseFloat(minRating as string) };
    }

    // Country filter (for country-specific data)
    // Note: This might require a separate table for country-specific app data

    // Build orderBy
    let orderBy: any = {};
    switch (sortBy) {
      case "downloads":
        orderBy = { installs: "desc" };
        break;
      case "rating":
        orderBy = { rating: "desc" };
        break;
      case "newest":
        orderBy = { createdAt: "desc" };
        break;
      case "trending":
        // Mock trending - replace with real trending calculation
        orderBy = { updatedAt: "desc" };
        break;
      default:
        // Relevance - default to rating + installs
        orderBy = [{ rating: "desc" }, { installs: "desc" }];
    }

    // Execute query
    const [apps, total] = await Promise.all([
      prisma.app.findMany({
        where,
        orderBy,
        skip,
        take: pageSizeNum,
        select: {
          id: true,
          appId: true,
          store: true,
          name: true,
          developer: true,
          category: true,
          icon: true,
          rating: true,
          installs: true,
          price: true,
          updatedAt: true,
        },
      }),
      prisma.app.count({ where }),
    ]);

    const totalPages = Math.ceil(total / pageSizeNum);

    res.json({
      success: true,
      data: {
        apps: apps.map((app) => ({
          id: app.id,
          appId: app.appId,
          store: app.store,
          name: app.name || "Unknown",
          developer: app.developer || "Unknown",
          category: app.category || "Unknown",
          icon: app.icon || "",
          rating: app.rating || 0,
          installs: app.installs?.toString() || "0",
          price: app.price || "Free",
          updatedAt: app.updatedAt.toISOString(),
        })),
        total,
        page: pageNum,
        pageSize: pageSizeNum,
        totalPages,
      },
    });
  } catch (error: any) {
    console.error("Search error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to search apps",
    });
  }
}

