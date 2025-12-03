import { Queue } from "bullmq";
import { redisConnection } from "./index.ts";

export const detailsQueue = new Queue("detailsQueue", {
  connection: redisConnection,
});


