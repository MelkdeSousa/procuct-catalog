import { Router } from "express";
import { createProduct } from "../controllers/product/create-product";
import { updateProduct } from "../controllers/product/update-product";

const productsRouter = Router();

productsRouter.route("/products").post(createProduct);
productsRouter.route("/products/:id").put(updateProduct);

export { productsRouter };
