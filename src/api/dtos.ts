import type {
  App,
  AppDailyStat,
  AppRanking,
  Category,
  Developer,
  Review,
  Store,
} from "@prisma/client";

const formatBigInt = (value?: bigint | null) =>
  value === null || value === undefined ? null : value.toString();

export type AppListItemDTO = {
  seqId: number;
  store: Store;
  appId: string;
  title: string;
  summary?: string | null;
  icon?: string | null;
  developer: string;
  category: string;
  score?: number | null;
  ratings?: string | null;
  installs?: string | null;
  country?: string | null;
  lastUpdated?: string | null;
};

export const mapAppToListItem = (
  app: App & {
    developerRef: Pick<Developer, "name"> | null;
    categoryRef: Pick<Category, "name"> | null;
  }
): AppListItemDTO => ({
  seqId: app.seqId,
  store: app.store,
  appId: app.appId,
  title: app.title,
  summary: app.summary,
  icon: app.icon,
  developer: app.developerRef?.name || app.developer || "Unknown Developer",
  category: app.categoryRef?.name || app.genre || "Unknown Category",
  score: app.score,
  ratings: formatBigInt(app.ratings),
  installs: app.installs,
  country: app.country,
  lastUpdated: (app.updated ?? app.updatedAt)?.toISOString?.() ?? null,
});

export type AppDetailDTO = {
  app: {
    store: Store;
    appId: string;
    title: string;
    summary?: string | null;
    description?: string | null;
    icon?: string | null;
    headerImage?: string | null;
    screenshots?: string[];
    url?: string | null;
  };
  developer: {
    name: string;
    website?: string | null;
    email?: string | null;
  };
  category: string;
  stats: {
    score?: number | null;
    ratings?: string | null;
    reviews?: string | null;
    histogram?: Record<string, number> | null;
    lastUpdated?: string | null;
  };
  installs?: {
    display?: string | null;
    min?: string | null;
    max?: string | null;
  };
  monetization: {
    free?: boolean | null;
    price?: number | null;
    currency?: string | null;
    containsAds?: boolean | null;
    offersIAP?: boolean | null;
    IAPRange?: string | null;
  };
  rankings: Array<{
    chartType: string;
    country?: string | null;
    date: string;
    position: number;
  }>;
  dailyStats: Array<{
    date: string;
    score?: number | null;
    ratings?: string | null;
    reviews?: string | null;
    rank?: number | null;
    country?: string | null;
  }>;
};

type AppDetailRecord = Pick<
  App,
  | "store"
  | "appId"
  | "title"
  | "summary"
  | "description"
  | "icon"
  | "headerImage"
  | "screenshots"
  | "url"
  | "developer"
  | "developerWebsite"
  | "developerEmail"
  | "genre"
  | "score"
  | "ratings"
  | "reviewCount"
  | "histogram"
  | "updated"
  | "updatedAt"
  | "installs"
  | "minInstalls"
  | "maxInstalls"
  | "free"
  | "price"
  | "currency"
  | "containsAds"
  | "offersIAP"
  | "IAPRange"
> & {
  developerRef: Pick<Developer, "name"> | null;
  categoryRef: Pick<Category, "name"> | null;
  dailyStats: Pick<AppDailyStat, "date" | "score" | "ratings" | "reviewCount" | "rank" | "country">[];
  rankings: Pick<AppRanking, "chartType" | "country" | "date" | "position">[];
};

