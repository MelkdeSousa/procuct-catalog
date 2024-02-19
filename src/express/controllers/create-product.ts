import { ProductModel } from "@/database/mongo/models-and-schemas/Product";
import { UserModel } from "@/database/mongo/models-and-schemas/User";
import { RequestHandler } from "express";
import z from "zod";
/**
 * @swagger
 * /users/products:
 *   post:
 *     summary: Create a new product
 *     description: Create a new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 price:
 *                   type: number
 *                 ownerId:
 *                   type: string
 *                 href:
 *                   type: string
 */
export const createProduct: RequestHandler = async (req, res) => {
	const bodySchema = z.object({
		title: z.string(),
		description: z.string(),
		price: z.number(),
		category: z.string().uuid(),
	});

	const headersSchema = z.object({
		"x-owner": z
			.string({
				required_error: "owner id must declare in the header of request",
			})
			.uuid(),
	});

	const { "x-owner": ownerId } = headersSchema.parse(req.headers);
	const body = bodySchema.parse(req.body);

	const owner = await UserModel.findById(ownerId).exec();
	if (!owner) {
		res.status(404).send({ error: "owner not found" });
		return;
	}

	console.log(owner);

	const product = new ProductModel({
		...body,
		categoryId: body.category,
		ownerId,
	});

	await product.save();

	res.status(201).send({ ...body, ownerId, href: `/products/${product._id}` });
};
