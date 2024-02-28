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

export const objectIdSchema = z
  .string()
  .refine(Types.ObjectId.isValid)
  .transform((value) => new Types.ObjectId(value));

export const headersSchema = z.object({
  "x-owner": objectIdSchema,
});
