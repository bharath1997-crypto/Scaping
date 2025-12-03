import { Queue } from "bullmq";
import { redisConnection } from "./index.ts";

export const discoveryQueue = new Queue("discoveryQueue", {
  connection: redisConnection,
});


