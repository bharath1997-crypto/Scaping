import { getConnector } from "../connectors/index.ts";
import { saveRawSnapshot } from "./rawSnapshot.service.ts";
import { upsertAppAndDailyStat } from "./appUpsert.service.ts";
import { saveRanking } from "./ranking.service.ts";
import { saveReviews } from "./review.service.ts";
import type { AppInfo } from "../types/appInfo.ts";
import { Store } from "@prisma/client";
import gplay from "google-play-scraper";
import { discoverGooglePlayFull } from "./discovery/googlePlay.discovery.ts";
import { discoverAppleAppStoreFull } from "./discovery/appleAppStore.discovery.ts";

export const ScraperService = {
  /**
   * Discover apps from charts
   */
  async discoverCharts({
    store,
    country,
    chartType,
    limit,
  }: {
    store: AppInfo["store"];
    country: string;
    chartType: string;
    limit?: number;
  }) {
    const connector = getConnector(store);
    return connector.fetchTopCharts({ country, chartType, limit });
  },

  /**
   * Discover apps from category
   */
  async discoverCategory({
    store,
    country,
    category,
    limit,
  }: {
    store: AppInfo["store"];
    country: string;
    category: string;
    limit?: number;
  }) {
    const connector = getConnector(store);
    return connector.fetchCategoryTop({ country, category, limit });
  },

  /**
   * Scrape and save a single app (full pipeline)
   */
  async scrapeAndSaveApp({
    store,
    appId,
    country,
    locale,
    rank,
    chartType,
    category,
  }: {
    store: AppInfo["store"];
    appId: string;
    country: string;
    locale?: string;
    rank?: number;
    chartType?: string;
    category?: string;
  }): Promise<AppInfo> {
    const connector = getConnector(store);

    // 1) Fetch app details
    const appInfo = await connector.fetchAppDetails(appId, country, locale);

    // 2) Save raw snapshot
    await saveRawSnapshot(appInfo, { country, locale, rank, chartType, category });

    // 3) Upsert app and daily stat
    await upsertAppAndDailyStat(appInfo, { country, rank });

    // 4) Save ranking if provided
    if (rank && chartType) {
      await saveRanking(appInfo, { country, chartType, rank });
    }

    return appInfo;
  },

  /**
   * Scrape and save reviews for an app
   */
  async scrapeAndSaveReviews({
    store,
    appId,
    country,
    locale,
  }: {
    store: AppInfo["store"];
    appId: string;
    country: string;
    locale?: string;
  }) {
    const connector = getConnector(store);
    await saveReviews(connector, { store, appId, country, locale });
  },

  /**
   * Scrape top apps from charts (main entry point)
   */
  async scrapeTopApps(
    store: AppInfo["store"],
    limit?: number,
    country: string = "us"
  ): Promise<AppInfo[]> {
    const effectiveLimit =
      typeof limit === "number" && limit > 0 ? limit : undefined;
    console.log(
      `[ScraperService] Starting scrape: store=${store}, limit=${
        effectiveLimit ?? "all"
      }, country=${country}`
    );

    // 1) Discover top free apps
    let chartApps: { appId: string; rank: number }[] = [];
    try {
      chartApps = await this.discoverCharts({
        store,
        country,
        chartType: "TOP_FREE",
        limit: effectiveLimit,
      });
      console.log(
        `[ScraperService] Discovered ${chartApps.length} apps from charts`
      );
    } catch (err) {
      console.error(`[ScraperService] Failed to discover charts:`, err);
      return [];
    }

    if (chartApps.length === 0) {
      console.log(
        `[ScraperService] No apps discovered. API may be blocked or unavailable.`
      );
      return [];
    }

    const results: AppInfo[] = [];

    // 2) Scrape each app
    for (const [index, { appId, rank }] of chartApps.entries()) {
      const position = rank ?? index + 1;
      console.log(
        `[ScraperService] Scraping app ${position}/${chartApps.length}: ${appId}`
      );

      try {
        const appInfo = await this.scrapeAndSaveApp({
          store,
          appId,
          country,
          rank: position,
          chartType: "TOP_FREE",
        });
        results.push(appInfo);

        // 3) Scrape reviews for each app
        await this.scrapeAndSaveReviews({
          store,
          appId,
          country,
        });

        console.log(`[ScraperService] ✓ Saved: ${appInfo.title}`);
      } catch (err) {
        console.error(`[ScraperService] ✗ Failed to scrape ${appId}:`, err);
      }
    }

    console.log(
      `[ScraperService] Completed: ${results.length}/${chartApps.length} apps scraped`
    );
    return results;
  },

  /**
   * Full discovery for Google Play Store (no limit, paginated)
   */
  async discoverGooglePlay(params: { country: string }) {
    const { country } = params;
    console.log(
      `[ScraperService] Starting FULL Google Play discovery for country=${country}`
    );
    await discoverGooglePlayFull(country);
  },

  /**
   * Full discovery for Apple App Store (no limit, paginated)
   */
  async discoverAppleAppStore(params: { country: string }) {
    const { country } = params;
    console.log(
      `[ScraperService] Starting FULL Apple App Store discovery for country=${country}`
    );
    await discoverAppleAppStoreFull(country);
  },

  /**
   * Full discovery for Samsung Galaxy Store
   */
  async discoverSamsungGalaxyStore(params: { country: string }) {
    const { country } = params;
    console.log(
      `[ScraperService] Starting FULL Samsung Galaxy Store discovery for country=${country}`
    );
    const { discoverSamsungGalaxyStoreFull } = await import("./discovery/samsungGalaxyStore.discovery.ts");
    await discoverSamsungGalaxyStoreFull(country);
  },

  /**
   * Full discovery for Huawei App Gallery
   */
  async discoverHuaweiAppGallery(params: { country: string }) {
    const { country } = params;
    console.log(
      `[ScraperService] Starting FULL Huawei App Gallery discovery for country=${country}`
    );
    const { discoverHuaweiAppGalleryFull } = await import("./discovery/huaweiAppGallery.discovery.ts");
    await discoverHuaweiAppGalleryFull(country);
  },

  /**
   * Full discovery for Xiaomi Mi Store
   */
  async discoverXiaomiMiStore(params: { country: string }) {
    const { country } = params;
    console.log(
      `[ScraperService] Starting FULL Xiaomi Mi Store discovery for country=${country}`
    );
    const { discoverXiaomiMiStoreFull } = await import("./discovery/xiaomiMiStore.discovery.ts");
    await discoverXiaomiMiStoreFull(country);
  },
};
