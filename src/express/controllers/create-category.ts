import { CategoryModel } from "@/database/mongo/models-and-schemas/Category";
import { UserModel } from "@/database/mongo/models-and-schemas/User";
import { toCategoryOutput } from "@/dtos/category";
import { headersSchema } from "@/schemas";
import { RequestHandler } from "express";
import z from "zod";

/**
 * @swagger
 * /users/categories:
 *   post:
 *     summary: Create a new category
 *     description: Create a new category
 *     parameters:
 *       - $ref: '#/components/parameters/X-Owner'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCategoryRequest'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateCategoryResponse'
 */
export const createCategory: RequestHandler = async (req, res) => {
	const bodySchema = z.object({
		title: z.string(),
		description: z.string(),
	});

	const { "x-owner": ownerId } = headersSchema.parse(req.headers);
	const body = bodySchema.parse(req.body);

	const owner = await UserModel.findById(ownerId).exec();
	if (!owner) {
		res.status(404).send({ error: "owner not found" });
		return;
	}

	const product = new CategoryModel({
		...body,
		ownerId,
	});

	await product.save();

	res.status(201).send(toCategoryOutput(product));
};
