import { Request, Response, NextFunction } from "express";

export default function (
  schema: (getLang: (lang: string) => string) => {
    validate: (data: {
      query: Record<string, unknown>;
      params: Record<string, string>;
      body: Record<string, unknown>;
    }) => {
      error?: { message: string };
    };
  }
) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = req.query;
      const params = req.params;
      const body = req.body;

      const validateData = { query, params, body };

      const { error } = schema(res.locals.getLang).validate(validateData);

      if (error) {
        throw new Error(error.message);
      }

      next();
    } catch (error) {
      res.status(400);
      next(error);
    }
  };
}