export const mapAppToDetail = (app: AppDetailRecord): AppDetailDTO => ({
  app: {
    store: app.store,
    appId: app.appId,
    title: app.title,
    summary: app.summary,
    description: app.description,
    icon: app.icon,
    headerImage: app.headerImage,
    screenshots: Array.isArray(app.screenshots)
      ? (app.screenshots as unknown as string[])
      : undefined,
    url: app.url,
  },
  developer: {
    name: app.developerRef?.name || app.developer || "Unknown Developer",
    website: app.developerWebsite || null,
    email: app.developerEmail || null,
  },
  category: app.categoryRef?.name || app.genre || "Unknown Category",
  stats: {
    score: app.score,
    ratings: formatBigInt(app.ratings),
    reviews: formatBigInt(app.reviewCount),
    histogram: (app.histogram as unknown as Record<string, number>) || null,
    lastUpdated: (app.updated ?? app.updatedAt)?.toISOString?.() ?? null,
  },
  installs: {
    display: app.installs,
    min: formatBigInt(app.minInstalls),
    max: formatBigInt(app.maxInstalls),
  },
  monetization: {
    free: app.free,
    price: app.price,
    currency: app.currency,
    containsAds: app.containsAds,
    offersIAP: app.offersIAP,
    IAPRange: app.IAPRange,
  },
  rankings: app.rankings.map((rank) => ({
    chartType: rank.chartType,
    country: rank.country,
    date: rank.date.toISOString(),
    position: rank.position,
  })),
  dailyStats: app.dailyStats.map((stat) => ({
    date: stat.date.toISOString(),
    score: stat.score,
    ratings: formatBigInt(stat.ratings),
    reviews: formatBigInt(stat.reviewCount),
    rank: stat.rank,
    country: stat.country,
  })),
});

export type ReviewAnalyticsDTO = {
  app: {
    store: Store;
    appId: string;
    title: string;
    score?: number | null;
    ratings?: string | null;
    reviews?: string | null;
    histogram?: Record<string, number> | null;
  };
  dailyStats: Array<{
    date: string;
    score?: number | null;
    ratings?: string | null;
    reviews?: string | null;
  }>;
  recentReviews: Array<{
    reviewId?: string | null;
    rating: number;
    reviewText?: string | null;
    reviewDate?: string | null;
    reviewerName?: string | null;
    helpfulCount?: string | null;
    developerReply?: string | null;
    developerReplyDate?: string | null;
  }>;
  insights: {
    topKeywords: string[];
    topComplaints: string[];
    topPraises: string[];
    featureRequests: string[];
    sentimentScore?: number | null;
    volatilityScore?: number | null;
    developerResponseRate?: number | null;
    developerAvgReplyTimeHours?: number | null;
    trustFlags: string[];
  };
};

export const buildReviewAnalytics = (params: {
  app: Pick<App, "store" | "appId" | "title" | "score" | "ratings" | "reviewCount" | "histogram">;
  dailyStats: Pick<AppDailyStat, "date" | "score" | "ratings" | "reviewCount">[];
  reviews: Pick<
    Review,
    | "reviewId"
    | "rating"
    | "reviewText"
    | "reviewDate"
    | "reviewerName"
    | "helpfulCount"
    | "developerReply"
    | "developerReplyDate"
  >[];
}): ReviewAnalyticsDTO => ({
  app: {
    store: params.app.store,
    appId: params.app.appId,
    title: params.app.title,
    score: params.app.score,
    ratings: formatBigInt(params.app.ratings),
    reviews: formatBigInt(params.app.reviewCount),
    histogram: (params.app.histogram as unknown as Record<string, number>) || null,
  },
  dailyStats: params.dailyStats.map((stat) => ({
    date: stat.date.toISOString(),
    score: stat.score,
    ratings: formatBigInt(stat.ratings),
    reviews: formatBigInt(stat.reviewCount),
  })),
  recentReviews: params.reviews.map((review) => ({
    reviewId: review.reviewId,
    rating: review.rating,
    reviewText: review.reviewText,
    reviewDate: review.reviewDate?.toISOString() ?? null,
    reviewerName: review.reviewerName,
    helpfulCount: formatBigInt(review.helpfulCount),
    developerReply: review.developerReply,
    developerReplyDate: review.developerReplyDate?.toISOString() ?? null,
  })),
  insights: {
    topKeywords: [],
    topComplaints: [],
    topPraises: [],
    featureRequests: [],
    sentimentScore: null,
    volatilityScore: null,
    developerResponseRate: null,
    developerAvgReplyTimeHours: null,
    trustFlags: [],
  },
});


