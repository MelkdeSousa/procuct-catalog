import { ProductModel } from "@/database/mongo/models-and-schemas/Product";
import { UserModel } from "@/database/mongo/models-and-schemas/User";
import { toProductOutput } from "@/dtos/product";
import { headersSchema, objectIdSchema } from "@/schemas";
import Queue from "@/services/queue";

import { RequestHandler } from "express";
import z from "zod";

/**
 * @swagger
 * /users/products/{id}:
 *   put:
 *     tags:
 *       - Products
 *     summary: Update a product
 *     description: Update a product
 *     parameters:
 *       - $ref: '#/components/parameters/X-Owner'
 *       - name: id
 *         in: path
 *         required: true
 *         description: The id of the product
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProductRequest'
 *     responses:
 *       200:
 *         description: Updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateProductResponse'
 *       404:
 *         description: Not found resource
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommonError'
 */
export const updateProduct: RequestHandler = async (req, res) => {
  const bodySchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    price: z.number().optional(),
    category: objectIdSchema.optional(),
  });
  const querySchema = z.object({
    id: objectIdSchema,
  });

  const { "x-owner": ownerId } = headersSchema.parse(req.headers);
  const body = bodySchema.parse(req.body);
  const { id } = querySchema.parse(req.params);

  const owner = await UserModel.findById(ownerId).exec();
  if (!owner) {
    res.status(404).send({ error: "owner not found" });
    return;
  }

  const product = await ProductModel.findOneAndUpdate(
    id,
    {
      categoryId: body?.category,
      title: body?.title,
      price: body?.price,
      description: body?.description,
    },
    { new: true },
  ).exec();
  if (!product) {
    res.status(404).send({ error: "product not found" });
    return;
  }

  await Queue.add("catalog-emit", ownerId.toString());

  res.status(201).send(toProductOutput(product));
};
