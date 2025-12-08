import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * GET /api/v1/alerts
 * Get all alerts
 */
export async function getAlerts(req: Request, res: Response) {
  try {
    const userId = req.authUser?.id;
    const status = req.query.status as string | undefined;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const where: any = { userId };
    if (status) {
      where.status = status;
    }

    const alerts = await prisma.alert.findMany({
      where,
      include: {
        app: {
          select: {
            name: true,
            icon: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    res.json({
      success: true,
      data: alerts.map((alert) => ({
        id: alert.id,
        name: alert.name,
        appId: alert.appId,
        appName: alert.app?.name || "Unknown",
        appIcon: alert.app?.icon || "",
        metric: alert.metric,
        condition: alert.condition,
        threshold: alert.threshold,
        frequency: alert.frequency,
        status: alert.status,
        createdAt: alert.createdAt.toISOString(),
        lastTriggered: alert.lastTriggered?.toISOString(),
        triggerCount: alert.triggerCount || 0,
        notifications: alert.notifications || [],
      })),
    });
  } catch (error: any) {
    console.error("Get alerts error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch alerts",
    });
  }
}

/**
 * POST /api/v1/alerts
 * Create new alert
 */
export async function createAlert(req: Request, res: Response) {
  try {
    const userId = req.authUser?.id;
    const { name, appId, metric, condition, threshold, frequency, notifications } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // Validation
    if (!name || !appId || !metric || !condition || !threshold) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Verify app exists
    const app = await prisma.app.findUnique({
      where: { id: appId },
    });

    if (!app) {
      return res.status(404).json({
        success: false,
        message: "App not found",
      });
    }

    const alert = await prisma.alert.create({
      data: {
        userId,
        name,
        appId,
        metric,
        condition,
        threshold,
        frequency: frequency || "daily",
        status: "active",
        notifications: notifications || ["email"],
        triggerCount: 0,
      },
      include: {
        app: {
          select: {
            name: true,
            icon: true,
          },
        },
      },
    });

    res.status(201).json({
      success: true,
      data: {
        id: alert.id,
        name: alert.name,
        appId: alert.appId,
        appName: alert.app?.name || "Unknown",
        appIcon: alert.app?.icon || "",
        metric: alert.metric,
        condition: alert.condition,
        threshold: alert.threshold,
        frequency: alert.frequency,
        status: alert.status,
        createdAt: alert.createdAt.toISOString(),
        triggerCount: 0,
        notifications: alert.notifications || [],
      },
    });
  } catch (error: any) {
    console.error("Create alert error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to create alert",
    });
  }
}

/**
 * GET /api/v1/alerts/:id
 * Get single alert
 */
export async function getAlert(req: Request, res: Response) {
  try {
    const userId = req.authUser?.id;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const alert = await prisma.alert.findFirst({
      where: {
        id,
        userId,
      },
      include: {
        app: {
          select: {
            name: true,
            icon: true,
          },
        },
      },
    });

    if (!alert) {
      return res.status(404).json({
        success: false,
        message: "Alert not found",
      });
    }

    res.json({
      success: true,
      data: {
        id: alert.id,
        name: alert.name,
        appId: alert.appId,
        appName: alert.app?.name || "Unknown",
        appIcon: alert.app?.icon || "",
        metric: alert.metric,
        condition: alert.condition,
        threshold: alert.threshold,
        frequency: alert.frequency,
        status: alert.status,
        createdAt: alert.createdAt.toISOString(),
        lastTriggered: alert.lastTriggered?.toISOString(),
        triggerCount: alert.triggerCount || 0,
        notifications: alert.notifications || [],
      },
    });
  } catch (error: any) {
    console.error("Get alert error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch alert",
    });
  }
}

/**
 * PUT /api/v1/alerts/:id
 * Update alert
 */
export async function updateAlert(req: Request, res: Response) {
  try {
    const userId = req.authUser?.id;
    const { id } = req.params;
    const updates = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // Verify alert belongs to user
    const existingAlert = await prisma.alert.findFirst({
      where: { id, userId },
    });

    if (!existingAlert) {
      return res.status(404).json({
        success: false,
        message: "Alert not found",
      });
    }

    const alert = await prisma.alert.update({
      where: { id },
      data: updates,
      include: {
        app: {
          select: {
            name: true,
            icon: true,
          },
        },
      },
    });

    res.json({
      success: true,
      data: {
        id: alert.id,
        name: alert.name,
        appId: alert.appId,
        appName: alert.app?.name || "Unknown",
        appIcon: alert.app?.icon || "",
        metric: alert.metric,
        condition: alert.condition,
        threshold: alert.threshold,
        frequency: alert.frequency,
        status: alert.status,
        createdAt: alert.createdAt.toISOString(),
        lastTriggered: alert.lastTriggered?.toISOString(),
        triggerCount: alert.triggerCount || 0,
        notifications: alert.notifications || [],
      },
    });
  } catch (error: any) {
    console.error("Update alert error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update alert",
    });
  }
}

/**
 * DELETE /api/v1/alerts/:id
 * Delete alert
 */
export async function deleteAlert(req: Request, res: Response) {
  try {
    const userId = req.authUser?.id;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // Verify alert belongs to user
    const alert = await prisma.alert.findFirst({
      where: { id, userId },
    });

    if (!alert) {
      return res.status(404).json({
        success: false,
        message: "Alert not found",
      });
    }

    await prisma.alert.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: "Alert deleted successfully",
    });
  } catch (error: any) {
    console.error("Delete alert error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete alert",
    });
  }
}

