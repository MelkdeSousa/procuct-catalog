import { Router } from "express";
import { createCategory } from "../controllers/create-category";
import { listCategories } from "../controllers/list-categories";

const categoriesRouter = Router();

categoriesRouter.route("/categories").post(createCategory).get(listCategories);

export { categoriesRouter };
