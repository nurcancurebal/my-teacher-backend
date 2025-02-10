import { Request, Response, NextFunction } from "express";

import { LANG } from "../consts";
import { TGetLang } from "../types";

const WHITE_LIST_LANGUAGE = ["TR", "EN"];
const DEFAULT_LANG = "EN";

const NON_ACCEPTED_LANG = process.env.NON_ACCEPTED_LANGUAGE || DEFAULT_LANG;

const findNonAcceptedLang = WHITE_LIST_LANGUAGE.includes(NON_ACCEPTED_LANG)
  ? NON_ACCEPTED_LANG
  : DEFAULT_LANG;

export default async function (
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userLanguage: keyof typeof LANG =
      res.locals?.user?.language || findNonAcceptedLang;

    res.locals.getLang = ((
      key: keyof (typeof LANG)[typeof userLanguage],
      lang = userLanguage
    ) => {
      if (!LANG?.[userLanguage]?.[key]) {
        return LANG[lang as keyof typeof LANG]["DEFAULT"];
      }

      return LANG[userLanguage][key];
    }) as TGetLang;

    next();
  } catch (error) {
    next(error);
  }
}
