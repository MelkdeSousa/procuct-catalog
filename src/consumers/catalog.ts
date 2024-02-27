import "@/database/mongo/connection";
import {
	Category,
	CategoryModel,
} from "@/database/mongo/models-and-schemas/Category";
import { Product } from "@/database/mongo/models-and-schemas/Product";
import { UserModel } from "@/database/mongo/models-and-schemas/User";
import { queues } from "@/services/queue";
import { Upload } from "@aws-sdk/lib-storage";

import { envs } from "@/config/env";
import { S3Client } from "@aws-sdk/client-s3";
import { Readable } from "stream";

const client = new S3Client({
	credentials: {
		accessKeyId: envs.CLOUDFLARE_R2_ACCESS_KEY_ID,
		secretAccessKey: envs.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
	},
	endpoint: `https://${envs.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
	region: "auto",
});

queues["catalog-emit"].process(async ({ data: ownerId }) => {
	const owner = await UserModel.findById(ownerId);

	const products = (await CategoryModel.aggregate([
		{
			$match: {
				ownerId: owner?._id,
			},
		},
		{
			$lookup: {
				from: "products",
				localField: "_id",
				foreignField: "categoryId",
				as: "products",
			},
		},
	])) as (Category & { products: Product[] })[];

	const catalog = {
		owner: owner?.name,
		catalog: products.map((p) => ({
			category_title: p.title,
			category_description: p.description,
			items: p.products.map((p) => ({
				tile: p.title,
				description: p.description,
				price: p.price,
			})),
		})),
	};

	const jsonStream = new Readable({
		read() {
			this.push(JSON.stringify(catalog));
			this.push(null);
		},
	});

	const upload = new Upload({
		client,
		params: {
			Bucket: envs.CLOUDFLARE_R2_BUCKET_NAME,
			Key: `${ownerId}-catalog.json`,
			Body: jsonStream,
		},
	});

	await upload.done();

	return;
});
