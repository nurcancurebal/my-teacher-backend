import Joi from "joi";

import { TGetLang } from "../types";

export const schemaFindAll = () => {
  return Joi.object({
    body: Joi.object().max(0),
    query: Joi.object().max(0),
    params: Joi.object().max(0),
  });
};

export const schemaGetCount = () => {
  return Joi.object({
    body: Joi.object().max(0),
    query: Joi.object().max(0),
    params: Joi.object().max(0),
  });
};

export const schemaCreateOne = (getLang: TGetLang) => {
  return Joi.object({
    body: Joi.object({
      className: className(getLang),
      explanation: explanation(getLang),
    }).max(2),
    query: Joi.object().max(0),
    params: Joi.object().max(0),
  });
};

export const schemaUpdateOne = (getLang: TGetLang) => {
  return Joi.object({
    body: Joi.object({
      className: className(getLang).optional(),
      explanation: explanation(getLang).optional(),
    })
      .or("className", "explanation")
      .max(2),
    query: Joi.object().max(0),
    params: Joi.object({
      id: id(getLang),
    }).max(1),
  });
};

export const schemaDeleteOne = (getLang: TGetLang) => {
  return Joi.object({
    body: Joi.object().max(0),
    query: Joi.object().max(0),
    params: Joi.object({
      id: id(getLang),
    }).max(1),
  });
};

export const id = (getLang: TGetLang) => {
  return Joi.number()
    .integer()
    .required()
    .messages({
      "any.required": getLang("CLASS_ID_REQUIRED"),
      "number.base": getLang("INVALID_CLASS_ID"),
      "number.integer": getLang("CLASS_ID_INTEGER"),
    });
};

export const className = (getLang: TGetLang) => {
  return Joi.string()
    .min(2)
    .max(3)
    .required()
    .messages({
      "string.min": getLang("CLASS_NAME_MIN"),
      "string.max": getLang("CLASS_NAME_MAX"),
      "any.required": getLang("CLASS_NAME_REQUIRED"),
    });
};

export const explanation = (getLang: TGetLang) => {
  return Joi.string()
    .min(2)
    .max(60)
    .required()
    .messages({
      "string.min": getLang("EXPLANATION_MIN"),
      "string.max": getLang("EXPLANATION_MAX"),
      "any.required": getLang("EXPLANATION_REQUIRED"),
    });
};
