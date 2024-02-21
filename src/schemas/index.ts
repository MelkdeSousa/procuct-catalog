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

export const headersSchema = z.object({
	"x-owner": z
		.string({
			required_error: "owner id must declare in the header of request",
		})
		.uuid(),
});
