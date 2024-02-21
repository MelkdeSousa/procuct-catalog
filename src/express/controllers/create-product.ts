import { ProductModel } from "@/database/mongo/models-and-schemas/Product";
import { UserModel } from "@/database/mongo/models-and-schemas/User";
import { toProductOutput } from "@/dtos/product";
import { headersSchema } from "@/schemas";
import { RequestHandler } from "express";
import z from "zod";

/**
 * @swagger
 * /users/products:
 *   post:
 *     summary: Create a new product
 *     description: Create a new product
 *     parameters:
 *       - $ref: '#/components/parameters/X-Owner'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProductRequest'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateProductResponse'
 */
export const createProduct: RequestHandler = async (req, res) => {
	const bodySchema = z.object({
		title: z.string(),
		description: z.string(),
		price: z.number(),
		category: z.string().uuid(),
	});

	const { "x-owner": ownerId } = headersSchema.parse(req.headers);
	const body = bodySchema.parse(req.body);

	const owner = await UserModel.findById(ownerId).exec();
	if (!owner) {
		res.status(404).send({ error: "owner not found" });
		return;
	}

	const product = new ProductModel({
		...body,
		_id: crypto.randomUUID(),
		categoryId: body.category,
		ownerId,
	});

	await product.save();

	res.status(201).send(toProductOutput(product));
};
