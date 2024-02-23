import { CategoryModel } from "@/database/mongo/models-and-schemas/Category";
import { ProductModel } from "@/database/mongo/models-and-schemas/Product";
import { UserModel } from "@/database/mongo/models-and-schemas/User";
import { toProductOutput } from "@/dtos/product";
import { headersSchema, objectIdSchema } from "@/schemas";
import { queue } from "@/services/queue";
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
 *       404:
 *         $ref: '#/components/responses/NotFoundOwnerOrCategory'
 */
export const createProduct: RequestHandler = async (req, res) => {
	const bodySchema = z.object({
		title: z.string(),
		description: z.string(),
		price: z.number(),
		category: objectIdSchema.optional(),
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
		ownerId,
	});

	if (body.category) {
		const category = await CategoryModel.findById(body.category).exec();

		if (!category) {
			res.status(404).send({ error: "category not found" });
			return;
		}
		product.categoryId = category.id;
	}

	await product.save();

	await queue.publish('catalog-emit', ownerId.toString())

	res.status(201).send(toProductOutput(product));
};
