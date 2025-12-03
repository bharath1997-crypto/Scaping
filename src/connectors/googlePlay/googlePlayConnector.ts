import gplay from "google-play-scraper";
import { BaseConnector } from "../baseConnector.ts";
import type { AppInfo } from "../../types/appInfo.ts";
import { fetchAppHtmlFallback } from "./googlePlay.html.ts";
import { mapGoogleToAppInfo } from "./googlePlay.mapper.ts";

const USER_AGENTS: string[] = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15",
  "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:123.0) Gecko/20100101 Firefox/123.0",
];

function getRandomUserAgent(): string {
  return USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
}

async function withRetry<T>(
  fn: () => Promise<T>,
  retries = 2,
  delayMs = 500
): Promise<T> {
  let lastError: unknown;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (attempt === retries) break;
      await new Promise((res) => setTimeout(res, delayMs));
    }
  }
  throw lastError;
}

// Use google-play-scraper's collection constants
// Available: TOP_FREE, TOP_PAID, GROSSING
// Using type assertion because google-play-scraper types don't expose these properly
const gplayCollection = gplay.collection as any;
const COLLECTION_MAP: Record<string, any> = {
  TOP_FREE: gplayCollection.TOP_FREE,
  TOP_PAID: gplayCollection.TOP_PAID,
  TOP_GROSSING: gplayCollection.GROSSING,
  TRENDING: gplayCollection.TOP_FREE,    // fallback to TOP_FREE
  NEW_APPS: gplayCollection.TOP_FREE,    // fallback to TOP_FREE
};

export class GooglePlayConnector extends BaseConnector {
  constructor() {
    super("GOOGLE_PLAY");
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
      (gplay as any).requestOptions = {
        headers: { "User-Agent": getRandomUserAgent() },
      };

      const gplayCollection = gplay.collection as any;
      const collection = COLLECTION_MAP[chartType] || gplayCollection.TOP_FREE;
      const list = (await withRetry(() =>
        gplay.list({
          country,
          collection,
          num: limit,
        })
      )) as any[];

      return list.map((a, i) => ({
        appId: a?.appId ?? "",
        rank: i + 1,
      }));
    };

    const html = async () =>
      fetchAppHtmlFallback.topCharts({ country, chartType, limit });

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
      (gplay as any).requestOptions = {
        headers: { "User-Agent": getRandomUserAgent() },
      };

      const list = (await withRetry(() =>
        gplay.list({
          country,
          category: category as any,
          num: limit,
        })
      )) as any[];

      return list.map((a, i) => ({
        appId: a?.appId ?? "",
        rank: i + 1,
      }));
    };

    const html = async () =>
      fetchAppHtmlFallback.categoryTop({ country, category, limit });

    const dummy = async () => [];

    return this.withFallback(real, html, dummy);
  }

  async fetchAppDetails(
    appId: string,
    country: string,
    locale = "en_US"
  ): Promise<AppInfo> {
    const real = async () => {
      (gplay as any).requestOptions = {
        headers: { "User-Agent": getRandomUserAgent() },
      };

      const raw = (await withRetry(() =>
        gplay.app({ appId, country, lang: locale })
      )) as any;

      return mapGoogleToAppInfo(
        { ...raw, _scrapeMode: "REAL_API" },
        { country, locale }
      );
    };

    const html = async () => {
      const raw = await fetchAppHtmlFallback.details({ appId, country, locale });
      return mapGoogleToAppInfo(raw, { country, locale });
    };

    const dummy = async () =>
      mapGoogleToAppInfo(
        {
          appId,
          title: "Dummy App",
          score: 0,
          _scrapeMode: "DUMMY_FALLBACK",
        },
        { country, locale }
      );

    return this.withFallback(real, html, dummy);
  }

  async fetchReviews(
    appId: string,
    country: string,
    locale = "en_US",
    cursor?: any
  ): Promise<{ data: any[]; nextPaginationToken?: any }> {
    const real = async () => {
      (gplay as any).requestOptions = {
        headers: { "User-Agent": getRandomUserAgent() },
      };

      const result = (await withRetry(() =>
        gplay.reviews({
          appId,
          country,
          lang: locale,
          sort: (gplay.sort as any).NEWEST,
          num: 200,
          paginate: true,
          nextPaginationToken: cursor,
        })
      )) as any;

      return {
        data: result.data || [],
        nextPaginationToken: result.nextPaginationToken || null,
      };
    };

    const html = async () => {
      const fallback = await fetchAppHtmlFallback.reviews({
        appId,
        country,
        locale,
        cursor,
      });
      return {
        data: fallback.data || [],
        nextPaginationToken:
          fallback.nextPaginationToken === undefined
            ? null
            : fallback.nextPaginationToken,
      };
    };

    const dummy = async () => ({ data: [], nextPaginationToken: null as any });

    return this.withFallback(real, html, dummy);
  }

  async fetchSimilarApps(appId: string, country: string): Promise<string[]> {
    const real = async () => {
      (gplay as any).requestOptions = {
        headers: { "User-Agent": getRandomUserAgent() },
      };

      const similar = (await withRetry(() =>
        gplay.similar({ appId, country })
      )) as any[];

      return (similar || []).map((a: any) => a?.appId).filter(Boolean);
    };

    const html = async () => [];
    const dummy = async () => [];

    return this.withFallback(real, html, dummy);
  }

  async fetchDeveloperApps(devId: string, country: string): Promise<string[]> {
    const real = async () => {
      (gplay as any).requestOptions = {
        headers: { "User-Agent": getRandomUserAgent() },
      };

      const apps = (await withRetry(() =>
        gplay.developer({ devId, country })
      )) as any[];

      return (apps || []).map((a: any) => a?.appId).filter(Boolean);
    };

    const html = async () => [];
    const dummy = async () => [];

    return this.withFallback(real, html, dummy);
  }
}


