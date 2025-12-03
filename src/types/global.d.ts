declare global {
  type AppInfo = {
    // Identity
    appId: string;
    title: string;
    summary?: string;
    description?: string;
    url?: string;
    icon?: string;
    headerImage?: string;
    screenshots?: string[];
    video?: string;

    // Developer / publisher
    developer?: string;
    developerId?: string;
    developerEmail?: string;
    developerWebsite?: string;
    developerAddress?: string;

    // Category / tags
    genre?: string;
    genreId?: string;
    tags?: string[];

    // Ratings / reviews
    score?: number;
    ratings?: number;
    reviews?: number;
    histogram?: Record<string, number>;

    // Installs / pricing
    installs?: string;
    minInstalls?: number;
    maxInstalls?: number;
    free?: boolean;
    price?: number;
    currency?: string;
    offersIAP?: boolean;
    IAPRange?: string;

    // Version / device info
    version?: string;
    realVersion?: string;
    updated?: Date | null;
    released?: Date | null;
    size?: string;
    androidVersion?: string;
    androidVersionText?: string;
    contentRating?: string;
    contentRatingDescription?: string;

    // Policy / misc
    privacyPolicy?: string;
    adSupported?: boolean;
    containsAds?: boolean;
    recentChanges?: string;

    // Extra
    country?: string;
  };
}

export {};


