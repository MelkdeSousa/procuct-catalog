import z from "zod";

export const EnvSchema = z.object({
	DATABASE_URL: z.string(),
});

export const envs = EnvSchema.parse(process.env);
