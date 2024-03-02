import { Router } from "express";
import { createCategory } from "../controllers/category/create-category";
import { getCategory } from "../controllers/category/get-category";
import { listCategories } from "../controllers/category/list-categories";
import { updateCategory } from "../controllers/category/update-category";

const categoriesRouter = Router();

categoriesRouter.route("/categories").post(createCategory).get(listCategories);
categoriesRouter.route("/categories/:id").put(updateCategory).get(getCategory);

export { categoriesRouter };
