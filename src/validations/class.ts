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
      class_name: className(getLang),
      explanation: explanation(getLang),
    }),
    query: Joi.object().max(0),
    params: Joi.object().max(0),
  });
};

export const schemaUpdateOne = (getLang: TGetLang) => {
  return Joi.object({
    body: Joi.object({
      class_name: className(getLang),
      explanation: explanation(getLang),
    }).or("class_name", "explanation"),
    query: Joi.object().max(0),
    params: Joi.object({
      id: Joi.number()
        .integer()
        .required()
        .messages({
          "any.required": getLang("CLASS_ID_REQUIRED"),
          "number.base": getLang("INVALID_CLASS_ID"),
          "number.integer": getLang("CLASS_ID_INTEGER"),
        }),
    }).max(1),
  });
};

export const schemaDeleteOne = (getLang: TGetLang) => {
  return Joi.object({
    body: Joi.object().max(0),
    query: Joi.object().max(0),
    params: Joi.object({
      id: Joi.number()
        .integer()
        .required()
        .messages({
          "any.required": getLang("CLASS_ID_REQUIRED"),
          "number.base": getLang("INVALID_CLASS_ID"),
          "number.integer": getLang("CLASS_ID_INTEGER"),
        }),
    }).max(1),
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
