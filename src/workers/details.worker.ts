import { Worker } from "bullmq";
import { redisConnection } from "../queues/index.ts";
import { ScraperService } from "../services/scraperService.ts";
import { reviewsQueue } from "../queues/reviews.queue.ts";

const worker = new Worker(
  "detailsQueue",
  async (job) => {
    const { store, appId, country, locale, rank, chartType } = job.data;

    // Scrape and save app (includes raw snapshot, app upsert, daily stat, ranking)
    const appInfo = await ScraperService.scrapeAndSaveApp({
      store,
      appId,
      country,
      locale,
      rank,
      chartType,
    });

    // Enqueue reviews scraping
    await reviewsQueue.add("scrape_reviews", {
      store,
      appId,
      country,
      locale,
    });

    return { appId, title: appInfo.title };
  },
  {
    connection: redisConnection,
    concurrency: 3, // Lower concurrency for detail scraping (more intensive)
  }
);

worker.on("completed", (job) => {
  console.log(`[Details Worker] Job ${job.id} completed: ${job.returnvalue?.appId}`);
});

worker.on("failed", (job, err) => {
  console.error(`[Details Worker] Job ${job?.id} failed:`, err);
});

export default worker;


