import Joi from "joi";

import { TGetLang } from "../types";

import { email, password, firstname, lastname, username } from "./auth";

export const schemaUpdate = (getLang: TGetLang) => {
  return Joi.object({
    body: Joi.object({
      firstname: firstname(getLang),
      lastname: lastname(getLang),
      username: username(getLang),
      email: email(getLang),
      password: password(getLang),
      language: language(getLang),
    }).max(6),
    query: Joi.object().max(0),
    params: Joi.object({
      id: userId(getLang),
    }).max(1),
  });
};

export const userId = (getLang: TGetLang) => {
  return Joi.number()
    .integer()
    .required()
    .messages({
      "any.required": getLang("USER_ID_REQUIRED"),
      "number.base": getLang("USER_ID_NUMBER"),
      "number.integer": getLang("USER_ID_INTEGER"),
      "number.empty": getLang("USER_ID_EMPTY"),
    });
};

export const language = (getLang: TGetLang) => {
  return Joi.string()
    .max(2)
    .required()
    .messages({
      "string.max": getLang("LANGUAGE_MAX"),
      "string.empty": getLang("LANGUAGE_EMPTY"),
      "string.base": getLang("LANGUAGE_STRING"),
      "any.required": getLang("LANGUAGE_REQUIRED"),
    });
};
