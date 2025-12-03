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
 * Maps raw Xiaomi Mi Store (GetApps) data to unified AppInfo format
 */
export function mapXiaomiToAppInfo(
  raw: any,
  context: { country: string; locale?: string }
): AppInfo {
  const scrapeMode: AppInfo["scrapeMode"] = raw._scrapeMode || "REAL_API";

  return {
    store: "XIAOMI_MI_STORE",
    appId: normalizeString(raw.appId || raw.id || raw.packageName, ""),
    title: normalizeString(raw.title || raw.name, ""),
    summary: normalizeString(raw.summary || raw.shortDescription),
    description: normalizeString(raw.description || raw.longDescription),
    url: normalizeOptionalString(raw.url || raw.storeUrl),
    icon: normalizeOptionalString(raw.icon || raw.iconUrl),
    headerImage: normalizeOptionalString(raw.headerImage || raw.featureGraphic),
    screenshots: Array.isArray(raw.screenshots) && raw.screenshots.length > 0 ? raw.screenshots : undefined,
    video: normalizeOptionalString(raw.video || raw.promoVideo),

    developer: normalizeString(raw.developer || raw.developerName),
    developerId: normalizeString(raw.developerId),
    developerEmail: normalizeString(raw.developerEmail),
    developerWebsite: normalizeOptionalString(raw.developerWebsite || raw.developerUrl),
    developerAddress: normalizeString(raw.developerAddress),

    genre: normalizeString(raw.genre || raw.category),
    genreId: normalizeString(raw.genreId || raw.categoryId),
    subGenre: normalizeString(raw.subGenre),
    tags: Array.isArray(raw.tags) && raw.tags.length > 0 ? raw.tags : undefined,

    score: normalizeNumber(raw.score || raw.rating || raw.averageRating),
    ratings: normalizeBigInt(raw.ratings || raw.ratingCount),
    reviews: normalizeBigInt(raw.reviews || raw.reviewCount),
    histogram: raw.histogram && typeof raw.histogram === "object" ? raw.histogram : undefined,
    star1Count: normalizeBigInt(raw.histogram?.[1] || raw.star1Count),
    star2Count: normalizeBigInt(raw.histogram?.[2] || raw.star2Count),
    star3Count: normalizeBigInt(raw.histogram?.[3] || raw.star3Count),
    star4Count: normalizeBigInt(raw.histogram?.[4] || raw.star4Count),
    star5Count: normalizeBigInt(raw.histogram?.[5] || raw.star5Count),

    installs: normalizeString(raw.installs || raw.installCount),
    minInstalls: normalizeBigInt(raw.minInstalls),
    maxInstalls: normalizeBigInt(raw.maxInstalls),

    free: normalizeBoolean(raw.free !== undefined ? raw.free : raw.price === 0 || !raw.price),
    price: normalizeNumber(raw.price),
    currency: normalizeString(raw.currency),
    offersIAP: normalizeBoolean(raw.offersIAP || raw.hasInAppPurchases),
    IAPRange: normalizeString(raw.IAPRange),

    version: normalizeString(raw.version || raw.versionName),
    realVersion: normalizeString(raw.realVersion || raw.version),
    released: normalizeDate(raw.released || raw.releaseDate),
    updated: normalizeDate(raw.updated || raw.updateDate),
    size: normalizeString(raw.size || raw.fileSize),
    androidVersion: normalizeString(raw.androidVersion),
    androidVersionText: normalizeString(raw.androidVersionText),
    recentChanges: normalizeString(raw.recentChanges || raw.whatsNew),

    adSupported: normalizeBoolean(raw.adSupported),
    containsAds: normalizeBoolean(raw.containsAds),
    contentRating: normalizeString(raw.contentRating || raw.ageRating),
    contentRatingDescription: normalizeString(raw.contentRatingDescription),
    privacyPolicy: normalizeOptionalString(raw.privacyPolicy),
    dataSafety: raw.dataSafety && typeof raw.dataSafety === "object" ? raw.dataSafety : undefined,

    country: normalizeString(context.country, "us"),
    scrapeMode,
  };
}

