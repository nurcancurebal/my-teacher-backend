import Joi from "joi";

import { TGetLang } from "../types";

export const update = (getLang: TGetLang) => {
  return Joi.object({
    body: Joi.object({
      firstname: Joi.string().min(3).max(30).required(),
      lastname: Joi.string().min(3).max(30).required(),
      username: Joi.string().min(3).max(30).required(),
      email: email(getLang),
      password: password(getLang),
    }),
    query: Joi.object().max(0),
    params: Joi.object().max(0),
  });
};

export const password = (getLang: TGetLang) => {
  return Joi.string()
    .min(8)
    .max(20)
    .pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]+$"))
    .required()
    .messages({
      "string.pattern.base": getLang("PASSWORD_VALIDATION_MESSAGE"),
      "string.min": getLang("PASSWORD_VALIDATION_MESSAGE"),
      "any.required": getLang("PASSWORD_VALIDATION_MESSAGE"),
      "string.empty": getLang("PASSWORD_VALIDATION_MESSAGE"),
      "string.base": getLang("PASSWORD_VALIDATION_MESSAGE"),
      "string.max": getLang("PASSWORD_VALIDATION_MESSAGE"),
    });
};

export const email = (getLang: TGetLang) => {
  return Joi.string()
    .email()
    .min(3)
    .max(60)
    .required()
    .messages({
      "string.email": getLang("EMAIL_VALIDATION_MESSAGE"),
      "any.required": getLang("EMAIL_VALIDATION_MESSAGE"),
      "string.empty": getLang("EMAIL_VALIDATION_MESSAGE"),
      "string.base": getLang("EMAIL_VALIDATION_MESSAGE"),
      "string.min": getLang("EMAIL_VALIDATION_MESSAGE"),
      "string.max": getLang("EMAIL_VALIDATION_MESSAGE"),
    });
};
