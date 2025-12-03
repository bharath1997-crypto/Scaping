import "dotenv/config";
import "../workers/index.ts";
import "../schedulers/sixHour.scheduler.ts";
import "../schedulers/daily.scheduler.ts";

console.log("[Workers] Worker process started. Press Ctrl+C to stop.");

// Keep process alive
process.on("SIGINT", () => {
  console.log("\n[Workers] Shutting down...");
  process.exit(0);
});


