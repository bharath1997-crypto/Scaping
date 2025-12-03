/**
 * Clean duplicate AppDailyStat rows before adding unique constraint
 * 
 * This script removes duplicate rows, keeping only the oldest one (by createdAt)
 * for each (appIdRef, date, country) combination.
 */

import { prisma } from "../src/utils/prisma.ts";

async function cleanDuplicates() {
  console.log("🔍 Finding duplicate AppDailyStat rows...");

  // Find duplicates
  const duplicates = await prisma.$queryRaw<Array<{
    appIdRef: string;
    date: Date;
    country: string;
    count: bigint;
  }>>`
    SELECT 
      "appIdRef", 
      DATE("date") as "date", 
      "country", 
      COUNT(*) as count
    FROM "AppDailyStat"
    GROUP BY "appIdRef", DATE("date"), "country"
    HAVING COUNT(*) > 1
    ORDER BY count DESC
  `;

  if (duplicates.length === 0) {
    console.log("✅ No duplicates found! Database is clean.");
    return;
  }

  console.log(`⚠️  Found ${duplicates.length} duplicate groups:`);
  duplicates.slice(0, 10).forEach((dup) => {
    console.log(
      `  - appIdRef: ${dup.appIdRef}, date: ${dup.date}, country: ${dup.country}, count: ${dup.count}`
    );
  });

  console.log("\n🧹 Cleaning duplicates (keeping oldest by createdAt)...");

  // Delete duplicates, keeping the oldest one (by createdAt)
  const result = await prisma.$executeRaw`
    DELETE FROM "AppDailyStat" a
    USING "AppDailyStat" b
    WHERE
      a."id" != b."id"
      AND a."appIdRef" = b."appIdRef"
      AND DATE(a."date") = DATE(b."date")
      AND a."country" = b."country"
      AND a."createdAt" > b."createdAt"
  `;

  console.log(`✅ Deleted ${result} duplicate rows`);

  // Verify no duplicates remain
  const remaining = await prisma.$queryRaw<Array<{
    count: bigint;
  }>>`
    SELECT COUNT(*) as count
    FROM (
      SELECT "appIdRef", DATE("date") as "date", "country", COUNT(*) as cnt
      FROM "AppDailyStat"
      GROUP BY "appIdRef", DATE("date"), "country"
      HAVING COUNT(*) > 1
    ) duplicates
  `;

  if (remaining[0]?.count === BigInt(0)) {
    console.log("✅ Verification passed: No duplicates remain!");
  } else {
    console.log(`⚠️  Warning: ${remaining[0]?.count} duplicate groups still exist`);
  }
}

cleanDuplicates()
  .catch((error) => {
    console.error("❌ Error cleaning duplicates:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

