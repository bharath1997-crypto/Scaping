import "dotenv/config";
import { Store } from "@prisma/client";
import { ScraperService } from "../services/scraperService.ts";

// 1. Which stores are active right now
// NOTE: Samsung Galaxy Store temporarily disabled due to 404 errors (URL structure unknown)
// Will be re-enabled once Puppeteer solution or API endpoints are found
const ACTIVE_STORES: Store[] = [
  Store.GOOGLE_PLAY,
  Store.APPLE_APP_STORE,
  // Store.SAMSUNG_GALAXY_STORE, // Temporarily disabled - see SAMSUNG_GALAXY_STORE_ISSUE_ANALYSIS.md
  // Store.HUAWEI_APP_GALLERY,    // Web scraping implementation - needs testing
  // Store.XIAOMI_MI_STORE,       // Web scraping implementation - needs testing
];

// 2. Regions per store (you can expand later)
const REGIONS_BY_STORE = {
  [Store.GOOGLE_PLAY]: ["us", "in", "br", "gb", "id"],
  [Store.APPLE_APP_STORE]: ["us", "in", "gb"],
  [Store.SAMSUNG_GALAXY_STORE]: ["us", "in"],
  [Store.HUAWEI_APP_GALLERY]: ["us", "in"],
  [Store.XIAOMI_MI_STORE]: ["us", "in"],
  [Store.OTHER]: [],
} as Record<Store, string[]>;

// 3. Store-specific discovery runners
async function runStoreDiscovery(store: Store, country: string) {
  console.log(
    `\n[Runner] 🚀 Starting FULL discovery → store=${store} country=${country}`
  );

  try {
    switch (store) {
      case Store.GOOGLE_PLAY:
        await ScraperService.discoverGooglePlay({ country });
        break;

      case Store.APPLE_APP_STORE:
        await ScraperService.discoverAppleAppStore({ country });
        break;

      case Store.SAMSUNG_GALAXY_STORE:
        await ScraperService.discoverSamsungGalaxyStore({ country });
        break;

      case Store.HUAWEI_APP_GALLERY:
        await ScraperService.discoverHuaweiAppGallery({ country });
        break;

      case Store.XIAOMI_MI_STORE:
        await ScraperService.discoverXiaomiMiStore({ country });
        break;

      default:
        console.warn(`[Runner] ⚠️ No discovery pipeline implemented for store=${store}`);
        return;
    }

    console.log(
      `[Runner] ✅ Completed discovery → store=${store} country=${country}`
    );
  } catch (err) {
    console.error(
      `[Runner] ❗ Error during discovery → store=${store} country=${country}`,
      err
    );
  }
}

async function main() {
  const args = process.argv.slice(2);

  // Optional single-store mode:
  // npm run scrape google | apple | samsung | huawei | mi
  if (args.length > 0) {
    const arg = args[0].toLowerCase();

    let targetStore: Store | null = null;
    if (arg === "google") targetStore = Store.GOOGLE_PLAY;
    if (arg === "apple") targetStore = Store.APPLE_APP_STORE;
    if (arg === "samsung") targetStore = Store.SAMSUNG_GALAXY_STORE;
    if (arg === "huawei") targetStore = Store.HUAWEI_APP_GALLERY;
    if (arg === "mi" || arg === "xiaomi") targetStore = Store.XIAOMI_MI_STORE;

    if (!targetStore) {
      console.error(`[Runner] ❌ Unknown store argument: ${arg}`);
      return;
    }

    const regions = REGIONS_BY_STORE[targetStore] ?? [];
    if (!regions.length) {
      console.warn(
        `[Runner] ⚠️ No regions configured for store=${targetStore}, nothing to do`
      );
      return;
    }

    console.log(
      `[Runner] 🌍 Starting discovery for ONE store=${targetStore} regions=${regions.join(",")}`
    );
    for (const country of regions) {
      await runStoreDiscovery(targetStore, country);
    }
    console.log(`\n[Runner] 🎉 Store=${targetStore} discovery completed.`);
    return;
  }

  // Default: run ALL active stores, ALL regions
  console.log(
    `[Runner] 🌍 Starting discovery for ALL stores: ${ACTIVE_STORES.join(", ")}`
  );

  for (const store of ACTIVE_STORES) {
    const regions = REGIONS_BY_STORE[store] ?? [];
    if (!regions.length) {
      console.warn(`[Runner] ⚠️ No regions configured for store=${store}, skipping`);
      continue;
    }

    for (const country of regions) {
      await runStoreDiscovery(store, country);
    }
  }

  console.log(`\n[Runner] 🎉 ALL STORE DISCOVERIES COMPLETED.`);
}

main().catch((err) => {
  console.error("[Runner] FATAL ERROR:", err);
  process.exit(1);
});
