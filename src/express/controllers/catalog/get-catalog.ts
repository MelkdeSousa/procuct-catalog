import { envs } from "@/config/env";
import { storage } from "@/config/storage";
import { UserModel } from "@/database/mongo/models-and-schemas/User";
import { headersSchema } from "@/schemas";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { RequestHandler } from "express";

/**
 * @swagger
 * /users/catalogs/:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get the catalog of one user
 *     parameters:
 *       - $ref: '#/components/parameters/X-Owner'
 *     responses:
 *       '200':
 *         description: A JSON with data of user, categories and products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
export const getCatalog: RequestHandler = async (req, res) => {
  const { "x-owner": ownerId } = headersSchema.parse(req.headers);

  const owner = await UserModel.findById(ownerId).exec();
  if (!owner) {
    res.status(404).send({ error: "owner not found" });
    return;
  }

  const getObjectCommand = new GetObjectCommand({
    Bucket: envs.CLOUDFLARE_R2_BUCKET_NAME!,
    Key: `${ownerId}-catalog.json`,
  });

  const response = await storage.send(getObjectCommand);

  const body = await response.Body?.transformToString();

  return res.json(JSON.parse(body ?? "{}"));
};
