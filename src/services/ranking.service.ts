import { prisma } from "../utils/prisma.ts";
import type { AppInfo } from "../types/appInfo.ts";
import { ChartType } from "@prisma/client";

/**
 * Save ranking for an app
 */
export async function saveRanking(
  app: AppInfo,
  ctx: {
    country?: string;
    chartType: string;
    rank?: number;
  }
) {
  if (!ctx.rank) return;

  // Find the app in database
  const appRow = await prisma.app.findUnique({
    where: {
      store_appId: {
        store: app.store as any,
        appId: app.appId,
      },
    },
  });

  if (!appRow) {
    console.warn(`App not found for ranking: ${app.appId}`);
    return;
  }

  // Map chartType string to ChartType enum
  // Category-based charts should use CATEGORY_TOP_FREE, CATEGORY_TOP_PAID, etc.
  let chartTypeEnum: ChartType;
  let categoryValue: string | null = null;
  
  const chartTypeUpper = ctx.chartType.toUpperCase();
  
  // Debug: Log chartType to help diagnose issues
  if (!chartTypeUpper.match(/^(TOP_FREE|TOP_PAID|TOP_GROSSING|TRENDING|NEW_APPS|CATEGORY)/)) {
    console.warn(`[saveRanking] Unexpected chartType format: ${ctx.chartType}`);
  }
  
  if (chartTypeUpper.includes("CATEGORY")) {
    // Determine the base chart type (TOP_FREE, TOP_PAID, TOP_GROSSING)
    if (chartTypeUpper.includes("TOP_PAID")) {
      chartTypeEnum = ChartType.CATEGORY_TOP_PAID;
    } else if (chartTypeUpper.includes("TOP_GROSSING")) {
      chartTypeEnum = ChartType.CATEGORY_TOP_GROSSING;
    } else {
      // Default to CATEGORY_TOP_FREE for category charts
      chartTypeEnum = ChartType.CATEGORY_TOP_FREE;
    }
    
    // Extract category name from chartType
    // Handle formats like:
    // - "CATEGORY_TOP_FREE_FINANCE" -> "FINANCE"
    // - "CATEGORY_FINANCE" -> "FINANCE"
    // - "CATEGORY_TOP_FREE_ART_AND_DESIGN" -> "ART_AND_DESIGN"
    let extractedCategory: string | null = null;
    
    // Try to match "CATEGORY_TOP_FREE_CATEGORYNAME" or "CATEGORY_TOP_PAID_CATEGORYNAME" etc.
    const fullMatch = chartTypeUpper.match(/CATEGORY_(?:TOP_FREE|TOP_PAID|TOP_GROSSING)_(.+)/);
    if (fullMatch) {
      extractedCategory = fullMatch[1];
    } else {
      // Try to match "CATEGORY_CATEGORYNAME"
      const simpleMatch = chartTypeUpper.match(/CATEGORY_(.+)/);
      if (simpleMatch) {
        extractedCategory = simpleMatch[1];
      }
    }
    
    // Use extracted category, or fall back to app.genre, or use "not available"
    categoryValue = extractedCategory || app.genre || null;
  } else {
    // Regular chart types (not category-based)
    if (chartTypeUpper === "TOP_FREE") {
      chartTypeEnum = ChartType.TOP_FREE;
    } else if (chartTypeUpper === "TOP_PAID") {
      chartTypeEnum = ChartType.TOP_PAID;
    } else if (chartTypeUpper === "TOP_GROSSING") {
      chartTypeEnum = ChartType.TOP_GROSSING;
    } else if (chartTypeUpper === "TRENDING") {
      chartTypeEnum = ChartType.TRENDING;
    } else if (chartTypeUpper === "NEW_APPS") {
      chartTypeEnum = ChartType.NEW_APPS;
    } else {
      console.warn(`[saveRanking] Unknown chartType: ${ctx.chartType}, defaulting to TOP_FREE`);
      chartTypeEnum = ChartType.TOP_FREE;
    }
    categoryValue = null; // No category for regular charts
  }
  
  const country = ctx.country || "us";
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize to start of day

  await prisma.appRanking.upsert({
    where: {
      appIdRef_chartType_category_country_date: {
        appIdRef: appRow.id,
        chartType: chartTypeEnum,
        category: categoryValue || "",
        country: country || "",
        date: today,
      },
    },
    update: {
      position: ctx.rank,
    },
    create: {
      appIdRef: appRow.id,
      chartType: chartTypeEnum,
      position: ctx.rank,
      category: categoryValue || null,
      country: country || null,
      date: today,
    },
  });
}


