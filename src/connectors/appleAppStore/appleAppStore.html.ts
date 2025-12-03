import axios from "axios";
import * as cheerio from "cheerio";

const USER_AGENTS: string[] = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
];

function getRandomUserAgent(): string {
  return USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
}

/**
 * Extract JSON data from script tags (Apple often embeds app data in script tags)
 */
function extractJsonFromScripts($: cheerio.CheerioAPI): any {
  const scripts = $("script[type='application/ld+json']");
  for (let i = 0; i < scripts.length; i++) {
    try {
      const content = $(scripts[i]).html();
      if (content) {
        const parsed = JSON.parse(content);
        if (parsed["@type"] === "SoftwareApplication" || parsed["@type"] === "MobileApplication") {
          return parsed;
        }
      }
    } catch (e) {
      // Skip invalid JSON
    }
  }

  // Also try to find JSON in other script tags
  const allScripts = $("script");
  for (let i = 0; i < allScripts.length; i++) {
    const content = $(allScripts[i]).html();
    if (content && content.includes("application/json")) {
      try {
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          if (parsed && typeof parsed === "object") {
            return parsed;
          }
        }
      } catch (e) {
        // Skip invalid JSON
      }
    }
  }

  return null;
}

/**
 * Parse price string like "$4.99" or "Free" to number and currency
 */
function parsePrice(priceText: string): { price: number | null; free: boolean; currency: string | null } {
  if (!priceText) {
    return { price: null, free: true, currency: null };
  }

  const normalized = priceText.trim().toLowerCase();
  if (normalized === "free" || normalized === "$0" || normalized === "0") {
    return { price: 0, free: true, currency: "USD" };
  }

  // Extract currency symbol and amount
  const match = priceText.match(/([^\d]*)([\d.]+)/);
  if (match) {
    const currencySymbol = match[1].trim();
    const amount = parseFloat(match[2]);
    if (!isNaN(amount)) {
      const currencyMap: Record<string, string> = {
        "$": "USD",
        "€": "EUR",
        "£": "GBP",
        "¥": "JPY",
        "₹": "INR",
      };
      return {
        price: amount,
        free: false,
        currency: currencyMap[currencySymbol] || currencySymbol || "USD",
      };
    }
  }

  return { price: null, free: true, currency: null };
}

/**
 * Extract rating from text like "4.5 stars" or "4.5"
 */
function parseRating(ratingText: string): number | undefined {
  if (!ratingText) return undefined;
  const match = ratingText.match(/([\d.]+)/);
  if (match) {
    const rating = parseFloat(match[1]);
    if (!isNaN(rating) && rating >= 0 && rating <= 5) {
      return rating;
    }
  }
  return undefined;
}

/**
 * Extract number from text like "1.2K reviews" or "1,234 reviews"
 */
function parseNumber(text: string): number | undefined {
  if (!text) return undefined;
  const cleaned = text.replace(/[^\d.KMB]/g, "");
  const match = cleaned.match(/([\d.]+)([KMB]?)/i);
  if (match) {
    let num = parseFloat(match[1]);
    const suffix = match[2].toUpperCase();
    if (suffix === "K") num *= 1000;
    else if (suffix === "M") num *= 1000000;
    else if (suffix === "B") num *= 1000000000;
    return Math.floor(num);
  }
  return undefined;
}

