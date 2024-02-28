import { CategoryAndProducts } from "@/database/mongo/models-and-schemas/Category";
import { User } from "@/database/mongo/models-and-schemas/User";

export const toCatalogOutput = (
  owner: User,
  categories: CategoryAndProducts[],
) => {
  return {
    owner: owner?.name,
    catalog: categories.map((p) => ({
      category_title: p.title,
      category_description: p.description,
      items: p.products.map((p) => ({
        tile: p.title,
        description: p.description,
        price: p.price,
      })),
    })),
  };
};
