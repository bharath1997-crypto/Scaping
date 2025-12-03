import axios from "axios";
import * as cheerio from "cheerio";

const USER_AGENTS = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  "Mozilla/5.0 (HUAWEI; LIO-AL00) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Mobile Safari/537.36",
];

function getRandomUserAgent(): string {
  return USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
}

/**
 * Web scraping utilities for Huawei App Gallery
 */
export const huaweiWebScraper = {
  async fetchTopCharts({
    country,
    chartType,
    limit = 100,
  }: {
    country: string;
    chartType: string;
    limit?: number;
  }): Promise<{ appId: string; rank: number }[]> {
    try {
      const baseUrl = `https://appgallery.huawei.com`;
      const chartMap: Record<string, string> = {
        TOP_FREE: "top-free",
        TOP_PAID: "top-paid",
        TOP_GROSSING: "top-grossing",
      };
      
      const chartPath = chartMap[chartType] || "top-free";
      const url = `${baseUrl}/apps/${chartPath}?locale=${country}`;
      
      const response = await axios.get(url, {
        headers: {
          "User-Agent": getRandomUserAgent(),
          "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        },
        timeout: 10000,
      });
      
      const $ = cheerio.load(response.data);
      const apps: { appId: string; rank: number }[] = [];
      
      $(".app-item, .app-card, [data-app-id]").each((index, element) => {
        if (apps.length >= limit) return false;
        
        const $el = $(element);
        const appId = $el.attr("data-app-id") || 
                     $el.find("a").attr("href")?.match(/\/app\/([^\/]+)/)?.[1] ||
                     "";
        
        if (appId) {
          apps.push({ appId, rank: apps.length + 1 });
        }
      });
      
      return apps.slice(0, limit);
    } catch (error) {
      console.error(`[HuaweiWebScraper] Error fetching top charts:`, error);
      return [];
    }
  },

  async fetchCategoryTop({
    country,
    category,
    limit = 100,
  }: {
    country: string;
    category: string;
    limit?: number;
  }): Promise<{ appId: string; rank: number }[]> {
    try {
      const baseUrl = `https://appgallery.huawei.com`;
      const categorySlug = category.toLowerCase().replace(/\s+/g, "-");
      const url = `${baseUrl}/apps/category/${categorySlug}?locale=${country}`;
      
      const response = await axios.get(url, {
        headers: { "User-Agent": getRandomUserAgent() },
        timeout: 10000,
      });
      
      const $ = cheerio.load(response.data);
      const apps: { appId: string; rank: number }[] = [];
      
      $(".app-item, .app-card, [data-app-id]").each((index, element) => {
        if (apps.length >= limit) return false;
        const $el = $(element);
        const appId = $el.attr("data-app-id") || 
                     $el.find("a").attr("href")?.match(/\/app\/([^\/]+)/)?.[1] ||
                     "";
        if (appId) apps.push({ appId, rank: apps.length + 1 });
      });
      
      return apps.slice(0, limit);
    } catch (error) {
      console.error(`[HuaweiWebScraper] Error fetching category top:`, error);
      return [];
    }
  },

  async fetchAppDetails(appId: string, country: string): Promise<any> {
    try {
      const baseUrl = `https://appgallery.huawei.com`;
      const url = `${baseUrl}/app/${appId}?locale=${country}`;
      
      const response = await axios.get(url, {
        headers: { "User-Agent": getRandomUserAgent() },
        timeout: 10000,
      });
      
      const $ = cheerio.load(response.data);
      
      const raw = {
        appId,
        title: $("h1.app-title, .app-name").first().text().trim(),
        summary: $(".app-summary, .app-short-description").first().text().trim(),
        description: $(".app-description").text().trim(),
        developer: $(".app-developer").first().text().trim(),
        score: parseFloat($(".app-rating").first().text().trim()) || undefined,
        ratings: parseInt($(".app-rating-count").first().text().replace(/\D/g, "")) || undefined,
        price: $(".app-price").first().text().trim(),
        icon: $(".app-icon img").first().attr("src"),
        screenshots: $(".app-screenshots img").map((_, el) => $(el).attr("src")).get(),
        _scrapeMode: "HTML_BACKUP" as const,
      };
      
      return raw;
    } catch (error) {
      console.error(`[HuaweiWebScraper] Error fetching app details:`, error);
      throw error;
    }
  },
};

