import "@/database/mongo/connection";
import { ProductModel } from "@/database/mongo/models-and-schemas/Product";
import { queues } from "@/services/queue";

queues["catalog-emit"].process(async (job) => {
	return ProductModel.find({ ownerId: job.data })
		.then((products) => {
			console.log({
				ownerId: job.data,
				time: new Date().toISOString(),
				total: products.length,
			});
		})
		.catch(console.error);
});
