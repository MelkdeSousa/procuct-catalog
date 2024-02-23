import { Router } from "express";
import { createProduct } from "../controllers/create-product";
import { updateProduct } from "../controllers/update-product";

const productsRouter = Router();

productsRouter.route("/products").post(createProduct).put(updateProduct);

export { productsRouter };
