import z from "zod";

export const EnvSchema = z.object({
	DATABASE_URL: z.string(),
	SESSION_SECRET: z.string().min(16),
	NODE_ENV: z.enum(["development", "test", "production"]),
	REDIS_HOST: z.string(),
	REDIS_PORT: z
		.string()
		.refine((val) => !Number.isNaN(val))
		.transform(Number),
});

export const envs = EnvSchema.parse(process.env);
