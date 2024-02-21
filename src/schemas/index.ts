import { Types } from "mongoose";
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
		.length(24)
		.regex(/[0-9a-f]{24}/, "this is not a valid owner id")
		.transform((value) => new Types.ObjectId(value)),
});
