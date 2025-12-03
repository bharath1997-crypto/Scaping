import type { AppInfo } from "../types/appInfo.ts";

export abstract class BaseConnector {
  protected store: AppInfo["store"];

  constructor(store: AppInfo["store"]) {
    this.store = store;
  }

  abstract fetchTopCharts(params: {
    country: string;
    chartType: string;
    limit?: number;
  }): Promise<{ appId: string; rank: number }[]>;

  abstract fetchCategoryTop(params: {
    country: string;
    category: string;
    limit?: number;
  }): Promise<{ appId: string; rank: number }[]>;

  abstract fetchAppDetails(
    appId: string,
    country: string,
    locale?: string
  ): Promise<AppInfo>;

  abstract fetchReviews(
    appId: string,
    country: string,
    locale?: string,
    cursor?: any
  ): Promise<{ data: any[]; nextPaginationToken?: any }>;

  abstract fetchSimilarApps(appId: string, country: string): Promise<string[]>;

  abstract fetchDeveloperApps(
    devId: string,
    country: string
  ): Promise<string[]>;

  protected async withFallback<T>(
    real: () => Promise<T>,
    html: () => Promise<T>,
    dummy: () => Promise<T>
  ): Promise<T> {
    try {
      console.log(`[${this.store}] Trying real API...`);
      const result = await real();
      console.log(`[${this.store}] ✓ Real API succeeded`);
      return result;
    } catch (error) {
      console.log(`[${this.store}] ✗ Real API failed:`, (error as Error).message);
      try {
        console.log(`[${this.store}] Trying HTML fallback...`);
        const result = await html();
        console.log(`[${this.store}] ✓ HTML fallback succeeded`);
        return result;
      } catch (htmlError) {
        console.log(`[${this.store}] ✗ HTML fallback failed:`, (htmlError as Error).message);
        console.log(`[${this.store}] Using dummy fallback`);
        return await dummy();
      }
    }
  }
}
