import { Worker } from "bullmq";
import { redisConnection } from "../queues/index.ts";
import { ScraperService } from "../services/scraperService.ts";

const worker = new Worker(
  "reviewsQueue",
  async (job) => {
    const { store, appId, country, locale } = job.data;

    await ScraperService.scrapeAndSaveReviews({
      store,
      appId,
      country,
      locale,
    });

    return { appId, reviewsSaved: 0 };
  },
  {
    connection: redisConnection,
    concurrency: 2, // Lower concurrency for reviews (can be rate-limited)
  }
);

worker.on("completed", (job) => {
  console.log(
    `[Reviews Worker] Job ${job.id} completed: ${job.returnvalue?.reviewsSaved} reviews`
  );
});

worker.on("failed", (job, err) => {
  console.error(`[Reviews Worker] Job ${job?.id} failed:`, err);
});

export default worker;


