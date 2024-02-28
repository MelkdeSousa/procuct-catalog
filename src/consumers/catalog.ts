import "@/database/mongo/connection";
import {
  CategoryAndProducts,
  CategoryModel,
} from "@/database/mongo/models-and-schemas/Category";
import { UserModel } from "@/database/mongo/models-and-schemas/User";
import { queues } from "@/services/queue";
import { Upload } from "@aws-sdk/lib-storage";

import { envs } from "@/config/env";
import { toCatalogOutput } from "@/dtos/catalog";
import { S3Client } from "@aws-sdk/client-s3";
import { Readable } from "stream";

const client = new S3Client({
  credentials: {
    accessKeyId: envs.CLOUDFLARE_R2_ACCESS_KEY_ID,
    secretAccessKey: envs.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
  },
  endpoint: `https://${envs.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  region: "auto",
});

queues["catalog-emit"].process(async ({ data: ownerId }) => {
  const owner = await UserModel.findById(ownerId);

  const categories: CategoryAndProducts[] = await CategoryModel.aggregate([
    {
      $match: {
        ownerId: owner?._id,
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
  ]);

  const catalog = toCatalogOutput(owner!, categories);

  const jsonStream = new Readable({
    read() {
      this.push(JSON.stringify(catalog));
      this.push(null);
    },
  });

  const upload = new Upload({
    client,
    params: {
      Bucket: envs.CLOUDFLARE_R2_BUCKET_NAME,
      Key: `${ownerId}-catalog.json`,
      Body: jsonStream,
    },
  });

  await upload.done();

  return;
});
