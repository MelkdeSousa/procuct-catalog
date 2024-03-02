import {
  CategoryAndProducts,
  CategoryModel,
} from "@/database/mongo/models-and-schemas/Category";
import { UserModel } from "@/database/mongo/models-and-schemas/User";
import { headersSchema, idParamSchema } from "@/schemas";
import { RequestHandler } from "express";

/**
 * @swagger
 * /users/categories/{id}:
 *   get:
 *     tags:
 *       - Categories
 *     summary: Get a category
 *     description: Get a category
 *     parameters:
 *       - $ref: '#/components/parameters/X-Owner'
 *       - name: id
 *         in: path
 *         required: true
 *         description: The id of the category
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A JSON array of categories with respective products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalPages:
 *                   type: integer
 *                 currentPage:
 *                   type: integer
 */
export const getCategory: RequestHandler = async (req, res) => {
  const { id: categoryId } = idParamSchema.parse(req.params);
  const { "x-owner": ownerId } = headersSchema.parse(req.headers);

  const owner = await UserModel.findById(ownerId).exec();
  if (!owner) {
    res.status(404).send({ error: "owner not found" });
    return;
  }

  const category = await CategoryModel.findById(categoryId).exec();
  if (!category) {
    res.status(404).send({ error: "category not found" });
    return;
  }

  const [categoryAndProducts] =
    await CategoryModel.aggregate<CategoryAndProducts>([
      {
        $match: {
          _id: categoryId,
          ownerId: owner._id,
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "categoryId",
          as: "products",
        },
      },
      {
        $project: {
          __v: false,
          products: {
            __v: false,
          },
        },
      },
    ]);

  return res.json(categoryAndProducts);
};
