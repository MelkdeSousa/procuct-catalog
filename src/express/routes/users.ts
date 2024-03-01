import { Router } from "express";
import { createUser } from "../controllers/user/create-user";
import { listUsers } from "../controllers/user/list-users";

const usersRouter = Router();

usersRouter.route("/").post(createUser).get(listUsers);

export { usersRouter };
