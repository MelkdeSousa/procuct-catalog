import { UserModel } from "@/database/mongo/models-and-schemas/User";
import { toUserOutput } from "@/dtos/user";
import { limitSchema, pageSchema } from "@/schemas";
import { RequestHandler } from "express";
import z from "zod";

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get a list of users
 *     description: Retrieve a paginated list of users
 *     parameters:
 *       - $ref: '#/components/parameters/Page'
 *       - $ref: '#/components/parameters/Limit'
 *     responses:
 *       '200':
 *         description: A JSON array of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/CreateUserResponse'
 *                 totalPages:
 *                   type: integer
 *                 currentPage:
 *                   type: integer
 */
export const listUsers: RequestHandler = async (req, res) => {
  const querySchema = z.object({
    page: pageSchema,
    limit: limitSchema,
  });

  const { limit, page } = querySchema.parse(req.query);

  const users = await UserModel.find()
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .populate({
      path: "categories",
    });

  const totalUsers = await UserModel.countDocuments();

  return res
    .json({
      users: users.map(toUserOutput),
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page,
    })
    .status(200);
};
