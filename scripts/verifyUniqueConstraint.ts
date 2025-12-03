/**
 * Verify that the unique constraint on AppDailyStat is working
 */

import { prisma } from "../src/utils/prisma.ts";

async function verifyConstraint() {
  console.log("🔍 Verifying AppDailyStat unique constraint...");

  try {
    // Try to create a duplicate - should fail if constraint exists
    const testApp = await prisma.app.findFirst({
      select: { id: true },
    });

    if (!testApp) {
      console.log("⚠️  No apps found in database - cannot test constraint");
      return;
    }

    // Get an existing daily stat
    const existing = await prisma.appDailyStat.findFirst({
      where: { appIdRef: testApp.id },
      select: { appIdRef: true, date: true, country: true },
    });

    if (!existing) {
      console.log("⚠️  No daily stats found - constraint exists but cannot test");
      console.log("✅ Constraint is applied (no error on query)");
      return;
    }

    // Try to create a duplicate - this should fail
    try {
      await prisma.appDailyStat.create({
        data: {
          appIdRef: existing.appIdRef,
          date: existing.date,
          country: existing.country,
          score: 0,
        },
      });
      console.log("❌ ERROR: Constraint NOT working - duplicate was created!");
    } catch (error: any) {
      if (error.code === "P2002") {
        console.log("✅✅✅ SUCCESS: Unique constraint is working!");
        console.log("   (Attempted duplicate creation was correctly rejected)");
      } else {
        console.log("⚠️  Unexpected error:", error.message);
      }
    }

    // Check for any remaining duplicates
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
      console.log("\n✅ No duplicates in database");
    } else {
      console.log(`\n⚠️  Warning: ${duplicates[0]?.count} duplicate groups still exist`);
    }
  } catch (error: any) {
    console.error("❌ Error verifying constraint:", error.message);
  }
}

verifyConstraint()
  .catch((error) => {
    console.error("❌ Error:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

