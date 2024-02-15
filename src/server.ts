import express from "express";
import "express-async-errors";
import session from "express-session";
import morgan from "morgan";
import z from "zod";
import { envs } from "./config/env";
import "./database/mongo/connection";
import { zodErrorHandler } from "./express/middlewares";

const app = express();

app.use(express.json());
app.use(morgan("common"));
app.use(
	session({
		secret: envs.SESSION_SECRET,
		cookie: {
			secure: envs.NODE_ENV === "production",
			httpOnly: true,
			// maxAge: 1000 * 60 * 60 * 24, // 1 day
		},
		resave: false,
		saveUninitialized: false,
	}),
);

app.route("/products").post((req, res) => {
	const cookieConfigs = {
		path: "/",
		// maxAge: 60 * 60 * 24 * 30, // 30 days
		signed: true,
		httpOnly: true,
	};

	const bodySchema = z.object({
		title: z.string(),
		description: z.string(),
		price: z.number(),
		category: z.string(),
	});

	const cookiesSchema = z.object({
		ownerId: z.string().uuid().optional(),
	});

	const cookies = cookiesSchema.parse(req.session);

	if (!cookies.ownerId) {
		cookies.ownerId = crypto.randomUUID();
		Object.assign(req.session, cookies);
		Object.assign(req.session.cookie, cookieConfigs);
	}

	const body = bodySchema.parse(req.body);

	res.status(201).send({ ...body, ...cookies });
});

app.use(zodErrorHandler);

app.listen(3000, () => console.log("app listening on port 3000!"));
