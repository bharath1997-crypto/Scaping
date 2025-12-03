/**
 * Data Transfer Objects (DTOs) for API responses
 * These define the exact shape of data returned to frontend/external consumers
 */

export type StoreType = "GOOGLE_PLAY" | "APPLE_APP_STORE" | "SAMSUNG_GALAXY_STORE" | "HUAWEI_APP_GALLERY" | "XIAOMI_MI_STORE";

/**
 * DTO for app list items (used in GET /api/v1/apps)
 */
export interface AppListItemDto {
  id: string;               // internal UUID or numeric id
  store: StoreType;
  appId: string;            // com.whatsapp or numeric id on iOS
  name: string;
  iconUrl: string | null;

  developerName: string | null;
  primaryCategory: string | null;

  country: string;          // region for ranking context (us, in, gb...)
  currentRank: number | null;
  chartType: string | null; // TOP_FREE, TOP_PAID, etc.

  score: number | null;     // 4.6
  ratingsCount: number | null; // 1_234_567

  price: number | null;
  currency: string | null;
  free: boolean;

  lastSeenAt: string;       // ISO date
}

/**
 * DTO for app details (used in GET /api/v1/apps/:store/:appId)
 */
export interface AppDetailDto {
  id: string;
  store: StoreType;
  appId: string;

  name: string;
  summary: string | null;
  description: string | null;
  iconUrl: string | null;
  headerImageUrl: string | null;
  screenshots: string[];

  developer: {
    name: string | null;
    id: string | null;
    website: string | null;
    email: string | null;
    address: string | null;
  };

  categories: {
    primary: string | null;
    primaryId: string | null;
    secondary?: string | null;
    secondaryId?: string | null;
  };

  score: number | null;
  ratingsCount: number | null;
  histogram: {
    star1: number | null;
    star2: number | null;
    star3: number | null;
    star4: number | null;
    star5: number | null;
  };

  installs: {
    text: string | null;      // "1M+"
    min: number | null;
    max: number | null;
  };

  pricing: {
    free: boolean;
    price: number | null;
    currency: string | null;
    offersIAP: boolean | null;
    iapRange: string | null;
  };

  technical: {
    version: string | null;
    releasedAt: string | null;
    updatedAt: string | null;
    size: string | null;
    platformVersion: string | null; // "Android 8.0+", "iOS 15+"
  };

  content: {
    rating: string | null;
    ratingDescription: string | null;
    privacyPolicyUrl: string | null;
    adSupported: boolean | null;
    containsAds: boolean | null;
  };

  meta: {
    country: string;
    firstSeenAt: string | null;
    lastSeenAt: string | null;
    isDelisted: boolean;
  };
}

/**
 * DTO for reviews analytics (used in GET /api/v1/apps/:store/:appId/reviews-analytics)
 */
export interface AppReviewsAnalyticsDto {
  store: StoreType;
  appId: string;
  country: string;

  score: number | null;
  ratingsCount: number | null;
  reviewsCount: number | null;

  histogram: {
    star1: number | null;
    star2: number | null;
    star3: number | null;
    star4: number | null;
    star5: number | null;
  };

  trends: {
    last7Days: {
      avgScore: number | null;
      newReviews: number | null;
    };
    last30Days: {
      avgScore: number | null;
      newReviews: number | null;
    };
  };

  recentReviews: Array<{
    id: string;
    author: string | null;
    score: number;
    title: string | null;
    text: string | null;
    version: string | null;
    thumbsUp: number | null;
    publishedAt: string | null;
    country: string | null;
  }>;
}

