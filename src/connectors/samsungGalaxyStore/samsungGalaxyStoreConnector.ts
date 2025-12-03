import { BaseConnector } from "../baseConnector.ts";
import type { AppInfo } from "../../types/appInfo.ts";
import { samsungWebScraper } from "./samsungGalaxyStore.web.ts";
import { mapSamsungToAppInfo } from "./samsungGalaxyStore.mapper.ts";
import { NOT_AVAILABLE } from "../../utils/fieldNormalizer.ts";

/**
 * Samsung Galaxy Store Connector
 * Uses web scraping to fetch data from Samsung Galaxy Store
 */
export class SamsungGalaxyStoreConnector extends BaseConnector {
  constructor() {
    super("SAMSUNG_GALAXY_STORE");
  }

  async fetchTopCharts({
    country,
    chartType,
    limit = 100,
  }: {
    country: string;
    chartType: string;
    limit?: number;
  }): Promise<{ appId: string; rank: number }[]> {
    const real = async () => {
      return await samsungWebScraper.fetchTopCharts({ country, chartType, limit });
    };

    const html = async () => [];
    const dummy = async () => [];

    return this.withFallback(real, html, dummy);
  }

  async fetchCategoryTop({
    country,
    category,
    limit = 100,
  }: {
    country: string;
    category: string;
    limit?: number;
  }): Promise<{ appId: string; rank: number }[]> {
    const real = async () => {
      return await samsungWebScraper.fetchCategoryTop({ country, category, limit });
    };

    const html = async () => [];
    const dummy = async () => [];

    return this.withFallback(real, html, dummy);
  }

  async fetchAppDetails(
    appId: string,
    country: string,
    locale?: string
  ): Promise<AppInfo> {
    const real = async () => {
      const raw = await samsungWebScraper.fetchAppDetails(appId, country);
      return mapSamsungToAppInfo(raw, { country, locale });
    };

    const html = async () => {
      // Fallback: return minimal app info
      return mapSamsungToAppInfo(
        {
          appId,
          title: NOT_AVAILABLE,
          _scrapeMode: "HTML_BACKUP",
        },
        { country, locale }
      );
    };

    const dummy = async () => {
      return mapSamsungToAppInfo(
        {
          appId,
          title: NOT_AVAILABLE,
          _scrapeMode: "DUMMY_FALLBACK",
        },
        { country, locale }
      );
    };

    return this.withFallback(real, html, dummy);
  }

  async fetchReviews(
    appId: string,
    country: string,
    locale?: string,
    cursor?: any
  ): Promise<{ data: any[]; nextPaginationToken?: any }> {
    // Samsung Galaxy Store reviews scraping - basic implementation
    console.warn(
      `[SamsungGalaxyStoreConnector] fetchReviews - basic implementation for ${appId}`
    );
    return { data: [], nextPaginationToken: null };
  }

  async fetchSimilarApps(appId: string, country: string): Promise<string[]> {
    // Samsung Galaxy Store similar apps - basic implementation
    console.warn(
      `[SamsungGalaxyStoreConnector] fetchSimilarApps - basic implementation for ${appId}`
    );
    return [];
  }

  async fetchDeveloperApps(
    devId: string,
    country: string
  ): Promise<string[]> {
    // Samsung Galaxy Store developer apps - basic implementation
    console.warn(
      `[SamsungGalaxyStoreConnector] fetchDeveloperApps - basic implementation for ${devId}`
    );
    return [];
  }
}

