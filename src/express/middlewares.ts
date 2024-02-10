import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
export const zodErrorHandler: ErrorRequestHandler = (err, _req, res, next) => {
	if (!(err instanceof ZodError)) next(err);

	res.status(422).send({
		errors: (err as ZodError).issues.map((issue) => ({
			...issue,
			code: undefined,
		})),
	});
};
