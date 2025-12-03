import gplay from "google-play-scraper";

async function main() {
  console.log("Testing google-play-scraper...");
  console.log("Available collections:", Object.keys(gplay.collection));
  
  try {
    const apps = await gplay.list({
      collection: gplay.collection.TOP_FREE,
      num: 5,
      country: "us",
    });

    console.log(`\n✓ Got ${apps.length} apps:`);
    apps.forEach((app: any, i: number) => {
      console.log(`  ${i + 1}. ${app.title} (${app.appId})`);
    });
  } catch (err) {
    console.error("✗ Error:", err);
  }
}

main();

