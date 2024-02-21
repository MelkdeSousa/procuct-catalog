import { Router } from "express";
import { createCategory } from "../controllers/create-category";

const categoriesRouter = Router();

categoriesRouter.route("/categories").post(createCategory);

export { categoriesRouter };
