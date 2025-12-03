import "dotenv/config";
import { ScraperService } from "../services/scraperService.ts";
import { Store } from "@prisma/client";

const COUNTRIES = ["us", "in", "gb", "ca", "au"];
const LIMIT = 200;            // how many apps per country per cycle
const INTERVAL_HOURS = 6;     // wait time between cycles

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runCycle() {
  console.log("\n" + "=".repeat(60));
  console.log(`[ContinuousScraper] Starting cycle at ${new Date().toISOString()}`);
  console.log("=".repeat(60) + "\n");

  let totalApps = 0;

  for (const country of COUNTRIES) {
    try {
      console.log(
        `[ContinuousScraper] Scraping store=GOOGLE_PLAY country=${country.toUpperCase()} limit=${LIMIT}`
      );
      const apps = await ScraperService.scrapeTopApps(Store.GOOGLE_PLAY, LIMIT, country);
      totalApps += apps.length;
      console.log(`[ContinuousScraper] ✓ ${country.toUpperCase()}: ${apps.length} apps saved`);
    } catch (err) {
      console.error(
        `[ContinuousScraper] ✗ Error scraping country=${country}:`,
        err
      );
    }

    // Small delay between countries to avoid rate limiting
    await sleep(3000);
  }

  console.log("\n" + "=".repeat(60));
  console.log(`[ContinuousScraper] Cycle complete at ${new Date().toISOString()}`);
  console.log(`[ContinuousScraper] Total apps scraped this cycle: ${totalApps}`);
  console.log("=".repeat(60) + "\n");
}

async function main() {
  console.log("╔════════════════════════════════════════════════════════════╗");
  console.log("║         AppCortex Continuous Scraper Started               ║");
  console.log("╠════════════════════════════════════════════════════════════╣");
  console.log(`║  Countries: ${COUNTRIES.join(", ").padEnd(45)}║`);
  console.log(`║  Limit per country: ${LIMIT.toString().padEnd(37)}║`);
  console.log(`║  Cycle interval: ${INTERVAL_HOURS} hours                                   ║`);
  console.log("╚════════════════════════════════════════════════════════════╝");
  console.log("\nPress Ctrl+C to stop.\n");

  // Run forever
  while (true) {
    await runCycle();
    console.log(
      `[ContinuousScraper] Sleeping for ${INTERVAL_HOURS} hours...\n`
    );
    await sleep(INTERVAL_HOURS * 60 * 60 * 1000);
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});

