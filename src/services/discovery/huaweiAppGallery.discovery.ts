import { ScraperService } from "../scraperService.ts";
import { Store } from "@prisma/client";
import type { AppInfo } from "../../types/appInfo.ts";

const HUAWEI_CATEGORIES = [
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

export async function discoverHuaweiAppGalleryByCategories(country: string) {
  console.log(`[HuaweiAppGalleryDiscovery] Starting category-based discovery for country=${country}`);
  let totalAppsDiscovered = 0;
  const discoveredAppIds = new Set<string>();

  for (const category of HUAWEI_CATEGORIES) {
    console.log(`[HuaweiAppGalleryDiscovery] Processing category=${category} country=${country}`);
    try {
      const apps = await ScraperService.discoverCategory({
        store: Store.HUAWEI_APP_GALLERY as AppInfo["store"],
        country,
        category,
        limit: MAX_APPS_PER_CATEGORY,
      });

      if (apps.length === 0) {
        console.log(`[HuaweiAppGalleryDiscovery] No apps found for category=${category}`);
        continue;
      }

      for (const { appId, rank } of apps) {
        if (!discoveredAppIds.has(appId)) {
          discoveredAppIds.add(appId);
          totalAppsDiscovered++;
          try {
            await ScraperService.scrapeAndSaveApp({
              store: Store.HUAWEI_APP_GALLERY as AppInfo["store"],
              appId,
              country,
              rank: rank ?? totalAppsDiscovered,
              chartType: `CATEGORY_TOP_FREE_${category}`,
              category: category as string,
            });
            console.log(`[HuaweiAppGalleryDiscovery] ✓ Saved app ${totalAppsDiscovered}: ${appId}`);
          } catch (err) {
            console.error(`[HuaweiAppGalleryDiscovery] ✗ Failed to scrape ${appId}:`, err);
          }
        }
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (err) {
      console.error(`[HuaweiAppGalleryDiscovery] Error fetching category=${category}:`, err);
    }
  }
  console.log(`[HuaweiAppGalleryDiscovery] Category discovery complete. Total unique apps=${totalAppsDiscovered}`);
  return totalAppsDiscovered;
}

export async function discoverHuaweiAppGalleryByCharts(country: string) {
  console.log(`[HuaweiAppGalleryDiscovery] Starting chart-based discovery for country=${country}`);
  const chartTypes = ["TOP_FREE", "TOP_PAID", "TOP_GROSSING"];
  const discoveredAppIds = new Set<string>();
  let totalAppsDiscovered = 0;

  for (const chartType of chartTypes) {
    console.log(`[HuaweiAppGalleryDiscovery] Processing chart=${chartType} country=${country}`);
    try {
      const apps = await ScraperService.discoverCharts({
        store: Store.HUAWEI_APP_GALLERY as AppInfo["store"],
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
              store: Store.HUAWEI_APP_GALLERY as AppInfo["store"],
              appId,
              country,
              rank: rank ?? totalAppsDiscovered,
              chartType,
            });
            console.log(`[HuaweiAppGalleryDiscovery] ✓ Saved app ${totalAppsDiscovered}: ${appId}`);
          } catch (err) {
            console.error(`[HuaweiAppGalleryDiscovery] ✗ Failed to scrape ${appId}:`, err);
          }
        }
      }
    } catch (err) {
      console.error(`[HuaweiAppGalleryDiscovery] Error fetching chart=${chartType}:`, err);
    }
  }
  console.log(`[HuaweiAppGalleryDiscovery] Chart discovery complete. Total unique apps=${totalAppsDiscovered}`);
  return totalAppsDiscovered;
}

export async function discoverHuaweiAppGalleryFull(country: string) {
  console.log(`[HuaweiAppGalleryDiscovery] 🚀 Starting FULL discovery for country=${country}`);
  await discoverHuaweiAppGalleryByCharts(country);
  await discoverHuaweiAppGalleryByCategories(country);
  console.log(`[HuaweiAppGalleryDiscovery] 🎉 FULL discovery completed for country=${country}`);
}

