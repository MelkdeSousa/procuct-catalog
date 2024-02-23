import z from "zod";

export const EnvSchema = z.object({
	DATABASE_URL: z.string(),
	SESSION_SECRET: z.string().min(16),
	NODE_ENV: z.enum(["development", "test", "production"]),
	AWS_REGION: z.string(),
	AWS_ACCESS_KEY_ID:z.string(),
	AWS_SECRET_ACCESS_KEY:z.string(),
});

export const envs = EnvSchema.parse(process.env);
