## Plan: Apple App Store Support

### Overview
Mirror the Google Play pipeline for Apple: connector, mapping, scraping services, raw snapshots, and API availability.

### Tasks
1. **Apple Connector Skeleton**
   - Create `src/connectors/appleAppStore` directory with:
     - `appleAppStoreConnector.ts` implementing `BaseConnector`
     - `appleAppStore.mapper.ts` converting Apple raw data to `AppInfo`
     - `appleAppStore.html.ts` (if HTML fallback needed)

2. **App Store Data Source**
   - Integrate with chosen Apple source (e.g., `app-store-scraper` npm package or custom fetch)
   - Implement methods:
     - `fetchTopCharts`
     - `fetchAppDetails`
     - `fetchReviews`
     - Optional: `fetchCategoryTop`, `fetchSimilarApps`

3. **Connector Registry**
   - Update `src/connectors/index.ts` to return `AppleAppStoreConnector` when `store === "APPLE_APP_STORE"`.

4. **Mapper & Types**
   - Ensure `AppInfo` fields align with Apple payload (screenshots, ratings, age rating, etc.)
   - Build mapper similar to Google’s (three-tier fallback if possible).

5. **Scraper Service Integration**
   - Extend `ScraperService` flows to handle Apple (discovery, scrapeAndSaveApp, scrapeAndSaveReviews).
   - Add Apple-specific discovery jobs (charts, categories).

6. **Queues / Schedulers (Optional)**
   - If using BullMQ, add Apple jobs to `discoveryQueue`, `detailsQueue`, etc.
   - Schedule Apple scraping intervals similar to Google.

7. **Raw Snapshots + Upserts**
   - Snapshots already handle multiple stores; ensure Apple pipe calls `saveRawSnapshot`.
   - Upsert logic should work via `store_appId` uniqueness.

8. **Testing**
   - Run Apple scrape command (new script, e.g., `npm run scrape:apple`).
   - Verify data in Prisma Studio and via APIs (`/api/v1/apps/APPLE_APP_STORE/...`).

9. **Docs / Commands**
   - Update `PROJECT_DOCUMENTATION.md` or `PROCESS_LOG.md` with Apple support and commands.

