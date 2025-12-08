import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * GET /api/v1/dashboard
 * Get dashboard data (stats, recent apps, insights, activity)
 * Query params: timeRange (7d, 30d, 90d)
 */
export async function getDashboard(req: Request, res: Response) {
  try {
    const userId = req.authUser?.id;
    const timeRange = (req.query.timeRange as string) || "7d";

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // Calculate date range
    const now = new Date();
    let startDate: Date;
    switch (timeRange) {
      case "30d":
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case "90d":
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    }

    // Get user's tracked apps
    const trackedApps = await prisma.trackedApp.findMany({
      where: { userId },
      include: {
        app: true,
      },
      orderBy: { createdAt: "desc" },
      take: 10,
    });

    // Calculate stats
    const appsTracked = trackedApps.length;
    
    // Calculate average downloads (mock for now - replace with real data)
    const avgDownloads = trackedApps.length > 0
      ? Math.floor(Math.random() * 1000000).toLocaleString()
      : "0";

    // Mock sentiment score (replace with real calculation)
    const sentimentScore = Math.floor(Math.random() * 40) + 60; // 60-100

    // Mock trending categories (replace with real calculation)
    const trendingCategories = Math.floor(Math.random() * 5) + 1;

    // Recent apps
    const recentApps = trackedApps.slice(0, 5).map((ta) => ({
      id: ta.appId,
      name: ta.app.name || "Unknown App",
      category: ta.app.category || "Unknown",
      downloads: avgDownloads,
      trend: Math.random() > 0.5 ? ("up" as const) : ("down" as const),
      change: `${Math.floor(Math.random() * 20)}%`,
    }));

    // Mock insights (replace with real AI insights)
    const insights = [
      {
        id: "1",
        type: "opportunity" as const,
        title: "New competitor detected",
        description: "A new app in your category is gaining traction",
        date: new Date().toISOString(),
        confidence: 85,
      },
      {
        id: "2",
        type: "alert" as const,
        title: "Rating dropped",
        description: "One of your tracked apps saw a rating decrease",
        date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        confidence: 92,
      },
    ];

    // Mock recent activity (replace with real activity log)
    const recentActivity = [
      {
        id: "1",
        action: "Tracked new app",
        app: recentApps[0]?.name || "Unknown",
        time: new Date().toISOString(),
      },
      {
        id: "2",
        action: "Generated report",
        app: "All apps",
        time: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
      },
    ];

    res.json({
      success: true,
      data: {
        stats: {
          appsTracked,
          avgDownloads,
          sentimentScore,
          trendingCategories,
        },
        recentApps,
        insights,
        recentActivity,
      },
    });
  } catch (error: any) {
    console.error("Dashboard error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch dashboard data",
    });
  }
}

