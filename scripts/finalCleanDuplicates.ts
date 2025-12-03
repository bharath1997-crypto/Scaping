/**
 * Final aggressive cleanup of AppDailyStat duplicates
 * This ensures NO duplicates exist before applying unique constraint
 */

import { prisma } from "../src/utils/prisma.ts";

async function finalClean() {
  console.log("🔍 Final check for AppDailyStat duplicates...");

  // First, normalize all dates to midnight
  console.log("📅 Step 1: Normalizing all dates to midnight...");
  await prisma.$executeRaw`
    UPDATE "AppDailyStat"
    SET "date" = DATE("date")
  `;
  console.log("✅ Dates normalized");

  // Check for duplicates using exact date comparison (not DATE function)
  console.log("\n🔍 Step 2: Finding duplicates (exact match)...");
  const duplicates = await prisma.$queryRaw<Array<{
    appIdRef: string;
    date: Date;
    country: string;
    count: bigint;
  }>>`
    SELECT 
      "appIdRef", 
      "date", 
      "country", 
      COUNT(*) as count
    FROM "AppDailyStat"
    GROUP BY "appIdRef", "date", "country"
    HAVING COUNT(*) > 1
    ORDER BY count DESC
    LIMIT 50
  `;

  if (duplicates.length === 0) {
    console.log("✅ No duplicates found! Safe to apply constraint.");
    return;
  }

  console.log(`⚠️  Found ${duplicates.length} duplicate groups:`);
  duplicates.slice(0, 10).forEach((dup) => {
    console.log(
      `  - appIdRef: ${dup.appIdRef.substring(0, 20)}..., date: ${dup.date.toISOString()}, country: ${dup.country}, count: ${dup.count}`
    );
  });

  // Delete ALL duplicates except the one with the smallest ID (oldest)
  console.log("\n🧹 Step 3: Deleting duplicates (keeping oldest by id)...");
  const result = await prisma.$executeRaw`
    DELETE FROM "AppDailyStat" a
    WHERE EXISTS (
      SELECT 1
      FROM "AppDailyStat" b
      WHERE 
        b."appIdRef" = a."appIdRef"
        AND b."date" = a."date"
        AND b."country" = a."country"
        AND b."id" < a."id"
    )
  `;

  console.log(`✅ Deleted ${result} duplicate rows`);

  // Final verification
  console.log("\n✅ Step 4: Final verification...");
  const remaining = await prisma.$queryRaw<Array<{
    count: bigint;
  }>>`
    SELECT COUNT(*) as count
    FROM (
      SELECT "appIdRef", "date", "country", COUNT(*) as cnt
      FROM "AppDailyStat"
      GROUP BY "appIdRef", "date", "country"
      HAVING COUNT(*) > 1
    ) duplicates
  `;

  if (remaining[0]?.count === BigInt(0)) {
    console.log("✅✅✅ VERIFICATION PASSED: No duplicates remain!");
    console.log("\n🎯 Safe to run: npx prisma db push");
  } else {
    console.log(`❌ ERROR: ${remaining[0]?.count} duplicate groups still exist`);
    console.log("⚠️  Cannot apply unique constraint until duplicates are removed");
  }
}

finalClean()
  .catch((error) => {
    console.error("❌ Error:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

