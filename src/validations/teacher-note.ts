import Joi from "joi";

import { TGetLang } from "../types";

export const schemaCreate = (getLang: TGetLang) => {
  return Joi.object({
    body: Joi.object({
      student_id: studentId(getLang),
      title: title(getLang),
      note: note(getLang),
    }),
    query: Joi.object().max(0),
    params: Joi.object().max(0),
  });
};

export const studentId = (getLang: TGetLang) => {
  return Joi.number()
    .integer()
    .required()
    .messages({
      "number.base": getLang("STUDENT_ID_NUMBER"),
      "any.required": getLang("STUDENT_ID_REQUIRED"),
      "number.integer": getLang("STUDENT_ID_INTEGER"),
    });
};

export const title = (getLang: TGetLang) => {
  return Joi.string()
    .min(3)
    .max(20)
    .required()
    .messages({
      "any.required": getLang("TITLE_REQUIRED"),
      "string.empty": getLang("TITLE_CANNOT_BE_EMPTY"),
      "string.base": getLang("TITLE_REQUIRED"),
      "string.min": getLang("TITLE_MIN"),
      "string.max": getLang("TITLE_MAX"),
    });
};

export const note = (getLang: TGetLang) => {
  return Joi.string()
    .min(3)
    .max(130)
    .required()
    .messages({
      "any.required": getLang("NOTE_REQUIRED"),
      "string.empty": getLang("NOTE_CANNOT_BE_EMPTY"),
      "string.base": getLang("NOTE_REQUIRED"),
      "string.min": getLang("NOTE_MIN"),
      "string.max": getLang("NOTE_MAX"),
    });
};
