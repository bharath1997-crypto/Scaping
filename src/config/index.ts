import dotenv from "dotenv";

dotenv.config();

export const config = {
  database: {
    url: process.env.DATABASE_URL || "",
  },
  redis: {
    host: process.env.REDIS_HOST || "localhost",
    port: parseInt(process.env.REDIS_PORT || "6379"),
    password: process.env.REDIS_PASSWORD,
  },
  scraping: {
    defaultCountry: process.env.DEFAULT_COUNTRY || "us",
    defaultLocale: process.env.DEFAULT_LOCALE || "en_US",
    batchSize: parseInt(process.env.BATCH_SIZE || "10"),
    retryAttempts: parseInt(process.env.RETRY_ATTEMPTS || "2"),
    retryDelay: parseInt(process.env.RETRY_DELAY || "500"),
  },
  api: {
    port: parseInt(process.env.API_PORT || "3000"),
  },
};


