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

type AppleRawApp = {
  id?: string | number;
  appId?: string;
  url?: string;
  title?: string;
  description?: string;
  subtitle?: string;
  icon?: string;
  price?: number;
  free?: boolean;
  currency?: string;
  genre?: string;
  genres?: string[];
  primaryGenre?: string;
  primaryGenreId?: number;
  score?: number;
  ratings?: number;
  reviews?: number;
  version?: string;
  released?: string;
  updated?: string;
  releaseNotes?: string;
  size?: string;
  developer?: string;
  developerId?: number | string;
  developerUrl?: string;
  contentRating?: string;
  screenshots?: string[];
  ipadScreenshots?: string[];
  appletvScreenshots?: string[];
  supportedDevices?: string[];
  languages?: string[];
};

/**
 * Maps raw Apple App Store scraper data to unified AppInfo format
 * All empty fields are filled with "not available" instead of null/undefined
 */
export function mapAppleToAppInfo(
  raw: AppleRawApp,
  context: { country: string; locale?: string }
): AppInfo {
  // Combine all screenshots (iPhone, iPad, Apple TV)
  const allScreenshots = [
    ...(raw.screenshots || []),
    ...(raw.ipadScreenshots || []),
    ...(raw.appletvScreenshots || []),
  ].filter(Boolean);

  return {
    store: "APPLE_APP_STORE",
    appId: normalizeString((raw.appId ?? raw.id ?? "").toString(), ""), // Required field
    title: normalizeString(raw.title, ""), // Required field
    summary: normalizeString(raw.subtitle),
    description: normalizeString(raw.description),
    url: normalizeOptionalString(raw.url),
    icon: normalizeOptionalString(raw.icon),
    headerImage: normalizeOptionalString(raw.screenshots?.[0]),
    screenshots: allScreenshots.length > 0 ? allScreenshots : undefined,
    video: undefined, // Apple App Store doesn't provide video URLs in scraper

    developer: normalizeString(raw.developer),
    developerId: normalizeString(raw.developerId?.toString()),
    developerWebsite: normalizeOptionalString(raw.developerUrl),
    developerEmail: NOT_AVAILABLE, // Apple doesn't expose developer email
    developerAddress: NOT_AVAILABLE, // Apple doesn't expose developer address

    genre: normalizeString(raw.primaryGenre || raw.genre),
    genreId: normalizeString(raw.primaryGenreId?.toString()),
    subGenre: normalizeString(raw.genre), // Use genre as subGenre if primaryGenre exists
    tags: Array.isArray(raw.genres) && raw.genres.length > 0 ? raw.genres : undefined,

    score: normalizeNumber(raw.score),
    ratings: normalizeBigInt(raw.ratings),
    reviews: normalizeBigInt(raw.reviews),
    histogram: undefined, // Apple doesn't provide histogram
    star1Count: null,
    star2Count: null,
    star3Count: null,
    star4Count: null,
    star5Count: null,

    installs: NOT_AVAILABLE, // Apple doesn't expose install counts
    minInstalls: null,
    maxInstalls: null,

    free: normalizeBoolean(raw.free),
    price: normalizeNumber(raw.price),
    currency: normalizeString(raw.currency),
    offersIAP: null, // Apple doesn't expose this in scraper
    IAPRange: NOT_AVAILABLE,

    version: normalizeString(raw.version),
    realVersion: normalizeString(raw.version),
    released: normalizeDate(raw.released),
    updated: normalizeDate(raw.updated),
    size: normalizeString(raw.size),
    androidVersion: NOT_AVAILABLE, // Not applicable for iOS
    androidVersionText: NOT_AVAILABLE, // Not applicable for iOS
    recentChanges: normalizeString(raw.releaseNotes),

    adSupported: null, // Apple doesn't expose this
    containsAds: null, // Apple doesn't expose this
    contentRating: normalizeString(raw.contentRating),
    contentRatingDescription: NOT_AVAILABLE, // Apple doesn't expose description
    privacyPolicy: NOT_AVAILABLE, // Apple doesn't expose privacy policy URL in scraper
    dataSafety: undefined, // Apple doesn't expose data safety info

    country: normalizeString(context.country, "us"),
    scrapeMode: (raw as any)._scrapeMode || "REAL_API",
  };
}