export const fetchAppleHtmlFallback = {
  /**
   * Fetch app details from Apple App Store HTML page
   * Apple App Store URL format: https://apps.apple.com/{country}/app/{app-name}/id{appId}
   * Or: https://apps.apple.com/{country}/app/id{appId}
   */
  async details({
    appId,
    country,
    locale,
  }: {
    appId: string;
    country: string;
    locale?: string;
  }): Promise<any> {
    // Apple App Store URL format requires numeric IDs
    // If appId is a bundle ID (contains dots), we can't use it directly
    // The app-store-scraper library should return numeric IDs, but if we get bundle IDs,
    // we'll need to handle that case differently
    
    // Check if appId is numeric (Apple's format) or bundle ID
    const isNumericId = /^\d+$/.test(appId);
    
    if (!isNumericId) {
      // If it's a bundle ID, we can't reliably scrape HTML without the numeric ID
      // Throw error to trigger dummy fallback
      throw new Error(`App ${appId} uses bundle ID format - HTML scraping requires numeric ID`);
    }

    const countryCode = country.toLowerCase();
    const lang = locale?.split("_")[0]?.toLowerCase() || "en";
    const url = `https://apps.apple.com/${countryCode}/app/id${appId}`;

    try {
      const response = await axios.get(url, {
        headers: {
          "User-Agent": getRandomUserAgent(),
          "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Accept-Language": `${lang}-${countryCode},${lang};q=0.9`,
        },
        timeout: 15000,
        maxRedirects: 5, // Allow redirects but catch protocol errors
      });

      const $ = cheerio.load(response.data);

      // Try to extract JSON-LD structured data first
      const jsonLd = extractJsonFromScripts($);

      // Extract from meta tags (most reliable)
      const title =
        $('meta[property="og:title"]').attr("content") ||
        $('meta[name="apple:title"]').attr("content") ||
        $("h1").first().text().trim() ||
        jsonLd?.name ||
        "Unknown App";

      const subtitle =
        $('meta[property="og:description"]').attr("content") ||
        $('meta[name="apple:subtitle"]').attr("content") ||
        $('meta[name="description"]').attr("content") ||
        jsonLd?.description ||
        undefined;

      const description =
        $('meta[name="apple:description"]').attr("content") ||
        $('meta[property="og:description"]').attr("content") ||
        $(".product-review").first().text().trim() ||
        jsonLd?.description ||
        undefined;

      const developer =
        $('meta[name="apple:developer"]').attr("content") ||
        $('a[href*="/developer/"]').first().text().trim() ||
        $(".product-header__identity").find("a").first().text().trim() ||
        jsonLd?.author?.name ||
        "Unknown Developer";

      const icon =
        $('meta[property="og:image"]').attr("content") ||
        $('meta[name="apple:icon"]').attr("content") ||
        $('link[rel="apple-touch-icon"]').attr("href") ||
        jsonLd?.image ||
        undefined;

      // Extract price
      const priceText =
        $('meta[property="product:price:amount"]').attr("content") ||
        $(".product-header__price").text().trim() ||
        $('meta[name="apple:price"]').attr("content") ||
        jsonLd?.offers?.price ||
        undefined;

      const { price, free, currency } = parsePrice(priceText || "");

      // Extract rating/score
      const ratingText =
        $('meta[property="product:rating"]').attr("content") ||
        $('meta[name="apple:rating"]').attr("content") ||
        $(".we-rating-count").text().trim() ||
        $('[aria-label*="rating"]').attr("aria-label") ||
        jsonLd?.aggregateRating?.ratingValue ||
        undefined;

      const score = parseRating(ratingText || "");

      // Extract ratings count
      const ratingsText =
        $('meta[property="product:rating:count"]').attr("content") ||
        $(".we-rating-count").text().trim() ||
        $('[aria-label*="rating"]').attr("aria-label") ||
        jsonLd?.aggregateRating?.ratingCount ||
        undefined;

      const ratings = parseNumber(ratingsText || "");

      // Extract genre/category
      const genre =
        $('meta[property="product:category"]').attr("content") ||
        $('meta[name="apple:category"]').attr("content") ||
        $('a[href*="/genre/"]').first().text().trim() ||
        jsonLd?.applicationCategory ||
        undefined;

      // Extract screenshots
      const screenshots: string[] = [];
      $('meta[property="og:image"]').each((_, el) => {
        const img = $(el).attr("content");
        if (img && !screenshots.includes(img)) {
          screenshots.push(img);
        }
      });
      $(".we-artwork__image, .product-screenshot").each((_, el) => {
        const img = $(el).attr("src") || $(el).attr("data-src");
        if (img && !screenshots.includes(img)) {
          screenshots.push(img);
        }
      });

      // Extract version (if available)
      const version =
        $('meta[name="apple:version"]').attr("content") ||
        $(".version").text().trim() ||
        undefined;

      // Extract content rating
      const contentRating =
        $('meta[name="apple:content-rating"]').attr("content") ||
        $(".product-header__badge").text().trim() ||
        undefined;

      // Extract release date
      const released =
        $('meta[property="product:release_date"]').attr("content") ||
        jsonLd?.datePublished ||
        undefined;

      // Extract size (if available)
      const size =
        $('meta[name="apple:size"]').attr("content") ||
        $(".product-header__size").text().trim() ||
        undefined;

      // Build URL
      const appUrl = url;

      return {
        appId,
        id: appId,
        title: title.trim(),
        subtitle: subtitle?.trim(),
        description: description?.trim(),
        developer: developer.trim(),
        icon: icon?.trim(),
        screenshots: screenshots.length > 0 ? screenshots : undefined,
        price,
        free,
        currency,
        score,
        ratings,
        reviews: ratings, // Apple doesn't distinguish between ratings and reviews
        genre,
        version,
        contentRating,
        released,
        updated: released, // Use released as updated if updated not available
        size,
        url: appUrl,
        _scrapeMode: "HTML_BACKUP",
      };
    } catch (error: any) {
      // Handle different error types
      if (error?.response?.status === 404) {
        throw new Error(`App ${appId} not found on App Store`);
      }
      
      // Handle redirect to itms-appss:// protocol (App Store app)
      if (error?.message?.includes("itms-appss") || 
          error?.message?.includes("Unsupported protocol") ||
          error?.code === "ERR_UNSUPPORTED_PROTOCOL") {
        throw new Error(`App ${appId} redirects to App Store app - cannot scrape HTML`);
      }
      
      // Re-throw other errors
      throw error;
    }
  },
};

