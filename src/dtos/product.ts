import { Product } from "@/database/mongo/models-and-schemas/Product";

export const toProductOutput = (product: Product) => {
	return {
		id: product._id,
		title: product.title,
		description: product.description,
		price: product.price,
		categoryId: product.categoryId,
		ownerId: product.ownerId,
		href: `/users/products/${product._id}`,
	};
};
