import axios from "axios";
import * as cheerio from "cheerio";
import type { AppInfo } from "../../types/appInfo.ts";

const USER_AGENTS: string[] = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15",
  "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:123.0) Gecko/20100101 Firefox/123.0",
];

function getRandomUserAgent(): string {
  return USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
}

export const fetchAppHtmlFallback = {
  async topCharts({
    country,
    chartType,
    limit = 100,
  }: {
    country: string;
    chartType: string;
    limit?: number;
  }): Promise<{ appId: string; rank: number }[]> {
    // Simplified HTML fallback - returns empty for now
    // Can be enhanced later with actual HTML parsing
    return [];
  },

  async categoryTop({
    country,
    category,
    limit = 100,
  }: {
    country: string;
    category: string;
    limit?: number;
  }): Promise<{ appId: string; rank: number }[]> {
    return [];
  },

  async details({
    appId,
    country,
    locale,
  }: {
    appId: string;
    country: string;
    locale?: string;
  }): Promise<any> {
    const url = `https://play.google.com/store/apps/details?id=${encodeURIComponent(appId)}&hl=${locale || "en"}&gl=${country.toUpperCase()}`;

    try {
      const response = await axios.get(url, {
        headers: { "User-Agent": getRandomUserAgent() },
      });

      const $ = cheerio.load(response.data);

      const title =
        $("h1 span").first().text().trim() ||
        $('meta[property="og:title"]').attr("content") ||
        "Unknown App";

      const developer =
        $('a[href*="id="][itemprop="name"]').first().text().trim() ||
        $('meta[itemprop="name"]').attr("content") ||
        "Unknown Developer";

      const scoreText =
        $('div[aria-label*="rated"]').attr("aria-label") ||
        $('div[aria-label*="Rating"]').attr("aria-label") ||
        "";
      const scoreMatch = scoreText.match(/([0-9.]+)\s+stars?/i);
      const score = scoreMatch ? parseFloat(scoreMatch[1]) : undefined;

      const installsText =
        $('div[aria-label*="downloads"]').attr("aria-label") ||
        $('div[aria-label*="installs"]').attr("aria-label") ||
        "";

      return {
        appId,
        title,
        developer,
        score,
        installs: installsText || undefined,
        _scrapeMode: "HTML_BACKUP",
      };
    } catch (error) {
      throw error;
    }
  },

  async reviews({
    appId,
    country,
    locale,
    cursor,
  }: {
    appId: string;
    country: string;
    locale?: string;
    cursor?: any;
  }): Promise<{ data: any[]; nextPaginationToken?: any }> {
    // HTML fallback for reviews is complex, return empty for now
    return { data: [], nextPaginationToken: null };
  },
};


