import { envs } from "@/config/env";
import { storage } from "@/config/storage";
import { UserModel } from "@/database/mongo/models-and-schemas/User";
import { headersSchema } from "@/schemas";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { RequestHandler } from "express";

/**
 * @swagger
 * /users/categories:
 *   get:
 *     tags:
 *       - Categories
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
