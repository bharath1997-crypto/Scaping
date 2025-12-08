import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { hashPassword, verifyPassword } from "../utils/password.ts";
import crypto from "crypto";

const prisma = new PrismaClient();

/**
 * GET /api/v1/user/profile
 * Get user profile
 */
export async function getProfile(req: Request, res: Response) {
  try {
    const userId = req.authUser?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        company: true,
        role: true,
        timezone: true,
        language: true,
        plan: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        name: user.name || "",
        company: user.company || "",
        role: user.role || "",
        timezone: user.timezone || "America/Los_Angeles",
        language: user.language || "en",
        plan: user.plan || "free",
        createdAt: user.createdAt.toISOString(),
      },
    });
  } catch (error: any) {
    console.error("Get profile error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch profile",
    });
  }
}

/**
 * PUT /api/v1/user/profile
 * Update user profile
 */
export async function updateProfile(req: Request, res: Response) {
  try {
    const userId = req.authUser?.id;
    const { name, email, company, role, timezone, language } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;
    if (company !== undefined) updateData.company = company;
    if (role !== undefined) updateData.role = role;
    if (timezone !== undefined) updateData.timezone = timezone;
    if (language !== undefined) updateData.language = language;

    const user = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        company: true,
        role: true,
        timezone: true,
        language: true,
        plan: true,
        createdAt: true,
      },
    });

    res.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        name: user.name || "",
        company: user.company || "",
        role: user.role || "",
        timezone: user.timezone || "America/Los_Angeles",
        language: user.language || "en",
        plan: user.plan || "free",
        createdAt: user.createdAt.toISOString(),
      },
    });
  } catch (error: any) {
    console.error("Update profile error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update profile",
    });
  }
}

/**
 * POST /api/v1/user/change-password
 * Change password
 */
export async function changePassword(req: Request, res: Response) {
  try {
    const userId = req.authUser?.id;
    const { currentPassword, newPassword } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Current password and new password are required",
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 8 characters",
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { password: true },
    });

    if (!user || !user.password) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Verify current password
    const isValid = await verifyPassword(currentPassword, user.password);
    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    res.json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error: any) {
    console.error("Change password error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to change password",
    });
  }
}

/**
 * GET /api/v1/user/api-keys
 * Get API keys
 */
export async function getAPIKeys(req: Request, res: Response) {
  try {
    const userId = req.authUser?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const apiKeys = await prisma.apiKey.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    res.json({
      success: true,
      data: apiKeys.map((key) => ({
        id: key.id,
        name: key.name,
        key: key.key, // Note: In production, only show key once on creation
        created: key.createdAt.toISOString(),
        lastUsed: key.lastUsed?.toISOString() || key.createdAt.toISOString(),
        calls: key.calls || 0,
      })),
    });
  } catch (error: any) {
    console.error("Get API keys error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch API keys",
    });
  }
}

/**
 * POST /api/v1/user/api-keys
 * Create API key
 */
export async function createAPIKey(req: Request, res: Response) {
  try {
    const userId = req.authUser?.id;
    const { name } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "API key name is required",
      });
    }

    // Generate API key
    const apiKey = `ac_${crypto.randomBytes(32).toString("hex")}`;

    const key = await prisma.apiKey.create({
      data: {
        userId,
        name: name.trim(),
        key: apiKey,
        calls: 0,
      },
    });

    res.status(201).json({
      success: true,
      data: {
        id: key.id,
        name: key.name,
        key: key.key, // Show key only on creation
        created: key.createdAt.toISOString(),
        lastUsed: key.createdAt.toISOString(),
        calls: 0,
      },
    });
  } catch (error: any) {
    console.error("Create API key error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to create API key",
    });
  }
}

/**
 * DELETE /api/v1/user/api-keys/:id
 * Delete API key
 */
export async function deleteAPIKey(req: Request, res: Response) {
  try {
    const userId = req.authUser?.id;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // Verify API key belongs to user
    const apiKey = await prisma.apiKey.findFirst({
      where: { id, userId },
    });

    if (!apiKey) {
      return res.status(404).json({
        success: false,
        message: "API key not found",
      });
    }

    await prisma.apiKey.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: "API key deleted successfully",
    });
  } catch (error: any) {
    console.error("Delete API key error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete API key",
    });
  }
}

/**
 * GET /api/v1/user/notifications
 * Get notification preferences
 */
export async function getNotificationPreferences(req: Request, res: Response) {
  try {
    const userId = req.authUser?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        notificationPreferences: true,
      },
    });

    // Default preferences
    const defaults = {
      emailAlerts: true,
      emailWeeklyDigest: true,
      emailReportReady: true,
      emailMarketing: false,
      pushBrowser: false,
      pushMobile: false,
    };

    const preferences = user?.notificationPreferences
      ? { ...defaults, ...(user.notificationPreferences as any) }
      : defaults;

    res.json({
      success: true,
      data: preferences,
    });
  } catch (error: any) {
    console.error("Get notification preferences error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch notification preferences",
    });
  }
}

/**
 * PUT /api/v1/user/notifications
 * Update notification preferences
 */
export async function updateNotificationPreferences(req: Request, res: Response) {
  try {
    const userId = req.authUser?.id;
    const preferences = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        notificationPreferences: preferences,
      },
    });

    res.json({
      success: true,
      data: preferences,
    });
  } catch (error: any) {
    console.error("Update notification preferences error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update notification preferences",
    });
  }
}

/**
 * GET /api/v1/user/tracked-apps
 * Get user's tracked apps
 */
export async function getTrackedApps(req: Request, res: Response) {
  try {
    const userId = req.authUser?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const trackedApps = await prisma.trackedApp.findMany({
      where: { userId },
      include: {
        app: {
          select: {
            id: true,
            name: true,
            icon: true,
            store: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    res.json({
      success: true,
      data: trackedApps.map((ta) => ({
        id: ta.app.id,
        name: ta.app.name || "Unknown",
        icon: ta.app.icon || "",
        store: ta.app.store || "",
      })),
    });
  } catch (error: any) {
    console.error("Get tracked apps error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch tracked apps",
    });
  }
}

