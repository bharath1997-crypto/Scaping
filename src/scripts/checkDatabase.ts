import "dotenv/config";
import { prisma } from "../utils/prisma.ts";

async function main() {
  console.log("📊 Database Status Check\n");

  // Count apps by store
  const appsByStore = await prisma.app.groupBy({
    by: ["store"],
    _count: { id: true },
  });

  console.log("📱 Apps by Store:");
  appsByStore.forEach((a) => {
    console.log(`   ${a.store}: ${a._count.id} apps`);
  });

  const totalApps = await prisma.app.count();
  console.log(`\n   Total Apps: ${totalApps}`);

  // Count raw snapshots
  const rawSnapshots = await prisma.rawAppSnapshot.count();
  console.log(`\n📸 Raw Snapshots: ${rawSnapshots}`);

  // Count reviews
  const reviews = await prisma.review.count();
  console.log(`💬 Reviews: ${reviews}`);

  // Count rankings
  const rankings = await prisma.appRanking.count();
  console.log(`📈 Rankings: ${rankings}`);

  // Count daily stats
  const dailyStats = await prisma.appDailyStat.count();
  console.log(`📅 Daily Stats: ${dailyStats}`);

  await prisma.$disconnect();
}

main().catch(console.error);

