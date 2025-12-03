import appstore from "app-store-scraper";
import { ScraperService } from "../scraperService.ts";
import { Store } from "@prisma/client";
import type { AppInfo } from "../../types/appInfo.ts";

// Apple App Store categories
const APPLE_CATEGORIES = [
  appstore.category.GAMES,
  appstore.category.BUSINESS,
  appstore.category.EDUCATION,
  appstore.category.ENTERTAINMENT,
  appstore.category.FINANCE,
  appstore.category.FOOD_AND_DRINK,
  appstore.category.HEALTH_AND_FITNESS,
  appstore.category.LIFESTYLE,
  appstore.category.MEDICAL,
  appstore.category.MUSIC,
  appstore.category.NEWS,
  appstore.category.PHOTO_AND_VIDEO,
  appstore.category.PRODUCTIVITY,
  appstore.category.REFERENCE,
  appstore.category.SHOPPING,
  appstore.category.SOCIAL_NETWORKING,
  appstore.category.SPORTS,
  appstore.category.TRAVEL,
  appstore.category.UTILITIES,
  appstore.category.WEATHER,
  appstore.category.BOOKS,
  appstore.category.CATALOGS,
  appstore.category.MAGAZINES_AND_NEWSPAPERS,
  appstore.category.NAVIGATION,
];

// Increased limits - app-store-scraper supports up to 200 per request
// We'll fetch maximum available to get comprehensive coverage
const MAX_APPS_PER_CATEGORY = 200; // Maximum apps per category (library limit)
const MAX_APPS_PER_CHART = 200; // Maximum apps per chart (library limit)

/**
 * Discover Apple App Store apps by categories
 * Note: app-store-scraper has limited pagination support
 */
export async function discoverAppleAppStoreByCategories(country: string) {
  console.log(
    `[AppleAppStoreDiscovery] Starting category-based discovery for country=${country}`
  );

  let totalAppsDiscovered = 0;
  const discoveredAppIds = new Set<string>();

  for (const category of APPLE_CATEGORIES) {
    console.log(
      `[AppleAppStoreDiscovery] Processing category=${category} country=${country}`
    );

    try {
      const apps = await ScraperService.discoverCategory({
        store: Store.APPLE_APP_STORE as AppInfo["store"],
        country,
        category,
        limit: MAX_APPS_PER_CATEGORY,
      });

      if (apps.length === 0) {
        console.log(
          `[AppleAppStoreDiscovery] No apps found for category=${category}`
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
              store: Store.APPLE_APP_STORE as AppInfo["store"],
              appId,
              country,
              rank: rank ?? totalAppsDiscovered,
              chartType: `CATEGORY_TOP_FREE_${category}`,
              category: category as string,
            });

            console.log(
              `[AppleAppStoreDiscovery] ✓ Saved app ${totalAppsDiscovered}: ${appId}`
            );
          } catch (err: any) {
            // Skip 400 errors (invalid/delisted apps) but log others
            if (err?.response?.statusCode === 400) {
              console.log(
                `[AppleAppStoreDiscovery] ⚠ App ${appId} returned 400 - skipping (may be delisted)`
              );
            } else {
              console.error(
                `[AppleAppStoreDiscovery] ✗ Failed to scrape ${appId}:`,
                err?.message || err
              );
            }
          }
          
          // Add delay between requests to avoid rate limiting
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
      }

      // Small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (err) {
      console.error(
        `[AppleAppStoreDiscovery] Error fetching category=${category}:`,
        err
      );
    }

    console.log(
      `[AppleAppStoreDiscovery] Completed category=${category}, total apps so far=${totalAppsDiscovered}`
    );
  }

  console.log(
    `[AppleAppStoreDiscovery] Category discovery complete. Total unique apps=${totalAppsDiscovered}`
  );
  return totalAppsDiscovered;
}

/**
 * Discover Apple App Store apps from top charts (all chart types)
 */
export async function discoverAppleAppStoreByCharts(country: string) {
  console.log(
    `[AppleAppStoreDiscovery] Starting chart-based discovery for country=${country}`
  );

  const chartTypes = ["TOP_FREE", "TOP_PAID", "TOP_GROSSING"];
  const discoveredAppIds = new Set<string>();
  let totalAppsDiscovered = 0;

  for (const chartType of chartTypes) {
    console.log(
      `[AppleAppStoreDiscovery] Processing chart=${chartType} country=${country}`
    );

    try {
      const apps = await ScraperService.discoverCharts({
        store: Store.APPLE_APP_STORE as AppInfo["store"],
        country,
        chartType,
        limit: MAX_APPS_PER_CHART, // Get top apps per chart
      });

      for (const { appId, rank } of apps) {
        if (!discoveredAppIds.has(appId)) {
          discoveredAppIds.add(appId);
          totalAppsDiscovered++;

          try {
            await ScraperService.scrapeAndSaveApp({
              store: Store.APPLE_APP_STORE as AppInfo["store"],
              appId,
              country,
              rank: rank ?? totalAppsDiscovered,
              chartType,
            });

            console.log(
              `[AppleAppStoreDiscovery] ✓ Saved app ${totalAppsDiscovered}: ${appId}`
            );
          } catch (err: any) {
            // Skip 400 errors (invalid/delisted apps) but log others
            if (err?.response?.statusCode === 400) {
              console.log(
                `[AppleAppStoreDiscovery] ⚠ App ${appId} returned 400 - skipping (may be delisted)`
              );
            } else {
              console.error(
                `[AppleAppStoreDiscovery] ✗ Failed to scrape ${appId}:`,
                err?.message || err
              );
            }
          }
          
          // Add delay between requests to avoid rate limiting
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
      }
    } catch (err) {
      console.error(
        `[AppleAppStoreDiscovery] Error fetching chart=${chartType}:`,
        err
      );
    }
  }

  console.log(
    `[AppleAppStoreDiscovery] Chart discovery complete. Total unique apps=${totalAppsDiscovered}`
  );
  return totalAppsDiscovered;
}

/**
 * Full Apple App Store discovery: charts + categories
 */
export async function discoverAppleAppStoreFull(country: string) {
  console.log(
    `[AppleAppStoreDiscovery] 🚀 Starting FULL discovery for country=${country}`
  );

  // 1. Discover from charts
  await discoverAppleAppStoreByCharts(country);

  // 2. Discover from categories
  await discoverAppleAppStoreByCategories(country);

  console.log(
    `[AppleAppStoreDiscovery] 🎉 FULL discovery completed for country=${country}`
  );
}

