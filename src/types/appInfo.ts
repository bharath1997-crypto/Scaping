export type AppInfo = {
  store: "GOOGLE_PLAY" | "APPLE_APP_STORE" | "SAMSUNG_GALAXY_STORE" | "HUAWEI_APP_GALLERY" | "XIAOMI_MI_STORE";
  appId: string;
  title: string;
  summary?: string;
  description?: string;
  url?: string;
  icon?: string;
  headerImage?: string;

  developer?: string;
  developerId?: string;
  developerEmail?: string;
  developerWebsite?: string;
  developerAddress?: string;

  genre?: string;
  genreId?: string;
  subGenre?: string;
  tags?: string[];

  score?: number;
  ratings?: bigint | null;
  reviews?: bigint | null;
  histogram?: Record<string, number>;
  star1Count?: bigint | null;
  star2Count?: bigint | null;
  star3Count?: bigint | null;
  star4Count?: bigint | null;
  star5Count?: bigint | null;

  installs?: string;
  minInstalls?: bigint | null;
  maxInstalls?: bigint | null;

  free?: boolean;
  price?: number;
  currency?: string;
  offersIAP?: boolean;
  IAPRange?: string;

  version?: string;
  realVersion?: string;
  released?: string;
  updated?: string;
  size?: string;
  androidVersion?: string;
  androidVersionText?: string;
  recentChanges?: string;

  adSupported?: boolean;
  containsAds?: boolean;
  contentRating?: string;
  contentRatingDescription?: string;
  privacyPolicy?: string;
  dataSafety?: any;

  screenshots?: string[];
  video?: string;

  country?: string;
  scrapeMode: "REAL_API" | "HTML_BACKUP" | "DUMMY_FALLBACK";
};

export type ReviewInfo = {
  reviewId?: string;
  rating: number; // 1-5
  reviewText?: string;
  reviewDate?: Date | null;
  reviewerName?: string;
  helpfulCount?: number;
  appVersion?: string;
  country?: string;
  developerReply?: string;
  developerReplyDate?: Date | null;
};

export type RankingInfo = {
  chartType: 'TOP_FREE' | 'TOP_PAID' | 'TOP_GROSSING' | 'TRENDING' | 'NEW_APPS' | 'CATEGORY_TOP_FREE' | 'CATEGORY_TOP_PAID' | 'CATEGORY_TOP_GROSSING';
  position: number;
  category?: string;
  country?: string;
};
