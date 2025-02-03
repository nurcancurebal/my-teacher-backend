import { Request, Response, NextFunction } from "express";

export default function (req: Request, res: Response, next: NextFunction) {
  try {
    res.status(404);
    throw new Error(`${res.locals.getLang("ROUTE_NOT_FOUND")} ${req.url}`);
  } catch (error) {
    next(error);
  }
}
