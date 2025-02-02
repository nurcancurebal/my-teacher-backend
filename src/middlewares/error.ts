import { Request, Response, NextFunction } from "express";

import { TErrorResponse } from "../types";

export default function (
  error: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) {
  console.error(error);

  const newError: TErrorResponse = {
    error: true,
    message: error.message,
    data: null,
  };

  const isDevelopment = process.env.NODE_ENV === "development";

  if (isDevelopment) {
    newError.stack = error.stack;
  }

  if (res.statusCode === 200) {
    res.status(500);
  }

  res.json(newError);
}
