import express from "express";
import "express-async-errors";
import morgan from "morgan";
import z from "zod";
import { zodErrorHandler } from "./express/middlewares";

const app = express();

app.use(express.json());
app.use(morgan("common"));

app.route("/products").post((req, res) => {
	const bodySchema = z.object({
		title: z.string(),
		description: z.string(),
		price: z.number(),
		category: z.string(),
	});

	const body = bodySchema.parse(req.body);
	
	res.status(201).send(body);
});

app.use(zodErrorHandler);

app.listen(3000, () => console.log("Example app listening on port 3000!"));
