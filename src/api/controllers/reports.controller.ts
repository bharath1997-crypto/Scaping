import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * GET /api/v1/reports
 * Get all reports
 */
export async function getReports(req: Request, res: Response) {
  try {
    const userId = req.authUser?.id;
    const frequency = req.query.frequency as string | undefined;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const where: any = { userId };
    if (frequency) {
      where.frequency = frequency;
    }

    const reports = await prisma.report.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    res.json({
      success: true,
      data: reports.map((report) => ({
        id: report.id,
        name: report.name,
        description: report.description || "",
        format: report.format,
        status: report.status,
        createdAt: report.createdAt.toISOString(),
        completedAt: report.completedAt?.toISOString(),
        downloadUrl: report.downloadUrl || undefined,
        fileSize: report.fileSize || undefined,
        modules: report.modules || [],
        apps: report.apps || [],
        frequency: report.frequency,
        nextRun: report.nextRun?.toISOString(),
      })),
    });
  } catch (error: any) {
    console.error("Get reports error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch reports",
    });
  }
}

/**
 * POST /api/v1/reports
 * Create new report
 */
export async function createReport(req: Request, res: Response) {
  try {
    const userId = req.authUser?.id;
    const { name, description, format, modules, appIds, frequency, scheduleDate } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // Validation
    if (!name || !format || !modules || !appIds || modules.length === 0 || appIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Get app names
    const apps = await prisma.app.findMany({
      where: {
        id: { in: appIds },
      },
      select: {
        name: true,
      },
    });

    const appNames = apps.map((app) => app.name || "Unknown");

    const report = await prisma.report.create({
      data: {
        userId,
        name,
        description: description || "",
        format,
        modules,
        apps: appNames,
        appIds,
        frequency: frequency || "once",
        status: "generating",
        nextRun: scheduleDate ? new Date(scheduleDate) : null,
      },
    });

    // TODO: Queue report generation job

    res.status(201).json({
      success: true,
      data: {
        id: report.id,
        name: report.name,
        description: report.description || "",
        format: report.format,
        status: report.status,
        createdAt: report.createdAt.toISOString(),
        modules: report.modules || [],
        apps: report.apps || [],
        frequency: report.frequency,
        nextRun: report.nextRun?.toISOString(),
      },
    });
  } catch (error: any) {
    console.error("Create report error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to create report",
    });
  }
}

/**
 * GET /api/v1/reports/:id
 * Get single report
 */
export async function getReport(req: Request, res: Response) {
  try {
    const userId = req.authUser?.id;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const report = await prisma.report.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    res.json({
      success: true,
      data: {
        id: report.id,
        name: report.name,
        description: report.description || "",
        format: report.format,
        status: report.status,
        createdAt: report.createdAt.toISOString(),
        completedAt: report.completedAt?.toISOString(),
        downloadUrl: report.downloadUrl || undefined,
        fileSize: report.fileSize || undefined,
        modules: report.modules || [],
        apps: report.apps || [],
        frequency: report.frequency,
        nextRun: report.nextRun?.toISOString(),
      },
    });
  } catch (error: any) {
    console.error("Get report error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch report",
    });
  }
}

/**
 * DELETE /api/v1/reports/:id
 * Delete report
 */
export async function deleteReport(req: Request, res: Response) {
  try {
    const userId = req.authUser?.id;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // Verify report belongs to user
    const report = await prisma.report.findFirst({
      where: { id, userId },
    });

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    await prisma.report.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: "Report deleted successfully",
    });
  } catch (error: any) {
    console.error("Delete report error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete report",
    });
  }
}

/**
 * GET /api/v1/reports/:id/download
 * Download report file
 */
export async function downloadReport(req: Request, res: Response) {
  try {
    const userId = req.authUser?.id;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const report = await prisma.report.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    if (report.status !== "ready" || !report.downloadUrl) {
      return res.status(400).json({
        success: false,
        message: "Report is not ready for download",
      });
    }

    // TODO: Stream file from storage (S3, local filesystem, etc.)
    // For now, return a mock response
    res.status(200).json({
      success: false,
      message: "File download not yet implemented. Please implement file storage.",
    });
  } catch (error: any) {
    console.error("Download report error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to download report",
    });
  }
}

/**
 * PATCH /api/v1/reports/:id/schedule
 * Update report schedule
 */
export async function updateReportSchedule(req: Request, res: Response) {
  try {
    const userId = req.authUser?.id;
    const { id } = req.params;
    const { frequency, scheduleDate } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // Verify report belongs to user
    const existingReport = await prisma.report.findFirst({
      where: { id, userId },
    });

    if (!existingReport) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    const report = await prisma.report.update({
      where: { id },
      data: {
        frequency: frequency || existingReport.frequency,
        nextRun: scheduleDate ? new Date(scheduleDate) : null,
      },
    });

    res.json({
      success: true,
      data: {
        id: report.id,
        name: report.name,
        description: report.description || "",
        format: report.format,
        status: report.status,
        createdAt: report.createdAt.toISOString(),
        completedAt: report.completedAt?.toISOString(),
        downloadUrl: report.downloadUrl || undefined,
        fileSize: report.fileSize || undefined,
        modules: report.modules || [],
        apps: report.apps || [],
        frequency: report.frequency,
        nextRun: report.nextRun?.toISOString(),
      },
    });
  } catch (error: any) {
    console.error("Update report schedule error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update report schedule",
    });
  }
}

