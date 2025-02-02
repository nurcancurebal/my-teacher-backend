import { Request, Response, NextFunction } from "express";

import utilJwt from "../utils/jwt";

import { TDecoded } from "../types";

import ModelUser from "../models/user";

const WHITE_LIST = [
  "/api/auth/login",
  "/api/auth/register",
  "/api/auth/refresh",
  "/api/auth/forgot-password",
  "/api/auth/reset-password",
  "/api/docs",
];

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (WHITE_LIST.includes(req.path)) return next();

    const headerAuthorization = req.headers.authorization;
    if (!headerAuthorization) return next();

    const splitAuth = headerAuthorization.split(" ");

    if (splitAuth.length !== 2) {
      throw new Error(res.locals.getLang("INVALID_AUTH_HEADER"));
    }

    const [bearer, token] = splitAuth;

    if (bearer !== "Bearer") {
      throw new Error(res.locals.getLang("INVALID_AUTH_HEADER"));
    }

    if (!token) return next();

    const verify = utilJwt.verify(token);

    if (!verify.valid) {
      throw new Error(res.locals.getLang("INVALID_TOKEN"));
    }

    if (verify.expired) {
      throw new Error(res.locals.getLang("EXPIRED_TOKEN"));
    }

    if (verify.message) {
      throw new Error(verify.message);
    }

    const decoded = verify.decoded as TDecoded;

    if (decoded.refresh) {
      throw new Error(res.locals.getLang("INVALID_TOKEN"));
    }

    const findUser = await ModelUser.findOne({
      where: { id: decoded.userId },
    });

    if (!findUser) {
      throw new Error(res.locals.getLang("USER_NOT_FOUND"));
    }

    const user = JSON.parse(JSON.stringify(findUser));

    delete user.password;

    res.locals.user = user;

    next();
  } catch (error) {
    res.status(401);
    next(error);
  }
}
