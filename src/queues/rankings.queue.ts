import { Queue } from "bullmq";
import { redisConnection } from "./index.ts";

export const rankingsQueue = new Queue("rankingsQueue", {
  connection: redisConnection,
});


