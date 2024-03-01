import { Topic } from "@/config/messaging-topics";
import { redisConfig } from "@/config/redis";
import BeeQueue from "bee-queue";

export const makeBeeQueue = (queueName: Topic) => {
  return new BeeQueue(queueName, {
    redis: redisConfig,
  });
};
