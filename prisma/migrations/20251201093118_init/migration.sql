-- CreateEnum
CREATE TYPE "ScrapeMode" AS ENUM ('REAL_API', 'HTML_BACKUP', 'DUMMY_FALLBACK');

-- CreateEnum
CREATE TYPE "Store" AS ENUM ('GOOGLE_PLAY', 'APPLE_APP_STORE', 'SAMSUNG_GALAXY_STORE', 'HUAWEI_APP_GALLERY', 'OTHER');

-- CreateEnum
CREATE TYPE "ChartType" AS ENUM ('TOP_FREE', 'TOP_PAID', 'TOP_GROSSING', 'TRENDING', 'NEW_APPS', 'CATEGORY_TOP_FREE', 'CATEGORY_TOP_PAID', 'CATEGORY_TOP_GROSSING');

-- CreateTable
CREATE TABLE "App" (
    "id" TEXT NOT NULL,
    "store" "Store" NOT NULL DEFAULT 'GOOGLE_PLAY',
    "appId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT,
    "description" TEXT,
    "url" TEXT,
    "icon" TEXT,
    "headerImage" TEXT,
    "screenshots" JSONB,
    "video" TEXT,
    "developer" TEXT,
    "developerId" TEXT,
    "developerEmail" TEXT,
    "developerWebsite" TEXT,
    "developerAddress" TEXT,
    "developerRefId" TEXT,
    "genre" TEXT,
    "genreId" TEXT,
    "tags" JSONB,
    "categoryRefId" TEXT,
    "score" DOUBLE PRECISION,
    "ratings" BIGINT,
    "reviewCount" BIGINT,
    "histogram" JSONB,
    "star1Count" BIGINT,
    "star2Count" BIGINT,
    "star3Count" BIGINT,
    "star4Count" BIGINT,
    "star5Count" BIGINT,
    "installs" TEXT,
    "minInstalls" BIGINT,
    "maxInstalls" BIGINT,
    "free" BOOLEAN,
    "price" DOUBLE PRECISION,
    "currency" TEXT,
    "offersIAP" BOOLEAN,
    "IAPRange" TEXT,
    "version" TEXT,
    "realVersion" TEXT,
    "updated" TIMESTAMP(3),
    "released" TIMESTAMP(3),
    "size" TEXT,
    "androidVersion" TEXT,
    "androidVersionText" TEXT,
    "contentRating" TEXT,
    "contentRatingDesc" TEXT,
    "privacyPolicy" TEXT,
    "adSupported" BOOLEAN,
    "containsAds" BOOLEAN,
    "recentChanges" TEXT,
    "country" TEXT,
    "lastSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "App_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppDailyStat" (
    "id" TEXT NOT NULL,
    "appIdRef" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "score" DOUBLE PRECISION,
    "ratings" BIGINT,
    "reviewCount" BIGINT,
    "installs" TEXT,
    "minInstalls" BIGINT,
    "maxInstalls" BIGINT,
    "histogram" JSONB,
    "star1Count" BIGINT,
    "star2Count" BIGINT,
    "star3Count" BIGINT,
    "star4Count" BIGINT,
    "star5Count" BIGINT,
    "rank" INTEGER,
    "country" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AppDailyStat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RawScrapeEvent" (
    "id" TEXT NOT NULL,
    "store" "Store" NOT NULL,
    "mode" "ScrapeMode" NOT NULL,
    "appId" TEXT,
    "country" TEXT,
    "payload" JSONB NOT NULL,
    "scrapedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "appIdRef" TEXT,

    CONSTRAINT "RawScrapeEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Developer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Developer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "store" "Store" NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "appIdRef" TEXT NOT NULL,
    "reviewId" TEXT,
    "rating" INTEGER NOT NULL,
    "reviewText" TEXT,
    "reviewDate" TIMESTAMP(3),
    "reviewerName" TEXT,
    "helpfulCount" BIGINT,
    "appVersion" TEXT,
    "country" TEXT,
    "developerReply" TEXT,
    "developerReplyDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppRanking" (
    "id" TEXT NOT NULL,
    "appIdRef" TEXT NOT NULL,
    "chartType" "ChartType" NOT NULL,
    "position" INTEGER NOT NULL,
    "category" TEXT,
    "country" TEXT,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AppRanking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RawAppSnapshot" (
    "id" TEXT NOT NULL,
    "appIdRef" TEXT,
    "store" "Store" NOT NULL,
    "appId" TEXT NOT NULL,
    "country" TEXT,
    "locale" TEXT,
    "rank" INTEGER,
    "chartType" TEXT,
    "category" TEXT,
    "rawPayload" JSONB NOT NULL,
    "scrapeMode" "ScrapeMode" NOT NULL,
    "scrapedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RawAppSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "App_title_idx" ON "App"("title");

-- CreateIndex
CREATE INDEX "App_developer_idx" ON "App"("developer");

-- CreateIndex
CREATE UNIQUE INDEX "App_store_appId_key" ON "App"("store", "appId");

-- CreateIndex
CREATE INDEX "AppDailyStat_date_idx" ON "AppDailyStat"("date");

-- CreateIndex
CREATE INDEX "AppDailyStat_country_idx" ON "AppDailyStat"("country");

-- CreateIndex
CREATE INDEX "RawScrapeEvent_scrapedAt_idx" ON "RawScrapeEvent"("scrapedAt");

-- CreateIndex
CREATE INDEX "RawScrapeEvent_store_idx" ON "RawScrapeEvent"("store");

-- CreateIndex
CREATE INDEX "RawScrapeEvent_mode_idx" ON "RawScrapeEvent"("mode");

-- CreateIndex
CREATE UNIQUE INDEX "Developer_name_key" ON "Developer"("name");

-- CreateIndex
CREATE INDEX "Category_name_idx" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_store_slug_key" ON "Category"("store", "slug");

-- CreateIndex
CREATE INDEX "Review_appIdRef_idx" ON "Review"("appIdRef");

-- CreateIndex
CREATE INDEX "Review_reviewDate_idx" ON "Review"("reviewDate");

-- CreateIndex
CREATE INDEX "Review_rating_idx" ON "Review"("rating");

-- CreateIndex
CREATE INDEX "Review_country_idx" ON "Review"("country");

-- CreateIndex
CREATE INDEX "Review_reviewId_idx" ON "Review"("reviewId");

-- CreateIndex
CREATE INDEX "AppRanking_appIdRef_idx" ON "AppRanking"("appIdRef");

-- CreateIndex
CREATE INDEX "AppRanking_date_idx" ON "AppRanking"("date");

-- CreateIndex
CREATE INDEX "AppRanking_chartType_idx" ON "AppRanking"("chartType");

-- CreateIndex
CREATE INDEX "AppRanking_country_idx" ON "AppRanking"("country");

-- CreateIndex
CREATE INDEX "AppRanking_category_idx" ON "AppRanking"("category");

-- CreateIndex
CREATE UNIQUE INDEX "AppRanking_appIdRef_chartType_category_country_date_key" ON "AppRanking"("appIdRef", "chartType", "category", "country", "date");

-- CreateIndex
CREATE INDEX "RawAppSnapshot_appIdRef_idx" ON "RawAppSnapshot"("appIdRef");

-- CreateIndex
CREATE INDEX "RawAppSnapshot_scrapedAt_idx" ON "RawAppSnapshot"("scrapedAt");

-- CreateIndex
CREATE INDEX "RawAppSnapshot_store_idx" ON "RawAppSnapshot"("store");

-- CreateIndex
CREATE INDEX "RawAppSnapshot_appId_idx" ON "RawAppSnapshot"("appId");

-- CreateIndex
CREATE INDEX "RawAppSnapshot_country_idx" ON "RawAppSnapshot"("country");

-- CreateIndex
CREATE INDEX "RawAppSnapshot_scrapeMode_idx" ON "RawAppSnapshot"("scrapeMode");

-- AddForeignKey
ALTER TABLE "App" ADD CONSTRAINT "App_developerRefId_fkey" FOREIGN KEY ("developerRefId") REFERENCES "Developer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "App" ADD CONSTRAINT "App_categoryRefId_fkey" FOREIGN KEY ("categoryRefId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppDailyStat" ADD CONSTRAINT "AppDailyStat_appIdRef_fkey" FOREIGN KEY ("appIdRef") REFERENCES "App"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RawScrapeEvent" ADD CONSTRAINT "RawScrapeEvent_appIdRef_fkey" FOREIGN KEY ("appIdRef") REFERENCES "App"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_appIdRef_fkey" FOREIGN KEY ("appIdRef") REFERENCES "App"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppRanking" ADD CONSTRAINT "AppRanking_appIdRef_fkey" FOREIGN KEY ("appIdRef") REFERENCES "App"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RawAppSnapshot" ADD CONSTRAINT "RawAppSnapshot_appIdRef_fkey" FOREIGN KEY ("appIdRef") REFERENCES "App"("id") ON DELETE SET NULL ON UPDATE CASCADE;
