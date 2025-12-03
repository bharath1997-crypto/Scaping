/**
 * Normalize all AppDailyStat dates to midnight (00:00:00)
 * This ensures consistent date comparison for the unique constraint
 */

import { prisma } from "../src/utils/prisma.ts";

async function normalizeDates() {
  console.log("🔄 Normalizing AppDailyStat dates to midnight...");

  // Update all dates to midnight (start of day)
  const result = await prisma.$executeRaw`
    UPDATE "AppDailyStat"
    SET "date" = DATE("date")
    WHERE "date" != DATE("date")
  `;

  console.log(`✅ Normalized ${result} date values`);

  // Verify no duplicates remain
  const duplicates = await prisma.$queryRaw<Array<{
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

  if (duplicates[0]?.count === BigInt(0)) {
    console.log("✅ No duplicates remain after normalization!");
  } else {
    console.log(`⚠️  Warning: ${duplicates[0]?.count} duplicate groups still exist`);
  }
}

normalizeDates()
  .catch((error) => {
    console.error("❌ Error normalizing dates:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

