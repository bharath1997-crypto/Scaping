import { prisma } from "../utils/prisma.ts";
import { BaseConnector } from "../connectors/baseConnector.ts";
import type { AppInfo } from "../types/appInfo.ts";

/**
 * Fetch and save reviews for an app (paginated)
 */
export async function saveReviews(
  connector: BaseConnector,
  ctx: {
    store: AppInfo["store"];
    appId: string;
    country: string;
    locale?: string;
  }
) {
  // Find the app in database
  const appRow = await prisma.app.findUnique({
    where: {
      store_appId: {
        store: ctx.store as any,
        appId: ctx.appId,
      },
    },
  });

  if (!appRow) {
    console.warn(`App not found for reviews: ${ctx.appId}`);
    return;
  }

  let cursor: any = undefined;
  let totalSaved = 0;
  const maxPages = 5; // Limit to 5 pages (1000 reviews max)

  for (let page = 0; page < maxPages; page++) {
    const result = await connector.fetchReviews(
      ctx.appId,
      ctx.country,
      ctx.locale,
      cursor
    );

    const reviews = result.data || [];

    for (const review of reviews) {
      // Deduplicate by reviewId or content+date+rating
      const reviewId = review.id || review.reviewId;
      let existing = null;

      if (reviewId) {
        // Try to find by reviewId first
        existing = await prisma.review.findFirst({
          where: {
            appIdRef: appRow.id,
            reviewId: reviewId,
          },
        });
      }

      // If not found and no reviewId, check by content+date+rating
      if (!existing && review.text) {
        const reviewDate = review.date
          ? new Date(review.date)
          : review.reviewDate
          ? new Date(review.reviewDate)
          : null;
        const rating = review.rating || review.score || 1;

        existing = await prisma.review.findFirst({
          where: {
            appIdRef: appRow.id,
            reviewText: review.text,
            reviewDate: reviewDate,
            rating: rating,
          },
        });
      }

      if (existing) continue;

      await prisma.review.create({
        data: {
          appIdRef: appRow.id,
          reviewId: reviewId || null,
          rating: review.rating || review.score || 1,
          reviewText: review.text || review.reviewText || null,
          reviewDate: review.date
            ? new Date(review.date)
            : review.reviewDate
            ? new Date(review.reviewDate)
            : null,
          reviewerName: review.userName || review.reviewerName || null,
          helpfulCount: review.thumbsUp
            ? BigInt(review.thumbsUp)
            : review.helpfulCount
            ? BigInt(review.helpfulCount)
            : null,
          appVersion: review.version || review.appVersion || null,
          country: ctx.country,
          developerReply: review.replyText || review.developerReply || null,
          developerReplyDate: review.replyDate
            ? new Date(review.replyDate)
            : review.developerReplyDate
            ? new Date(review.developerReplyDate)
            : null,
        },
      });

      totalSaved++;
    }

    cursor = result.nextPaginationToken;
    if (!cursor) break;
  }

  return totalSaved;
}


