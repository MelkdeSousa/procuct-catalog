import { CategoryModel } from "@/database/mongo/models-and-schemas/Category";
import { UserModel } from "@/database/mongo/models-and-schemas/User";
import { headersSchema, idParamSchema } from "@/schemas";
import Queue from "@/services/queue";

import { RequestHandler } from "express";

/**
 * @swagger
 * /users/categories/{id}:
 *   delete:
 *     tags:
 *       - Categories
 *     summary: Delete a category
 *     description: Delete a category
 *     parameters:
 *       - $ref: '#/components/parameters/X-Owner'
 *       - name: id
 *         in: path
 *         required: true
 *         description: The id of the category
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Deleted"
 *       404:
 *         description: Not found resource
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommonError'
 */
export const deleteCategory: RequestHandler = async (req, res) => {
  const { "x-owner": ownerId } = headersSchema.parse(req.headers);
  const { id: categoryId } = idParamSchema.parse(req.params);

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

  await CategoryModel.findByIdAndDelete(categoryId).exec();

  await Queue.add("catalog-emit", ownerId.toString());

  return res.status(200);
};
