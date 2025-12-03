import { prisma } from "../../utils/prisma.ts";
import type { AppListItemDto, AppDetailDto, AppReviewsAnalyticsDto } from "../dtos/app.dto.ts";
import { Store } from "@prisma/client";

interface ListAppsParams {
  store?: Store;
  country?: string;
  category?: string;
  search?: string;
  q?: string; // Alias for search
  page: number;
  pageSize: number;
  sortBy?: "rank" | "score" | "ratings" | "installs" | "name" | "updated";
  sortDir?: "asc" | "desc";
}

/**
 * Service layer for app-related database operations
 * No HTTP logic here - pure data access
 */
export class AppsService {
  /**
   * List apps with filtering, pagination, and sorting
   */
  static async listApps(params: ListAppsParams): Promise<{
    items: AppListItemDto[];
    total: number;
    page: number;
    pageSize: number;
  }> {
    const {
      store,
      country,
      category,
      search,
      q, // Alias for search
      page,
      pageSize,
      sortBy = "rank",
      sortDir = "asc",
    } = params;

    const skip = (page - 1) * pageSize;
    const take = pageSize;

    // Build where clause
    const where: any = {};

    if (store) where.store = store;
    if (country) where.country = country.toLowerCase();
    
    // Category filter - check both genre and categoryRef
    if (category) {
      where.OR = [
        { genre: { contains: category, mode: "insensitive" } },
        { genreId: { contains: category, mode: "insensitive" } },
        { categoryRef: { name: { contains: category, mode: "insensitive" } } },
        { categoryRef: { slug: { contains: category, mode: "insensitive" } } },
      ];
    }
    
    // Search filter - support both 'search' and 'q' parameters
    const searchQuery = search || q;
    if (searchQuery) {
      where.OR = [
        { title: { contains: searchQuery, mode: "insensitive" } },
        { developer: { contains: searchQuery, mode: "insensitive" } },
        { summary: { contains: searchQuery, mode: "insensitive" } },
        { appId: { contains: searchQuery, mode: "insensitive" } },
      ];
    }

    // Build orderBy clause
    const orderBy: any = {};
    const direction = sortDir === "desc" ? "desc" : "asc";
    
    if (sortBy === "rank") {
      // Sort by latest ranking position (will be sorted after fetch)
      orderBy.rankings = { _count: direction };
    } else if (sortBy === "score") {
      orderBy.score = direction;
    } else if (sortBy === "ratings") {
      orderBy.ratings = direction;
    } else if (sortBy === "installs") {
      orderBy.minInstalls = direction;
    } else if (sortBy === "name") {
      orderBy.title = direction;
    } else if (sortBy === "updated") {
      orderBy.lastSeenAt = direction;
    } else {
      // Default: rank ascending
      orderBy.rankings = { _count: "asc" };
    }

    const [total, rows] = await Promise.all([
      prisma.app.count({ where }),
      prisma.app.findMany({
        where,
        orderBy,
        skip,
        take,
        include: {
          developerRef: {
            select: { name: true },
          },
          categoryRef: {
            select: { name: true },
          },
          rankings: {
            orderBy: { date: "desc" },
            take: 1,
            select: {
              position: true,
              chartType: true,
              country: true,
            },
          },
        },
      }),
    ]);

    // Map to DTOs
    let items: AppListItemDto[] = rows.map((row) => {
      const latestRanking = row.rankings[0] || null;

      return {
        id: row.id,
        store: row.store as any,
        appId: row.appId,
        name: row.title,
        iconUrl: row.icon,

        developerName: row.developerRef?.name ?? row.developer ?? null,
        primaryCategory: row.categoryRef?.name ?? row.genre ?? null,

        country: row.country ?? country ?? "us",
        currentRank: latestRanking?.position ?? null,
        chartType: latestRanking?.chartType ?? null,

        score: row.score,
        ratingsCount: row.ratings ? Number(row.ratings) : null,

        price: row.price,
        currency: row.currency,
        free: row.free ?? true,

        lastSeenAt: row.lastSeenAt?.toISOString() ?? row.updatedAt.toISOString(),
      };
    });

    // Post-process sorting for rank (sort by actual ranking position)
    if (sortBy === "rank") {
      items.sort((a, b) => {
        const rankA = a.currentRank ?? 999999;
        const rankB = b.currentRank ?? 999999;
        return sortDir === "desc" ? rankB - rankA : rankA - rankB;
      });
    }

    return {
      items,
      total,
      page,
      pageSize,
    };
  }

