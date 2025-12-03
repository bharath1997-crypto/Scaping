import axios from "axios";
import * as cheerio from "cheerio";
import type { AppInfo } from "../../types/appInfo.ts";

const USER_AGENTS = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Samsung; SM-G998B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Mobile Safari/537.36",
];

function getRandomUserAgent(): string {
  return USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
}

/**
 * Web scraping utilities for Samsung Galaxy Store
 * Note: Samsung Galaxy Store uses dynamic content, so this is a basic implementation
 * that may need enhancement based on actual store structure
 */
export const samsungWebScraper = {
  /**
   * Fetch top charts from Samsung Galaxy Store
   */
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
      // Samsung Galaxy Store URL structure
      const baseUrl = `https://galaxystore.samsung.com`;
      const countryCode = country.toUpperCase();
      
      // Map chart types to Samsung endpoints
      const chartMap: Record<string, string> = {
        TOP_FREE: "top-free",
        TOP_PAID: "top-paid",
        TOP_GROSSING: "top-grossing",
      };
      
      const chartPath = chartMap[chartType] || "top-free";
      const url = `${baseUrl}/apps/${chartPath}?country=${countryCode}`;
      
      const response = await axios.get(url, {
        headers: {
          "User-Agent": getRandomUserAgent(),
          "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.9",
        },
        timeout: 10000,
      });
      
      const $ = cheerio.load(response.data);
      const apps: { appId: string; rank: number }[] = [];
      
      // Parse app listings from HTML
      // Note: This selector may need adjustment based on actual Samsung Galaxy Store HTML structure
      $(".app-item, .app-card, [data-app-id]").each((index, element) => {
        if (apps.length >= limit) return false;
        
        const $el = $(element);
        const appId = $el.attr("data-app-id") || 
                     $el.find("a").attr("href")?.match(/\/app\/([^\/]+)/)?.[1] ||
                     $el.attr("data-package-name") ||
                     "";
        
        if (appId) {
          apps.push({
            appId,
            rank: apps.length + 1,
          });
        }
      });
      
      return apps.slice(0, limit);
    } catch (error: any) {
      // Don't log 404 errors as errors - they're expected
      if (error?.response?.status !== 404) {
        console.error(`[SamsungWebScraper] Error fetching top charts:`, error?.message || error);
      }
      return [];
    }
  },

  /**
   * Fetch category top apps
   */
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
      const baseUrl = `https://galaxystore.samsung.com`;
      const countryCode = country.toUpperCase();
      const categorySlug = category.toLowerCase().replace(/_/g, "-");
      
      // Try multiple URL patterns
      const urlPatterns = [
        `${baseUrl}/apps/category/${categorySlug}?country=${countryCode}`,
        `${baseUrl}/apps/category/${categorySlug}?country=${country.toLowerCase()}`,
        `${baseUrl}/apps/category/${categorySlug}`,
      ];
      
      for (const url of urlPatterns) {
        try {
          const response = await axios.get(url, {
            headers: {
              "User-Agent": getRandomUserAgent(),
              "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            },
            timeout: 10000,
            validateStatus: (status) => status < 500, // Don't throw on 404
          });
          
          // If 404, try next pattern
          if (response.status === 404) {
            continue;
          }
          
          const $ = cheerio.load(response.data);
          const apps: { appId: string; rank: number }[] = [];
          
          // Try multiple selectors
          $(".app-item, .app-card, [data-app-id], .app-list-item, .product-item").each((index, element) => {
            if (apps.length >= limit) return false;
            
            const $el = $(element);
            const appId = $el.attr("data-app-id") || 
                         $el.attr("data-product-id") ||
                         $el.find("a").attr("href")?.match(/\/app\/([^\/\?]+)/)?.[1] ||
                         $el.find("a").attr("href")?.match(/productId=([^&]+)/)?.[1] ||
                         "";
            
            if (appId && appId.length > 0) {
              apps.push({
                appId,
                rank: apps.length + 1,
              });
            }
          });
          
          if (apps.length > 0) {
            return apps.slice(0, limit);
          }
        } catch (err: any) {
          // Continue to next pattern
          if (err?.response?.status !== 404) {
            console.log(`[SamsungWebScraper] Error with URL ${url}:`, err?.message);
          }
          continue;
        }
      }
      
      // If all patterns failed, return empty array (don't log as error - 404s are expected)
      return [];
    } catch (error: any) {
      // Don't log 404 errors as errors - they're expected for invalid categories
      if (error?.response?.status !== 404) {
        console.error(`[SamsungWebScraper] Error fetching category top:`, error?.message || error);
      }
      return [];
    }
  },

  /**
   * Fetch app details
   */
  async fetchAppDetails(
    appId: string,
    country: string
  ): Promise<any> {
    try {
      const baseUrl = `https://galaxystore.samsung.com`;
      const countryCode = country.toUpperCase();
      const url = `${baseUrl}/app/${appId}?country=${countryCode}`;
      
      const response = await axios.get(url, {
        headers: {
          "User-Agent": getRandomUserAgent(),
          "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        },
        timeout: 10000,
      });
      
      const $ = cheerio.load(response.data);
      
      // Extract app details from HTML
      // Note: These selectors need to be adjusted based on actual Samsung Galaxy Store structure
      const raw = {
        appId,
        title: $("h1.app-title, .app-name").first().text().trim(),
        summary: $(".app-summary, .app-short-description").first().text().trim(),
        description: $(".app-description, .app-long-description").text().trim(),
        developer: $(".app-developer, .developer-name").first().text().trim(),
        score: parseFloat($(".app-rating, .rating-value").first().text().trim()) || undefined,
        ratings: parseInt($(".app-rating-count, .rating-count").first().text().replace(/\D/g, "")) || undefined,
        price: $(".app-price, .price").first().text().trim(),
        icon: $(".app-icon img, .app-logo img").first().attr("src"),
        screenshots: $(".app-screenshots img, .screenshot img").map((_, el) => $(el).attr("src")).get(),
        _scrapeMode: "HTML_BACKUP" as const,
      };
      
      return raw;
    } catch (error) {
      console.error(`[SamsungWebScraper] Error fetching app details:`, error);
      throw error;
    }
  },
};

