import Joi from "joi";

import { TGetLang } from "../types";

export const schemaExist = (getLang: TGetLang) => {
  return Joi.object({
    body: Joi.object({
      grade_type: gradeType(getLang),
    }),
    query: Joi.object().max(0),
    params: Joi.object().max(0),
  });
};

export const schemaCreate = (getLang: TGetLang) => {
  return Joi.object({
    body: Joi.object({
      grade_type: gradeType(getLang),
      grade_value: gradeValue(getLang),
    }),
    query: Joi.object().max(0),
    params: Joi.object().max(0),
  });
};

export const schemaUpdate = (getLang: TGetLang) => {
  return Joi.object({
    body: Joi.object({
      grade_value: gradeValue(getLang),
    }),
    query: Joi.object().max(0),
    params: Joi.object().max(0),
  });
};

export const gradeType = (getLang: TGetLang) => {
  return Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({
      "string.min": getLang("GRADE_TYPE_MIN"),
      "string.max": getLang("GRADE_TYPE_MAX"),
      "any.required": getLang("GRADE_TYPE_REQUIRED"),
    });
};

export const gradeValue = (getLang: TGetLang) => {
  return Joi.number()
    .allow(null)
    .optional()
    .messages({
      "number.base": getLang("GRADE_VALUE_NUMBER"),
      "any.optional": getLang("GRADE_VALUE_OPTIONAL"),
      "number.allow": getLang("GRADE_VALUE_ALLOW"),
    });
};
