import { ErrorRequestHandler } from "express";
import expressSession from "express-session";
import { envs } from "src/config/env";
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

export const session = expressSession({
  secret: envs.SESSION_SECRET,
  cookie: {
    secure: envs.NODE_ENV === "production",
    httpOnly: true,
    // maxAge: 1000 * 60 * 60 * 24, // 1 day
  },
  resave: false,
  saveUninitialized: false,
});
