import { envs } from "@/config/env";
import { storage } from "@/config/storage";
import { Job } from "@/contracts/job";
import "@/database/mongo/connection";
import {
  CategoryAndProducts,
  CategoryModel,
} from "@/database/mongo/models-and-schemas/Category";
import { UserModel } from "@/database/mongo/models-and-schemas/User";
import { toCatalogOutput } from "@/dtos/catalog";
import { Upload } from "@aws-sdk/lib-storage";
import { Readable } from "stream";

export default {
  key: "catalog-emit",
  handler: async ({ data: ownerId }) => {
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
      client: storage,
      params: {
        Bucket: envs.CLOUDFLARE_R2_BUCKET_NAME,
        Key: `${ownerId}-catalog.json`,
        Body: jsonStream,
      },
    });

    await upload.done();

    return;
  },
} satisfies Job<"catalog-emit">;
