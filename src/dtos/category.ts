import { Category } from "@/database/mongo/models-and-schemas/Category";

export const toCategoryOutput = (category: Category) => {
	return {
		id: category._id,
		title: category.title,
		description: category.description,
		ownerId: category.ownerId,
	};
};
