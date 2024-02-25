import { Topics } from "@/config/messaging-topics";
import { makeBeeQueue } from "@/utils/makeBeeQueue";

export const queues = {
	"catalog-emit": makeBeeQueue("catalog-emit"),
};

export const queue = {
	async publish<const D>(queueName: Topics, data: D) {
		await queues[queueName].createJob(data).save();
	},
};
