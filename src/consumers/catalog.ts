import "@/database/mongo/connection";
import {
	Category,
	CategoryModel,
} from "@/database/mongo/models-and-schemas/Category";
import { Product } from "@/database/mongo/models-and-schemas/Product";
import { UserModel } from "@/database/mongo/models-and-schemas/User";
import { queues } from "@/services/queue";
import { writeFile } from "fs/promises";
import path from "path";

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

	await writeFile(
		path.join(process.cwd(), "tmp", `${ownerId}-catalog.json`),
		JSON.stringify(catalog, null, 2),
	);
	// criar um arquivo json com as categorias e os produtos
	// publicar o arquivo no bucket

	return;
});
