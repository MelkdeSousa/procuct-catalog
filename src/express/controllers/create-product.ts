import { RequestHandler } from "express";
import z from "zod";

export const createProduct: RequestHandler = async (req, res) => {
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
};
