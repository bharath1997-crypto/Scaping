import type { AppInfo } from "../types/appInfo.ts";
import { Store, ScrapeMode } from "@prisma/client";

const toBigIntOrNull = (value?: bigint | number | null) => {
  if (value === undefined || value === null) return null;
  if (typeof value === "bigint") return value;
  try {
    return BigInt(Math.trunc(value));
  } catch {
    return null;
  }
};

/**
 * Builds a RawAppSnapshot row from AppInfo and context
 */
export function buildRawSnapshotRow(
  app: AppInfo,
  ctx: {
    country?: string;
    locale?: string;
    rank?: number;
    chartType?: string;
    category?: string | number; // Can be string or number (e.g., Apple category IDs like 6023)
    discoverySource?: string; // CHART, CATEGORY, SEARCH, SIMILAR, DEVELOPER
  }
) {
  // Determine discovery source from context
  let discoverySource: string | null = ctx.discoverySource || null;
  if (!discoverySource) {
    if (ctx.chartType) discoverySource = "CHART";
    else if (ctx.category) discoverySource = "CATEGORY";
    else discoverySource = "UNKNOWN";
  }

  // Ensure category is always a string or null (Prisma expects String?)
  const categoryValue = ctx.category || app.genre || null;
  const categoryString = categoryValue != null ? String(categoryValue) : null;

  return {
    store: app.store as Store,
    appId: app.appId,
    country: ctx.country || app.country || null,
    locale: ctx.locale || null,
    rank: ctx.rank || null,
    chartType: ctx.chartType || null,
    category: categoryString,
    discoverySource,
    payload: app as any, // Full AppInfo as JSON
    scrapeMode: app.scrapeMode as ScrapeMode,
    score: typeof app.score === "number" ? app.score : null,
    ratings: toBigIntOrNull(app.ratings),
    reviewCount: toBigIntOrNull(app.reviews),
    minInstalls: toBigIntOrNull(app.minInstalls),
    maxInstalls: toBigIntOrNull(app.maxInstalls),
    histogram: app.histogram || null,
  };
}
