import z from "zod";

export const pageSchema = z
	.string()
	.refine((val) => !Number.isNaN(val))
	.transform(Number)
	.optional()
	.default("1");

export const limitSchema = z
	.string()
	.refine((val) => !Number.isNaN(val))
	.transform(Number)
	.optional()
	.default("10");