  /**
   * Get detailed app information
   */
  static async getAppDetail(store: Store, appId: string): Promise<AppDetailDto | null> {
    const app = await prisma.app.findUnique({
      where: {
        store_appId: {
          store,
          appId,
        },
      },
      include: {
        developerRef: {
          select: {
            id: true,
            name: true,
          },
        },
        categoryRef: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!app) {
      return null;
    }

    // Parse histogram
    const histogram = (app.histogram as any) || {};
    const screenshots = Array.isArray(app.screenshots)
      ? (app.screenshots as string[])
      : [];

    return {
      id: app.id,
      store: app.store as any,
      appId: app.appId,

      name: app.title,
      summary: app.summary,
      description: app.description,
      iconUrl: app.icon,
      headerImageUrl: app.headerImage,
      screenshots,

      developer: {
        name: app.developerRef?.name ?? app.developer ?? null,
        id: app.developerRef?.id ?? app.developerId ?? null,
        website: app.developerWebsite,
        email: app.developerEmail,
        address: app.developerAddress,
      },

      categories: {
        primary: app.categoryRef?.name ?? app.genre ?? null,
        primaryId: app.categoryRef?.id ?? app.genreId ?? null,
      },

      score: app.score,
      ratingsCount: app.ratings ? Number(app.ratings) : null,
      histogram: {
        star1: app.star1Count ? Number(app.star1Count) : histogram[1] || null,
        star2: app.star2Count ? Number(app.star2Count) : histogram[2] || null,
        star3: app.star3Count ? Number(app.star3Count) : histogram[3] || null,
        star4: app.star4Count ? Number(app.star4Count) : histogram[4] || null,
        star5: app.star5Count ? Number(app.star5Count) : histogram[5] || null,
      },

      installs: {
        text: app.installs,
        min: app.minInstalls ? Number(app.minInstalls) : null,
        max: app.maxInstalls ? Number(app.maxInstalls) : null,
      },

      pricing: {
        free: app.free ?? true,
        price: app.price,
        currency: app.currency,
        offersIAP: app.offersIAP,
        iapRange: app.IAPRange,
      },

      technical: {
        version: app.version ?? app.realVersion,
        releasedAt: app.released?.toISOString() ?? null,
        updatedAt: app.updated?.toISOString() ?? app.updatedAt.toISOString(),
        size: app.size,
        platformVersion: app.androidVersionText ?? app.androidVersion,
      },

      content: {
        rating: app.contentRating,
        ratingDescription: app.contentRatingDesc,
        privacyPolicyUrl: app.privacyPolicy,
        adSupported: app.adSupported,
        containsAds: app.containsAds,
      },

      meta: {
        country: app.country ?? "us",
        firstSeenAt: app.firstSeenAt.toISOString(),
        lastSeenAt: app.lastSeenAt.toISOString(),
        isDelisted: app.isDelisted,
      },
    };
  }

  /**
   * Get app reviews analytics
   */
  static async getAppReviewsAnalytics(
    store: Store,
    appId: string,
    country?: string
  ): Promise<AppReviewsAnalyticsDto | null> {
    const app = await prisma.app.findUnique({
      where: {
        store_appId: {
          store,
          appId,
        },
      },
      select: {
        id: true,
        store: true,
        appId: true,
        country: true,
        score: true,
        ratings: true,
        reviewCount: true,
        histogram: true,
        star1Count: true,
        star2Count: true,
        star3Count: true,
        star4Count: true,
        star5Count: true,
      },
    });

    if (!app) {
      return null;
    }

    const appCountry = country ?? app.country ?? "us";
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // Get daily stats for trends
    const [dailyStats, recentReviews] = await Promise.all([
      prisma.appDailyStat.findMany({
        where: {
          appIdRef: app.id,
          date: { gte: thirtyDaysAgo },
          country: appCountry,
        },
        orderBy: { date: "desc" },
        select: {
          date: true,
          score: true,
          reviewCount: true,
        },
      }),
      prisma.review.findMany({
        where: {
          appIdRef: app.id,
          country: appCountry,
        },
        orderBy: { reviewDate: "desc" },
        take: 100,
        select: {
          id: true,
          reviewId: true,
          rating: true,
          reviewText: true,
          reviewDate: true,
          reviewerName: true,
          helpfulCount: true,
          appVersion: true,
          country: true,
        },
      }),
    ]);

    // Calculate trends
    const last30DaysStats = dailyStats.filter(
      (stat) => stat.date >= thirtyDaysAgo
    );
    const last7DaysStats = dailyStats.filter(
      (stat) => stat.date >= sevenDaysAgo
    );

    const last30DaysAvgScore =
      last30DaysStats.length > 0
        ? last30DaysStats.reduce((sum, stat) => sum + (stat.score || 0), 0) /
          last30DaysStats.length
        : null;

    const last7DaysAvgScore =
      last7DaysStats.length > 0
        ? last7DaysStats.reduce((sum, stat) => sum + (stat.score || 0), 0) /
          last7DaysStats.length
        : null;

    const last30DaysNewReviews =
      last30DaysStats.length > 1
        ? Number(last30DaysStats[0]?.reviewCount || 0) -
          Number(last30DaysStats[last30DaysStats.length - 1]?.reviewCount || 0)
        : null;

    const last7DaysNewReviews =
      last7DaysStats.length > 1
        ? Number(last7DaysStats[0]?.reviewCount || 0) -
          Number(last7DaysStats[last7DaysStats.length - 1]?.reviewCount || 0)
        : null;

    // Parse histogram
    const histogram = (app.histogram as any) || {};

    return {
      store: app.store as any,
      appId: app.appId,
      country: appCountry,

      score: app.score,
      ratingsCount: app.ratings ? Number(app.ratings) : null,
      reviewsCount: app.reviewCount ? Number(app.reviewCount) : null,

      histogram: {
        star1: app.star1Count ? Number(app.star1Count) : histogram[1] || null,
        star2: app.star2Count ? Number(app.star2Count) : histogram[2] || null,
        star3: app.star3Count ? Number(app.star3Count) : histogram[3] || null,
        star4: app.star4Count ? Number(app.star4Count) : histogram[4] || null,
        star5: app.star5Count ? Number(app.star5Count) : histogram[5] || null,
      },

      trends: {
        last7Days: {
          avgScore: last7DaysAvgScore,
          newReviews: last7DaysNewReviews,
        },
        last30Days: {
          avgScore: last30DaysAvgScore,
          newReviews: last30DaysNewReviews,
        },
      },

      recentReviews: recentReviews.map((review) => ({
        id: review.id,
        author: review.reviewerName,
        score: review.rating,
        title: null, // Not stored in our schema
        text: review.reviewText,
        version: review.appVersion,
        thumbsUp: review.helpfulCount ? Number(review.helpfulCount) : null,
        publishedAt: review.reviewDate?.toISOString() ?? null,
        country: review.country,
      })),
    };
  }
}