/**
 * PATCH /api/v1/alerts/:id/status
 * Update alert status
 */
export async function updateAlertStatus(req: Request, res: Response) {
  try {
    const userId = req.authUser?.id;
    const { id } = req.params;
    const { status } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (!status || !["active", "paused"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Must be 'active' or 'paused'",
      });
    }

    // Verify alert belongs to user
    const existingAlert = await prisma.alert.findFirst({
      where: { id, userId },
    });

    if (!existingAlert) {
      return res.status(404).json({
        success: false,
        message: "Alert not found",
      });
    }

    const alert = await prisma.alert.update({
      where: { id },
      data: { status },
      include: {
        app: {
          select: {
            name: true,
            icon: true,
          },
        },
      },
    });

    res.json({
      success: true,
      data: {
        id: alert.id,
        name: alert.name,
        appId: alert.appId,
        appName: alert.app?.name || "Unknown",
        appIcon: alert.app?.icon || "",
        metric: alert.metric,
        condition: alert.condition,
        threshold: alert.threshold,
        frequency: alert.frequency,
        status: alert.status,
        createdAt: alert.createdAt.toISOString(),
        lastTriggered: alert.lastTriggered?.toISOString(),
        triggerCount: alert.triggerCount || 0,
        notifications: alert.notifications || [],
      },
    });
  } catch (error: any) {
    console.error("Update alert status error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update alert status",
    });
  }
}

/**
 * GET /api/v1/alerts/history
 * Get alert trigger history
 */
export async function getAlertHistory(req: Request, res: Response) {
  try {
    const userId = req.authUser?.id;
    const alertId = req.query.alertId as string | undefined;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const where: any = {
      alert: {
        userId,
      },
    };

    if (alertId) {
      where.alertId = alertId;
    }

    const history = await prisma.alertHistory.findMany({
      where,
      include: {
        alert: {
          select: {
            name: true,
          },
        },
      },
      orderBy: { triggeredAt: "desc" },
      take: 100,
    });

    res.json({
      success: true,
      data: history.map((h) => ({
        id: h.id,
        alertId: h.alertId,
        alertName: h.alert?.name || "Unknown",
        triggeredAt: h.triggeredAt.toISOString(),
        message: h.message || "Alert triggered",
        value: h.value || "",
      })),
    });
  } catch (error: any) {
    console.error("Get alert history error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch alert history",
    });
  }
}

