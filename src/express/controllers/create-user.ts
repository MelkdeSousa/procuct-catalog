import { UserModel } from "@/database/mongo/models-and-schemas/User";
import { toUserOutput } from "@/dtos/user";
import { RequestHandler } from "express";
import z from "zod";

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserRequest'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateUserResponse'
 */
export const createUser: RequestHandler = async (req, res) => {
	const bodySchema = z.object({
		name: z.string(),
	});

	const body = bodySchema.parse(req.body);
	const user = new UserModel({
		name: body.name,
		_id: crypto.randomUUID(),
	});

	await user.save();
	return res.send(toUserOutput(user)).status(201);
};
