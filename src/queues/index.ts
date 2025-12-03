import { Redis } from "ioredis";
import { config } from "../config/index.ts";

export const redisConnection = new Redis({
  host: config.redis.host,
  port: config.redis.port,
  password: config.redis.password,
  maxRetriesPerRequest: null,
});


