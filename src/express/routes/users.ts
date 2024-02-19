import { Router } from "express";
import { createUser } from "../controllers/create-user";

const usersRouter = Router();

usersRouter.route("/").post(createUser);

export { usersRouter };
