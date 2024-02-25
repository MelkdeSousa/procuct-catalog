import { Topics } from "@/config/messaging-topics";
import { redisConfig } from "@/config/redis";
import BeeQueue from "bee-queue";

export const makeBeeQueue = <Data>(queueName: Topics) => {
	return new BeeQueue<Data>(queueName, {
		redis: redisConfig,
	});
};
