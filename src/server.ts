import express from "express";
import "express-async-errors";
import logger from "morgan";
import "./database/mongo/connection";
import { zodErrorHandler } from "./express/middlewares";
import { productsRouter } from "./express/routes/products";

const app = express();

app.use(express.json());
app.use(logger("common"));

app.use("/users", productsRouter);

app.use(zodErrorHandler);

app.listen(3333, () => console.log("app listening on port 3333!"));
