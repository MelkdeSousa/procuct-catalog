import { apiReference } from "@scalar/express-api-reference";
import express from "express";
import "express-async-errors";
import logger from "morgan";
import swaggerUi from "swagger-ui-express";
import { envs } from "./config/env";
import { openapiSpecification } from "./config/openapiSpecs";
import "./database/mongo/connection";
import { zodErrorHandler } from "./express/middlewares";
import { catalogsRouter } from "./express/routes/catalogs";
import { categoriesRouter } from "./express/routes/categories";
import { productsRouter } from "./express/routes/products";
import { usersRouter } from "./express/routes/users";

const app = express();

app.use(express.json());
app.use(logger("common"));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use(
  "/reference",
  apiReference({
    spec: {
      content: openapiSpecification,
    },
  }),
);

app.use(
  "/users",
  usersRouter,
  productsRouter,
  categoriesRouter,
  catalogsRouter,
);

app.use(zodErrorHandler);

app.listen(envs.PORT, () => console.log(`app listening on port ${envs.PORT}!`));
