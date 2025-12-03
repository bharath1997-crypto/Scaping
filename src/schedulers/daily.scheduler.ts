import cron from "node-cron";
import { reviewsQueue } from "../queues/reviews.queue.ts";
import { prisma } from "../utils/prisma.ts";

/**
 * Daily deep review refresh for top apps
 * Runs once per day at 2 AM
 */
cron.schedule("0 2 * * *", async () => {
  console.log("[Scheduler] Starting daily review refresh...");

  // Get top 100 apps by ratings
  const topApps = await prisma.app.findMany({
    where: {
      ratings: { gt: 1000 }, // Apps with > 1000 ratings
    },
    orderBy: {
      ratings: "desc",
    },
    take: 100,
    select: {
      id: true,
      store: true,
      appId: true,
      country: true,
    },
  });

  for (const app of topApps) {
    await reviewsQueue.add(
      "scrape_reviews",
      {
        store: app.store,
        appId: app.appId,
        country: app.country || "us",
        locale: "en_US",
      },
      {
        attempts: 2,
        backoff: {
          type: "fixed",
          delay: 10000,
        },
      }
    );
  }

  console.log(`[Scheduler] Enqueued ${topApps.length} review refresh jobs`);
});

console.log("[Scheduler] Daily scheduler started (runs daily at 2 AM)");


