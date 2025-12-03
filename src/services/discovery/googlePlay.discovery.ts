import gplay from "google-play-scraper";
import { ScraperService } from "../scraperService.ts";
import { Store } from "@prisma/client";
import type { AppInfo } from "../../types/appInfo.ts";

// Google Play categories (from google-play-scraper)
// Using type assertion because google-play-scraper types don't expose these properly
const gplayCategory = gplay.category as any;
const GOOGLE_PLAY_CATEGORIES = [
  gplayCategory.GAME_ACTION,
  gplayCategory.GAME_ADVENTURE,
  gplayCategory.GAME_ARCADE,
  gplayCategory.GAME_BOARD,
  gplayCategory.GAME_CARD,
  gplayCategory.GAME_CASINO,
  gplayCategory.GAME_CASUAL,
  gplayCategory.GAME_EDUCATIONAL,
  gplayCategory.GAME_MUSIC,
  gplayCategory.GAME_PUZZLE,
  gplayCategory.GAME_RACING,
  gplayCategory.GAME_ROLE_PLAYING,
  gplayCategory.GAME_SIMULATION,
  gplayCategory.GAME_SPORTS,
  gplayCategory.GAME_STRATEGY,
  gplayCategory.GAME_TRIVIA,
  gplayCategory.GAME_WORD,
  gplayCategory.APPLICATION,
  gplayCategory.ANDROID_WEAR,
  gplayCategory.ART_AND_DESIGN,
  gplayCategory.AUTO_AND_VEHICLES,
  gplayCategory.BEAUTY,
  gplayCategory.BOOKS_AND_REFERENCE,
  gplayCategory.BUSINESS,
  gplayCategory.COMICS,
  gplayCategory.COMMUNICATION,
  gplayCategory.DATING,
  gplayCategory.EDUCATION,
  gplayCategory.ENTERTAINMENT,
  gplayCategory.EVENTS,
  gplayCategory.FINANCE,
  gplayCategory.FOOD_AND_DRINK,
  gplayCategory.HEALTH_AND_FITNESS,
  gplayCategory.HOUSE_AND_HOME,
  gplayCategory.LIBRARIES_AND_DEMO,
  gplayCategory.LIFESTYLE,
  gplayCategory.MAPS_AND_NAVIGATION,
  gplayCategory.MEDICAL,
  gplayCategory.MUSIC_AND_AUDIO,
  gplayCategory.NEWS_AND_MAGAZINES,
  gplayCategory.PARENTING,
  gplayCategory.PERSONALIZATION,
  gplayCategory.PHOTOGRAPHY,
  gplayCategory.PRODUCTIVITY,
  gplayCategory.SHOPPING,
  gplayCategory.SOCIAL,
  gplayCategory.SPORTS,
  gplayCategory.TOOLS,
  gplayCategory.TRAVEL_AND_LOCAL,
  gplayCategory.VIDEO_PLAYERS,
  gplayCategory.WATCH_FACE,
  gplayCategory.WEATHER,
];

// Increased limits - google-play-scraper supports up to 500 per request
// We'll fetch maximum available to get comprehensive coverage
const MAX_APPS_PER_CATEGORY = 500; // Maximum apps per category (library limit)
const MAX_APPS_PER_CHART = 500; // Maximum apps per chart (library limit)

/**
 * Discover Google Play apps by categories
 * Note: google-play-scraper doesn't support pagination, so we fetch max available per category
 */
export async function discoverGooglePlayByCategories(country: string) {
  console.log(
    `[GooglePlayDiscovery] Starting category-based discovery for country=${country}`
  );

  let totalAppsDiscovered = 0;
  const discoveredAppIds = new Set<string>();

  for (const category of GOOGLE_PLAY_CATEGORIES) {
    console.log(
      `[GooglePlayDiscovery] Processing category=${category} country=${country}`
    );

    try {
      const apps = await ScraperService.discoverCategory({
        store: Store.GOOGLE_PLAY as AppInfo["store"],
        country,
        category,
        limit: MAX_APPS_PER_CATEGORY,
      });

      if (apps.length === 0) {
        console.log(
          `[GooglePlayDiscovery] No apps found for category=${category}`
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
              store: Store.GOOGLE_PLAY as AppInfo["store"],
              appId,
              country,
              rank: rank ?? totalAppsDiscovered,
              chartType: `CATEGORY_TOP_FREE_${category}`,
              category: category as string,
            });

            console.log(
              `[GooglePlayDiscovery] ✓ Saved app ${totalAppsDiscovered}: ${appId}`
            );
          } catch (err) {
            console.error(
              `[GooglePlayDiscovery] ✗ Failed to scrape ${appId}:`,
              err
            );
          }
        }
      }

      // Small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (err) {
      console.error(
        `[GooglePlayDiscovery] Error fetching category=${category}:`,
        err
      );
    }

    console.log(
      `[GooglePlayDiscovery] Completed category=${category}, total apps so far=${totalAppsDiscovered}`
    );
  }

  console.log(
    `[GooglePlayDiscovery] Category discovery complete. Total unique apps=${totalAppsDiscovered}`
  );
  return totalAppsDiscovered;
}

/**
 * Discover Google Play apps from top charts (all chart types)
 */
export async function discoverGooglePlayByCharts(country: string) {
  console.log(
    `[GooglePlayDiscovery] Starting chart-based discovery for country=${country}`
  );

  const chartTypes = ["TOP_FREE", "TOP_PAID", "TOP_GROSSING"];
  const discoveredAppIds = new Set<string>();
  let totalAppsDiscovered = 0;

  for (const chartType of chartTypes) {
    console.log(
      `[GooglePlayDiscovery] Processing chart=${chartType} country=${country}`
    );

    try {
      const apps = await ScraperService.discoverCharts({
        store: Store.GOOGLE_PLAY as AppInfo["store"],
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
              store: Store.GOOGLE_PLAY as AppInfo["store"],
              appId,
              country,
              rank: rank ?? totalAppsDiscovered,
              chartType,
            });

            console.log(
              `[GooglePlayDiscovery] ✓ Saved app ${totalAppsDiscovered}: ${appId}`
            );
          } catch (err) {
            console.error(
              `[GooglePlayDiscovery] ✗ Failed to scrape ${appId}:`,
              err
            );
          }
        }
      }
    } catch (err) {
      console.error(
        `[GooglePlayDiscovery] Error fetching chart=${chartType}:`,
        err
      );
    }
  }

  console.log(
    `[GooglePlayDiscovery] Chart discovery complete. Total unique apps=${totalAppsDiscovered}`
  );
  return totalAppsDiscovered;
}

/**
 * Full Google Play discovery: charts + categories
 */
export async function discoverGooglePlayFull(country: string) {
  console.log(
    `[GooglePlayDiscovery] 🚀 Starting FULL discovery for country=${country}`
  );

  // 1. Discover from charts
  await discoverGooglePlayByCharts(country);

  // 2. Discover from categories
  await discoverGooglePlayByCategories(country);

  console.log(
    `[GooglePlayDiscovery] 🎉 FULL discovery completed for country=${country}`
  );
}

