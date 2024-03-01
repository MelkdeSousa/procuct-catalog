import { CategoryModel } from "@/database/mongo/models-and-schemas/Category";
import { UserModel } from "@/database/mongo/models-and-schemas/User";
import { toCategoryOutput } from "@/dtos/category";
import { headersSchema, objectIdSchema } from "@/schemas";
import Queue from "@/services/queue";

import { RequestHandler } from "express";
import z from "zod";

/**
 * @swagger
 * /users/categories/{id}:
 *   put:
 *     tags:
 *       - Categories
 *     summary: Update a category
 *     description: Update a category
 *     parameters:
 *       - $ref: '#/components/parameters/X-Owner'
 *       - name: id
 *         in: path
 *         required: true
 *         description: The id of the category
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCategoryRequest'
 *     responses:
 *       200:
 *         description: Updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateCategoryResponse'
 *       404:
 *         description: Not found resource
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommonError'
 */
export const updateCategory: RequestHandler = async (req, res) => {
  const bodySchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  });
  const querySchema = z.object({
    id: objectIdSchema,
  });

  const { "x-owner": ownerId } = headersSchema.parse(req.headers);
  const body = bodySchema.parse(req.body);
  const { id: categoryId } = querySchema.parse(req.params);

  const owner = await UserModel.findById(ownerId).exec();
  if (!owner) {
    res.status(404).send({ error: "owner not found" });
    return;
  }

  const category = await CategoryModel.findOneAndUpdate(
    categoryId,
    {
      title: body?.title,
      description: body?.description,
    },
    { new: true },
  ).exec();
  if (!category) {
    res.status(404).send({ error: "product not found" });
    return;
  }

  await Queue.add("catalog-emit", ownerId.toString());

  res.status(201).send(toCategoryOutput(category));
};
