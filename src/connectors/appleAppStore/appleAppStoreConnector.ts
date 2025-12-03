import appstore from "app-store-scraper";
import { BaseConnector } from "../baseConnector.ts";
import type { AppInfo } from "../../types/appInfo.ts";
import { mapAppleToAppInfo } from "./appleAppStore.mapper.ts";
import { fetchAppleHtmlFallback } from "./appleAppStore.html.ts";

const COLLECTION_MAP: Record<string, any> = {
  TOP_FREE: appstore.collection.TOP_FREE,
  TOP_PAID: appstore.collection.TOP_PAID,
  TOP_GROSSING: appstore.collection.TOP_GROSSING,
  TRENDING: appstore.collection.TOP_FREE,
  NEW_APPS: appstore.collection.NEW_APPS,
};

const normalizeCountry = (country?: string) =>
  country ? country.toLowerCase() : "us";

const nextPageToken = (page: number, length: number) =>
  length === 0 ? null : page + 1;

async function withRetry<T>(
  fn: () => Promise<T>,
  retries = 2,
  delayMs = 2000
): Promise<T> {
  let lastError: unknown;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err: any) {
      lastError = err;
      // Don't retry on 400 Bad Request (invalid app ID or delisted app)
      if (err?.response?.statusCode === 400) {
        console.log(`[AppleAppStore] 400 Bad Request - app may be invalid or delisted`);
        throw err;
      }
      if (attempt === retries) break;
      console.log(`[AppleAppStore] Retry attempt ${attempt + 1}/${retries}...`);
      await new Promise((res) => setTimeout(res, delayMs * (attempt + 1)));
    }
  }
  throw lastError;
}

export class AppleAppStoreConnector extends BaseConnector {
  constructor() {
    super("APPLE_APP_STORE");
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
    const real = async (): Promise<{ appId: string; rank: number }[]> => {
      const collection =
        COLLECTION_MAP[chartType] || appstore.collection.TOP_FREE;
      const list = (await withRetry(() =>
        appstore.list({
          collection,
          country: normalizeCountry(country),
          num: Math.min(limit || 200, 200),
        })
      )) as any[];

      return list.map((item: any, index: number) => {
        // Prioritize numeric IDs (id/trackId) over bundle IDs (appId)
        // Apple's API and HTML scraping work better with numeric IDs
        const numericId = item.id ?? item.trackId;
        const bundleId = item.appId;
        const appId = numericId ? numericId.toString() : (bundleId ?? "").toString();
        
        return {
          appId,
          rank: item.rank ?? item.position ?? index + 1,
        };
      });
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
    const real = async (): Promise<{ appId: string; rank: number }[]> => {
      const list = (await withRetry(() =>
        appstore.list({
          category,
          country: normalizeCountry(country),
          num: Math.min(limit || 200, 200),
        })
      )) as any[];

      return list.map((item: any, index: number) => {
        // Prioritize numeric IDs (id/trackId) over bundle IDs (appId)
        // Apple's API and HTML scraping work better with numeric IDs
        const numericId = item.id ?? item.trackId;
        const bundleId = item.appId;
        const appId = numericId ? numericId.toString() : (bundleId ?? "").toString();
        
        return {
          appId,
          rank: item.rank ?? item.position ?? index + 1,
        };
      });
    };

    const html = async () => [];
    const dummy = async () => [];

    return this.withFallback(real, html, dummy);
  }

  async fetchAppDetails(
    appId: string,
    country: string,
    locale = "en_US"
  ): Promise<AppInfo> {
    const real = async (): Promise<AppInfo> => {
      const lang = locale.split("_")[0]?.toLowerCase() || "en";
      try {
        const raw = await withRetry(() =>
          appstore.app({
            id: appId,
            country: normalizeCountry(country),
            lang,
          })
        );
        return mapAppleToAppInfo(raw, { country, locale });
      } catch (err: any) {
        // If 400 Bad Request, app might be delisted or invalid
        if (err?.response?.statusCode === 400) {
          console.log(`[AppleAppStore] App ${appId} returned 400 - may be delisted or invalid`);
          throw err;
        }
        throw err;
      }
    };

    const html = async () => {
      // HTML fallback: scrape actual App Store page
      const raw = await fetchAppleHtmlFallback.details({ appId, country, locale });
      return mapAppleToAppInfo(raw, { country, locale });
    };

    const dummy = async () => {
      return mapAppleToAppInfo(
        {
          appId,
          title: "not available",
          _scrapeMode: "DUMMY_FALLBACK",
        } as any,
        { country, locale }
      );
    };

    return this.withFallback(real, html, dummy);
  }

  async fetchReviews(
    appId: string,
    country: string,
    locale = "en_US",
    cursor?: any
  ): Promise<{ data: any[]; nextPaginationToken?: any }> {
    const real = async () => {
      const page =
        typeof cursor === "number"
          ? cursor
          : typeof cursor === "object" && cursor?.page
          ? cursor.page
          : 0;

      const data = await withRetry(() =>
        appstore.reviews({
          id: appId,
          country: normalizeCountry(country),
          page,
          sort: appstore.sort.RECENT,
          lang: locale.split("_")[0]?.toLowerCase() || "en",
        })
      );

      return {
        data: Array.isArray(data) ? data : [],
        nextPaginationToken: nextPageToken(page, Array.isArray(data) ? data.length : 0),
      };
    };

    const html = async () => ({ data: [], nextPaginationToken: null });
    const dummy = async () => ({ data: [], nextPaginationToken: null });

    return this.withFallback(real, html, dummy);
  }

  async fetchSimilarApps(appId: string, country: string): Promise<string[]> {
    const real = async () => {
      const results = await withRetry(() =>
        appstore.similar({
          id: appId,
          country: normalizeCountry(country),
        })
      );
      return (Array.isArray(results) ? results : [])
        .map((item: any) => (item.appId ?? item.id ?? item.trackId ?? "").toString())
        .filter(Boolean);
    };

    const html = async () => [];
    const dummy = async () => [];

    try {
      return await this.withFallback(real, html, dummy);
    } catch {
      return [];
    }
  }

  async fetchDeveloperApps(devId: string, country: string): Promise<string[]> {
    const real = async () => {
      const results = await withRetry(() =>
        appstore.developer({
          id: devId,
          country: normalizeCountry(country),
        })
      );
      return (Array.isArray(results) ? results : [])
        .map((item: any) => (item.appId ?? item.id ?? item.trackId ?? "").toString())
        .filter(Boolean);
    };

    const html = async () => [];
    const dummy = async () => [];

    try {
      return await this.withFallback(real, html, dummy);
    } catch {
      return [];
    }
  }
}


