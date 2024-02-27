import { Router } from "express";
import { createProduct } from "../controllers/create-product";
import { updateProduct } from "../controllers/update-product";

const productsRouter = Router();

productsRouter.route("/products").post(createProduct);
productsRouter.route("/products/:id").put(updateProduct);

export { productsRouter };
