import type { AppInfo } from "../../types/appInfo.ts";
import {
  normalizeString,
  normalizeOptionalString,
  normalizeBigInt,
  normalizeDate,
  normalizeBoolean,
  normalizeNumber,
  NOT_AVAILABLE,
} from "../../utils/fieldNormalizer.ts";

/**
 * Maps raw Google Play scraper data to unified AppInfo format
 * All empty fields are filled with "not available" instead of null/undefined
 */
export function mapGoogleToAppInfo(
  raw: any,
  context: { country: string; locale?: string }
): AppInfo {
  // Determine scrape mode from raw data metadata or default to REAL_API
  const scrapeMode: AppInfo["scrapeMode"] = 
    raw._scrapeMode || "REAL_API";

  return {
    store: "GOOGLE_PLAY",
    appId: normalizeString(raw.appId, ""), // appId is required, keep empty string if missing
    title: normalizeString(raw.title, ""), // title is required
    summary: normalizeString(raw.summary),
    description: normalizeString(raw.description),
    url: normalizeOptionalString(raw.url), // URLs can be optional
    icon: normalizeOptionalString(raw.icon), // URLs can be optional
    headerImage: normalizeOptionalString(raw.headerImage),
    screenshots: Array.isArray(raw.screenshots) && raw.screenshots.length > 0 ? raw.screenshots : undefined,
    video: normalizeOptionalString(raw.video),

    developer: normalizeString(raw.developer),
    developerId: normalizeString(raw.developerId),
    developerEmail: normalizeString(raw.developerEmail),
    developerWebsite: normalizeOptionalString(raw.developerWebsite),
    developerAddress: normalizeString(raw.developerAddress),

    genre: normalizeString(raw.genre),
    genreId: normalizeString(raw.genreId),
    subGenre: normalizeString(raw.subGenre),
    tags: Array.isArray(raw.tags) && raw.tags.length > 0 ? raw.tags : undefined,

    score: normalizeNumber(raw.score),
    ratings: normalizeBigInt(raw.ratings),
    reviews: normalizeBigInt(raw.reviews),
    histogram: raw.histogram && typeof raw.histogram === "object" ? raw.histogram : undefined,
    star1Count: normalizeBigInt(raw.histogram?.[1]),
    star2Count: normalizeBigInt(raw.histogram?.[2]),
    star3Count: normalizeBigInt(raw.histogram?.[3]),
    star4Count: normalizeBigInt(raw.histogram?.[4]),
    star5Count: normalizeBigInt(raw.histogram?.[5]),

    installs: normalizeString(raw.installs),
    minInstalls: normalizeBigInt(raw.minInstalls),
    maxInstalls: normalizeBigInt(raw.maxInstalls),

    free: normalizeBoolean(raw.free),
    price: normalizeNumber(raw.price),
    currency: normalizeString(raw.currency),
    offersIAP: normalizeBoolean(raw.offersIAP),
    IAPRange: normalizeString(raw.IAPRange),

    version: normalizeString(raw.version),
    realVersion: normalizeString(raw.realVersion),
    released: normalizeDate(raw.released),
    updated: normalizeDate(raw.updated),
    size: normalizeString(raw.size),
    androidVersion: normalizeString(raw.androidVersion),
    androidVersionText: normalizeString(raw.androidVersionText),
    recentChanges: normalizeString(raw.recentChanges),

    adSupported: normalizeBoolean(raw.adSupported),
    containsAds: normalizeBoolean(raw.containsAds),
    contentRating: normalizeString(raw.contentRating),
    contentRatingDescription: normalizeString(raw.contentRatingDescription),
    privacyPolicy: normalizeOptionalString(raw.privacyPolicy),
    dataSafety: raw.dataSafety && typeof raw.dataSafety === "object" ? raw.dataSafety : undefined,

    country: normalizeString(context.country, "us"),
    scrapeMode,
  };
}


