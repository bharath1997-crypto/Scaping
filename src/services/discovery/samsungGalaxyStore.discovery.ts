import { ScraperService } from "../scraperService.ts";
import { Store } from "@prisma/client";
import type { AppInfo } from "../../types/appInfo.ts";

// Samsung Galaxy Store categories (common categories)
const SAMSUNG_CATEGORIES = [
  "GAMES",
  "BUSINESS",
  "EDUCATION",
  "ENTERTAINMENT",
  "FINANCE",
  "FOOD_AND_DRINK",
  "HEALTH_AND_FITNESS",
  "LIFESTYLE",
  "MEDICAL",
  "MUSIC",
  "NEWS",
  "PHOTO_AND_VIDEO",
  "PRODUCTIVITY",
  "REFERENCE",
  "SHOPPING",
  "SOCIAL_NETWORKING",
  "SPORTS",
  "TRAVEL",
  "UTILITIES",
  "WEATHER",
  "BOOKS",
  "NAVIGATION",
];

const MAX_APPS_PER_CATEGORY = 200; // Maximum apps per category
const MAX_APPS_PER_CHART = 200; // Maximum apps per chart

/**
 * Discover Samsung Galaxy Store apps by categories
 */
export async function discoverSamsungGalaxyStoreByCategories(country: string) {
  console.log(
    `[SamsungGalaxyStoreDiscovery] Starting category-based discovery for country=${country}`
  );

  let totalAppsDiscovered = 0;
  const discoveredAppIds = new Set<string>();

  for (const category of SAMSUNG_CATEGORIES) {
    console.log(
      `[SamsungGalaxyStoreDiscovery] Processing category=${category} country=${country}`
    );

    try {
      const apps = await ScraperService.discoverCategory({
        store: Store.SAMSUNG_GALAXY_STORE as AppInfo["store"],
        country,
        category,
        limit: MAX_APPS_PER_CATEGORY,
      });

      if (apps.length === 0) {
        console.log(
          `[SamsungGalaxyStoreDiscovery] ⚠ No apps found for category=${category} (category may not exist or URL structure changed)`
        );
        continue;
      }

      // Process each app
      for (const { appId, rank } of apps) {
        if (!discoveredAppIds.has(appId)) {
          discoveredAppIds.add(appId);
          totalAppsDiscovered++;

          try {
            await ScraperService.scrapeAndSaveApp({
              store: Store.SAMSUNG_GALAXY_STORE as AppInfo["store"],
              appId,
              country,
              rank: rank ?? totalAppsDiscovered,
              chartType: `CATEGORY_TOP_FREE_${category}`,
              category: category as string,
            });

            console.log(
              `[SamsungGalaxyStoreDiscovery] ✓ Saved app ${totalAppsDiscovered}: ${appId}`
            );
          } catch (err) {
            console.error(
              `[SamsungGalaxyStoreDiscovery] ✗ Failed to scrape ${appId}:`,
              err
            );
          }
        }
      }

      // Small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (err: any) {
      // Don't log 404 errors as errors - they're expected for invalid categories
      if (err?.response?.status !== 404 && err?.response?.statusCode !== 404) {
        console.error(
          `[SamsungGalaxyStoreDiscovery] Error fetching category=${category}:`,
          err?.message || err
        );
      } else {
        console.log(
          `[SamsungGalaxyStoreDiscovery] ⚠ Category ${category} returned 404 - skipping`
        );
      }
    }

    console.log(
      `[SamsungGalaxyStoreDiscovery] Completed category=${category}, total apps so far=${totalAppsDiscovered}`
    );
  }

  console.log(
    `[SamsungGalaxyStoreDiscovery] Category discovery complete. Total unique apps=${totalAppsDiscovered}`
  );
  return totalAppsDiscovered;
}

/**
 * Discover Samsung Galaxy Store apps from top charts
 */
export async function discoverSamsungGalaxyStoreByCharts(country: string) {
  console.log(
    `[SamsungGalaxyStoreDiscovery] Starting chart-based discovery for country=${country}`
  );

  const chartTypes = ["TOP_FREE", "TOP_PAID", "TOP_GROSSING"];
  const discoveredAppIds = new Set<string>();
  let totalAppsDiscovered = 0;

  for (const chartType of chartTypes) {
    console.log(
      `[SamsungGalaxyStoreDiscovery] Processing chart=${chartType} country=${country}`
    );

    try {
      const apps = await ScraperService.discoverCharts({
        store: Store.SAMSUNG_GALAXY_STORE as AppInfo["store"],
        country,
        chartType,
        limit: MAX_APPS_PER_CHART,
      });

      for (const { appId, rank } of apps) {
        if (!discoveredAppIds.has(appId)) {
          discoveredAppIds.add(appId);
          totalAppsDiscovered++;

          try {
            await ScraperService.scrapeAndSaveApp({
              store: Store.SAMSUNG_GALAXY_STORE as AppInfo["store"],
              appId,
              country,
              rank: rank ?? totalAppsDiscovered,
              chartType,
            });

            console.log(
              `[SamsungGalaxyStoreDiscovery] ✓ Saved app ${totalAppsDiscovered}: ${appId}`
            );
          } catch (err) {
            console.error(
              `[SamsungGalaxyStoreDiscovery] ✗ Failed to scrape ${appId}:`,
              err
            );
          }
        }
      }
    } catch (err) {
      console.error(
        `[SamsungGalaxyStoreDiscovery] Error fetching chart=${chartType}:`,
        err
      );
    }
  }

  console.log(
    `[SamsungGalaxyStoreDiscovery] Chart discovery complete. Total unique apps=${totalAppsDiscovered}`
  );
  return totalAppsDiscovered;
}

/**
 * Full Samsung Galaxy Store discovery: charts + categories
 */
export async function discoverSamsungGalaxyStoreFull(country: string) {
  console.log(
    `[SamsungGalaxyStoreDiscovery] 🚀 Starting FULL discovery for country=${country}`
  );

  // 1. Discover from charts
  await discoverSamsungGalaxyStoreByCharts(country);

  // 2. Discover from categories
  await discoverSamsungGalaxyStoreByCategories(country);

  console.log(
    `[SamsungGalaxyStoreDiscovery] 🎉 FULL discovery completed for country=${country}`
  );
}

