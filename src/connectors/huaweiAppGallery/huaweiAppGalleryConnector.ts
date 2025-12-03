import { BaseConnector } from "../baseConnector.ts";
import type { AppInfo } from "../../types/appInfo.ts";
import { huaweiWebScraper } from "./huaweiAppGallery.web.ts";
import { mapHuaweiToAppInfo } from "./huaweiAppGallery.mapper.ts";
import { NOT_AVAILABLE } from "../../utils/fieldNormalizer.ts";

/**
 * Huawei App Gallery Connector
 * Uses web scraping to fetch data from Huawei App Gallery
 */
export class HuaweiAppGalleryConnector extends BaseConnector {
  constructor() {
    super("HUAWEI_APP_GALLERY");
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
      return await huaweiWebScraper.fetchTopCharts({ country, chartType, limit });
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
      return await huaweiWebScraper.fetchCategoryTop({ country, category, limit });
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
      const raw = await huaweiWebScraper.fetchAppDetails(appId, country);
      return mapHuaweiToAppInfo(raw, { country, locale });
    };
    const html = async () => {
      return mapHuaweiToAppInfo(
        { appId, title: NOT_AVAILABLE, _scrapeMode: "HTML_BACKUP" },
        { country, locale }
      );
    };
    const dummy = async () => {
      return mapHuaweiToAppInfo(
        { appId, title: NOT_AVAILABLE, _scrapeMode: "DUMMY_FALLBACK" },
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
    console.warn(`[HuaweiAppGalleryConnector] fetchReviews - basic implementation for ${appId}`);
    return { data: [], nextPaginationToken: null };
  }

  async fetchSimilarApps(appId: string, country: string): Promise<string[]> {
    console.warn(`[HuaweiAppGalleryConnector] fetchSimilarApps - basic implementation for ${appId}`);
    return [];
  }

  async fetchDeveloperApps(devId: string, country: string): Promise<string[]> {
    console.warn(`[HuaweiAppGalleryConnector] fetchDeveloperApps - basic implementation for ${devId}`);
    return [];
  }
}

