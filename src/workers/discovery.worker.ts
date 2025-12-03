import { Worker } from "bullmq";
import { redisConnection } from "../queues/index.ts";
import { ScraperService } from "../services/scraperService.ts";
import { detailsQueue } from "../queues/details.queue.ts";

const worker = new Worker(
  "discoveryQueue",
  async (job) => {
    const { store, country, chartType, category, limit } = job.data;

    const discovered = chartType
      ? await ScraperService.discoverCharts({ store, country, chartType, limit })
      : await ScraperService.discoverCategory({
          store,
          country,
          category,
          limit,
        });

    // Enqueue each discovered app for detail scraping
    for (const d of discovered) {
      await detailsQueue.add("scrape_app_details", {
        store,
        appId: d.appId,
        country,
        rank: d.rank,
        chartType: chartType || undefined,
      });
    }

    return { discovered: discovered.length };
  },
  {
    connection: redisConnection,
    concurrency: 5,
  }
);

worker.on("completed", (job) => {
  console.log(`[Discovery Worker] Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.error(`[Discovery Worker] Job ${job?.id} failed:`, err);
});

export default worker;


