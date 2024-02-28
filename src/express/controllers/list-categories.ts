import { CategoryModel } from "@/database/mongo/models-and-schemas/Category";
import { UserModel } from "@/database/mongo/models-and-schemas/User";
import { toCategoryOutput } from "@/dtos/category";
import { headersSchema, limitSchema, pageSchema } from "@/schemas";
import { RequestHandler } from "express";
import z from "zod";

/**
 * @swagger
 * /users/categories:
 *   get:
 *     summary: Get a list of categories
 *     description: Retrieve a paginated list of categories of one user
 *     parameters:
 *       - $ref: '#/components/parameters/Page'
 *       - $ref: '#/components/parameters/Limit'
 *       - $ref: '#/components/parameters/X-Owner'
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
 *                     $ref: '#/components/schemas/CreateCategoryResponse'
 *                 totalPages:
 *                   type: integer
 *                 currentPage:
 *                   type: integer
 */
export const listCategories: RequestHandler = async (req, res) => {
  const querySchema = z.object({
    page: pageSchema,
    limit: limitSchema,
  });

  const { limit, page } = querySchema.parse(req.query);
  const { "x-owner": ownerId } = headersSchema.parse(req.headers);

  const owner = await UserModel.findById(ownerId).exec();
  if (!owner) {
    res.status(404).send({ error: "owner not found" });
    return;
  }

  const categories = await CategoryModel.find({ ownerId })
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();

  const totalDocs = await CategoryModel.countDocuments();

  return res
    .json({
      categories: categories.map(toCategoryOutput),
      totalPages: Math.ceil(totalDocs / limit),
      currentPage: page,
    })
    .status(200);
};
