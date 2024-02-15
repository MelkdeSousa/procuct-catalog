import z from "zod";

export const EnvSchema = z.object({
	DATABASE_URL: z.string(),
	SESSION_SECRET: z.string().min(16),
	NODE_ENV: z.enum(["development", "test", "production"]),
});

export const envs = EnvSchema.parse(process.env);
