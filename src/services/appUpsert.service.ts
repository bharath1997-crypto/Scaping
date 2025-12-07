import { prisma } from "../utils/prisma.ts";
import type { AppInfo } from "../types/appInfo.ts";
import { Store } from "@prisma/client";

function clean<T extends Record<string, any>>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined && v !== null)
  ) as T;
}

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function toBigIntOrNull(v?: bigint | number | null) {
  if (v === undefined || v === null) return null;
  try {
    if (typeof v === "bigint") return v;
    return BigInt(Math.trunc(v));
  } catch {
    return null;
  }
}

function parseStars(hist?: Record<string, number>) {
  if (!hist) return {};
  return {
    star1Count: toBigIntOrNull(hist["1"]),
    star2Count: toBigIntOrNull(hist["2"]),
    star3Count: toBigIntOrNull(hist["3"]),
    star4Count: toBigIntOrNull(hist["4"]),
    star5Count: toBigIntOrNull(hist["5"]),
  };
}

/**
 * Calculate data quality status based on app data completeness
 */
function calculateDataQuality(app: AppInfo): "RAW" | "CLEANED" | "FLAGGED" {
  const issues: string[] = [];
  
  if (!app.icon) issues.push("MISSING_ICON");
  if (!app.score && (!app.ratings || app.ratings === BigInt(0))) issues.push("NO_RATINGS");
  if (!app.summary && !app.description) issues.push("MISSING_DESCRIPTION");
  if (!app.developer) issues.push("MISSING_DEVELOPER");
  
  if (issues.length >= 2) return "FLAGGED";
  if (issues.length === 1) return "CLEANED";
  return "RAW";
}

/**
 * Upsert App and create AppDailyStat snapshot
 */
export async function upsertAppAndDailyStat(
  app: AppInfo,
  ctx: { country?: string; rank?: number }
) {
  const store = app.store as Store;

  // 1) Get or create Developer
  const devName = (app.developer || "Unknown Developer").trim();
  const developer = await prisma.developer.upsert({
    where: { name: devName },
    update: {},
    create: { name: devName },
  });

  // 2) Get or create Category
  const catName = (app.genre || "Unknown Category").trim();
  const slug = slugify(catName);
  const category = await prisma.category.upsert({
    where: { store_slug: { store, slug } },
    update: {},
    create: { store, name: catName, slug },
  });

  // 3) Upsert App
  const baseData = clean({
    store,
    appId: app.appId,
    title: app.title,
    summary: app.summary,
    description: app.description,
    url: app.url,
    icon: app.icon,
    headerImage: app.headerImage,
    screenshots: app.screenshots ? JSON.stringify(app.screenshots) : undefined,
    video: app.video,

    developer: app.developer,
    developerId: app.developerId,
    developerEmail: app.developerEmail,
    developerWebsite: app.developerWebsite,
    developerAddress: app.developerAddress,
    developerRefId: developer.id,

    genre: app.genre,
    genreId: app.genreId,
    tags: app.tags ? JSON.stringify(app.tags) : undefined,
    categoryRefId: category.id,

    score: app.score,
    ratings: toBigIntOrNull(app.ratings),
    reviewCount: toBigIntOrNull(app.reviews),
    histogram: app.histogram ? JSON.stringify(app.histogram) : undefined,
    ...parseStars(app.histogram),

    installs: app.installs,
    minInstalls: toBigIntOrNull(app.minInstalls),
    maxInstalls: toBigIntOrNull(app.maxInstalls),
    free: app.free,
    price: app.price,
    currency: app.currency,
    offersIAP: app.offersIAP,
    IAPRange: app.IAPRange,

    version: app.version,
    realVersion: app.realVersion,
    updated: app.updated ? new Date(app.updated) : undefined,
    released: app.released ? new Date(app.released) : undefined,
    size: app.size,
    androidVersion: app.androidVersion,
    androidVersionText: app.androidVersionText,
    contentRating: app.contentRating,
    contentRatingDesc: app.contentRatingDescription,

    privacyPolicy: app.privacyPolicy,
    adSupported: app.adSupported,
    containsAds: app.containsAds,
    recentChanges: app.recentChanges,

    country: ctx.country || app.country,
    lastSeenAt: new Date(),
    dataQuality: calculateDataQuality(app),
  });

  // Check if app already exists to preserve firstSeenAt
  const existingApp = await prisma.app.findUnique({
    where: { store_appId: { store, appId: app.appId } },
    select: { id: true, firstSeenAt: true },
  });

  const appRow = await prisma.app.upsert({
    where: { store_appId: { store, appId: app.appId } },
    update: {
      ...baseData,
      // Preserve firstSeenAt on update
      firstSeenAt: existingApp?.firstSeenAt,
      // Always update lastSeenAt
      lastSeenAt: new Date(),
    },
    create: {
      ...baseData,
      // Set firstSeenAt only on create
      firstSeenAt: new Date(),
      lastSeenAt: new Date(),
    },
  });

  // 4) Upsert AppDailyStat snapshot (one per day per app)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const countryValue = ctx.country || app.country || "";

  await prisma.appDailyStat.upsert({
    where: {
      appIdRef_date_country: {
        appIdRef: appRow.id,
        date: today,
        country: countryValue,
      },
    },
    update: clean({
      score: app.score,
      ratings: toBigIntOrNull(app.ratings),
      reviewCount: toBigIntOrNull(app.reviews),
      installs: app.installs,
      minInstalls: toBigIntOrNull(app.minInstalls),
      maxInstalls: toBigIntOrNull(app.maxInstalls),
      histogram: app.histogram ? JSON.stringify(app.histogram) : undefined,
      ...parseStars(app.histogram),
      rank: ctx.rank,
    }),
    create: clean({
      appIdRef: appRow.id,
      date: today,
      score: app.score,
      ratings: toBigIntOrNull(app.ratings),
      reviewCount: toBigIntOrNull(app.reviews),
      installs: app.installs,
      minInstalls: toBigIntOrNull(app.minInstalls),
      maxInstalls: toBigIntOrNull(app.maxInstalls),
      histogram: app.histogram ? JSON.stringify(app.histogram) : undefined,
      ...parseStars(app.histogram),
      rank: ctx.rank,
      country: ctx.country || app.country,
    }),
  });

  return appRow;
}


