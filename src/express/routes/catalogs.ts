import { Router } from "express";
import { getCatalog } from "../controllers/catalog/get-catalog";

const catalogsRouter = Router();

catalogsRouter.route("/catalogs").get(getCatalog);

export { catalogsRouter };
