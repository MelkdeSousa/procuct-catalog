import { ProductModel } from "@/database/mongo/models-and-schemas/Product";
import { UserModel } from "@/database/mongo/models-and-schemas/User";
import { headersSchema, idParamSchema } from "@/schemas";
import Queue from "@/services/queue";

import { RequestHandler } from "express";

/**
 * @swagger
 * /users/products/{id}:
 *   delete:
 *     tags:
 *       - Products
 *     summary: Delete a product
 *     description: Delete a product
 *     parameters:
 *       - $ref: '#/components/parameters/X-Owner'
 *       - name: id
 *         in: path
 *         required: true
 *         description: The id of the product
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted
 *       404:
 *         description: Not found resource
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommonError'
 */
export const deleteProduct: RequestHandler = async (req, res) => {
  const { "x-owner": ownerId } = headersSchema.parse(req.headers);
  const { id: productId } = idParamSchema.parse(req.params);

  const owner = await UserModel.findById(ownerId).exec();
  if (!owner) {
    res.status(404).send({ error: "owner not found" });
    return;
  }

  await ProductModel.findOneAndDelete(productId).exec();

  await Queue.add("catalog-emit", ownerId.toString());

  return res.status(200);
};
