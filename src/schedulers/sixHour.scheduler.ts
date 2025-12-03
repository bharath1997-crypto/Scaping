import cron from "node-cron";
import { discoveryQueue } from "../queues/discovery.queue.ts";

const COUNTRIES = ["us", "in"];
const CHARTS = ["TOP_FREE", "TOP_GROSSING"];
const LIMIT = 200;

/**
 * Schedule discovery jobs every 6 hours
 */
cron.schedule("0 */6 * * *", async () => {
  console.log("[Scheduler] Starting 6-hour discovery cycle...");

  for (const country of COUNTRIES) {
    for (const chartType of CHARTS) {
      await discoveryQueue.add(
        "discover_charts",
        {
          store: "GOOGLE_PLAY",
          country,
          chartType,
          limit: LIMIT,
        },
        {
          attempts: 3,
          backoff: {
            type: "exponential",
            delay: 5000,
          },
        }
      );
    }
  }

  console.log(
    `[Scheduler] Enqueued ${COUNTRIES.length * CHARTS.length} discovery jobs`
  );
});

console.log("[Scheduler] 6-hour scheduler started (runs every 6 hours)");


