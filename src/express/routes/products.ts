import { Router } from "express";
import { createProduct } from "../controllers/create-product";

const productsRouter = Router();

productsRouter.route("/products").post(createProduct);

export { productsRouter };
