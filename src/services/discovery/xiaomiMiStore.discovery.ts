import { ScraperService } from "../scraperService.ts";
import { Store } from "@prisma/client";
import type { AppInfo } from "../../types/appInfo.ts";

const XIAOMI_CATEGORIES = [
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
];

const MAX_APPS_PER_CATEGORY = 200;
const MAX_APPS_PER_CHART = 200;

export async function discoverXiaomiMiStoreByCategories(country: string) {
  console.log(`[XiaomiMiStoreDiscovery] Starting category-based discovery for country=${country}`);
  let totalAppsDiscovered = 0;
  const discoveredAppIds = new Set<string>();

  for (const category of XIAOMI_CATEGORIES) {
    console.log(`[XiaomiMiStoreDiscovery] Processing category=${category} country=${country}`);
    try {
      const apps = await ScraperService.discoverCategory({
        store: Store.XIAOMI_MI_STORE as AppInfo["store"],
        country,
        category,
        limit: MAX_APPS_PER_CATEGORY,
      });

      if (apps.length === 0) {
        console.log(`[XiaomiMiStoreDiscovery] No apps found for category=${category}`);
        continue;
      }

      for (const { appId, rank } of apps) {
        if (!discoveredAppIds.has(appId)) {
          discoveredAppIds.add(appId);
          totalAppsDiscovered++;
          try {
            await ScraperService.scrapeAndSaveApp({
              store: Store.XIAOMI_MI_STORE as AppInfo["store"],
              appId,
              country,
              rank: rank ?? totalAppsDiscovered,
              chartType: `CATEGORY_TOP_FREE_${category}`,
              category: category as string,
            });
            console.log(`[XiaomiMiStoreDiscovery] ✓ Saved app ${totalAppsDiscovered}: ${appId}`);
          } catch (err) {
            console.error(`[XiaomiMiStoreDiscovery] ✗ Failed to scrape ${appId}:`, err);
          }
        }
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (err) {
      console.error(`[XiaomiMiStoreDiscovery] Error fetching category=${category}:`, err);
    }
  }
  console.log(`[XiaomiMiStoreDiscovery] Category discovery complete. Total unique apps=${totalAppsDiscovered}`);
  return totalAppsDiscovered;
}

export async function discoverXiaomiMiStoreByCharts(country: string) {
  console.log(`[XiaomiMiStoreDiscovery] Starting chart-based discovery for country=${country}`);
  const chartTypes = ["TOP_FREE", "TOP_PAID", "TOP_GROSSING"];
  const discoveredAppIds = new Set<string>();
  let totalAppsDiscovered = 0;

  for (const chartType of chartTypes) {
    console.log(`[XiaomiMiStoreDiscovery] Processing chart=${chartType} country=${country}`);
    try {
      const apps = await ScraperService.discoverCharts({
        store: Store.XIAOMI_MI_STORE as AppInfo["store"],
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
              store: Store.XIAOMI_MI_STORE as AppInfo["store"],
              appId,
              country,
              rank: rank ?? totalAppsDiscovered,
              chartType,
            });
            console.log(`[XiaomiMiStoreDiscovery] ✓ Saved app ${totalAppsDiscovered}: ${appId}`);
          } catch (err) {
            console.error(`[XiaomiMiStoreDiscovery] ✗ Failed to scrape ${appId}:`, err);
          }
        }
      }
    } catch (err) {
      console.error(`[XiaomiMiStoreDiscovery] Error fetching chart=${chartType}:`, err);
    }
  }
  console.log(`[XiaomiMiStoreDiscovery] Chart discovery complete. Total unique apps=${totalAppsDiscovered}`);
  return totalAppsDiscovered;
}

export async function discoverXiaomiMiStoreFull(country: string) {
  console.log(`[XiaomiMiStoreDiscovery] 🚀 Starting FULL discovery for country=${country}`);
  await discoverXiaomiMiStoreByCharts(country);
  await discoverXiaomiMiStoreByCategories(country);
  console.log(`[XiaomiMiStoreDiscovery] 🎉 FULL discovery completed for country=${country}`);
}

