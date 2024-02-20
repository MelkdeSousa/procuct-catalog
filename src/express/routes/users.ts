import { Router } from "express";
import { createUser } from "../controllers/create-user";
import { listUsers } from "../controllers/list-users";

const usersRouter = Router();

usersRouter.route("/").post(createUser).get(listUsers);

export { usersRouter };
