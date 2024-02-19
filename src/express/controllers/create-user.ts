import { UserModel } from "@/database/mongo/models-and-schemas/User";
import { RequestHandler } from "express";
import z from "zod";

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             required:
 *               - name
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 */
export const createUser: RequestHandler = async (req, res) => {
	const bodySchema = z.object({
		name: z.string(),
	});

	const body = bodySchema.parse(req.body);
	const user = new UserModel({
		name: body.name,
	});

	await user.save();
	return res.send(user).status(201);
};
