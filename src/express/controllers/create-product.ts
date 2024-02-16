import { RequestHandler } from "express";
import z from "zod";

export const createProduct: RequestHandler = async (req, res) => {
	const bodySchema = z.object({
		title: z.string(),
		description: z.string(),
		price: z.number(),
		category: z.string(),
	});

	const body = bodySchema.parse(req.body);

	res.status(201).send({ ...body });
};
