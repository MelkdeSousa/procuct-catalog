import { S3Client } from "@aws-sdk/client-s3";
import { envs } from "./env";

export const storage = new S3Client({
  credentials: {
    accessKeyId: envs.CLOUDFLARE_R2_ACCESS_KEY_ID,
    secretAccessKey: envs.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
  },
  endpoint: `https://${envs.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  region: "auto",
});
