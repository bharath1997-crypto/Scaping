import { Queue } from "bullmq";
import { redisConnection } from "./index.ts";

export const reviewsQueue = new Queue("reviewsQueue", {
  connection: redisConnection,
});


