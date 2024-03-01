import z from "zod";

export const EnvSchema = z.object({
  PORT: z
    .string()
    .refine((val) => !Number.isNaN(val))
    .transform(Number),
  DATABASE_URL: z.string(),
  SESSION_SECRET: z.string().min(16),
  NODE_ENV: z.enum(["development", "test", "production"]),
  REDIS_HOST: z.string(),
  REDIS_PORT: z
    .string()
    .refine((val) => !Number.isNaN(val))
    .transform(Number),
  CLOUDFLARE_R2_ACCESS_KEY_ID: z.string(),
  CLOUDFLARE_R2_SECRET_ACCESS_KEY: z.string(),
  CLOUDFLARE_R2_BUCKET_NAME: z.string(),
  CLOUDFLARE_ACCOUNT_ID: z.string(),
});

export const envs = EnvSchema.parse(process.env);
