import Joi from "joi";

import { TGetLang } from "../types";

import { classId } from "./class";

export const schemaStudent = (getLang: TGetLang) => {
  return Joi.object({
    body: Joi.object({
      idNumber: idNumber(getLang),
      firstname: firstname(getLang),
      lastname: lastname(getLang),
      number: number(getLang),
      gender: gender(getLang),
      birthday: birthday(getLang),
    }).max(6),
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

export const schemaFilter = () => {
  return Joi.object({
    body: Joi.object().max(0),
    query: Joi.object({
      firstname: Joi.string().optional(),
      lastname: Joi.string().optional(),
      number: Joi.number().optional(),
      gender: Joi.string().valid("Female", "Male").optional(),
      classId: Joi.number().optional(),
    }).max(5),
    params: Joi.object().max(0),
  });
};

export const schemaGetAll = () => {
  return Joi.object({
    body: Joi.object().max(0),
    query: Joi.object().max(0),
    params: Joi.object().max(0),
  });
};

export const schemaGenderCount = () => {
  return Joi.object({
    body: Joi.object().max(0),
    query: Joi.object().max(0),
    params: Joi.object().max(0),
  });
};

export const schemaGetAllByClassId = (getLang: TGetLang) => {
  return Joi.object({
    body: Joi.object().max(0),
    query: Joi.object().max(0),
    params: Joi.object({
      classId: classId(getLang),
    }).max(1),
  });
};

export const schemaCountByClassId = (getLang: TGetLang) => {
  return Joi.object({
    body: Joi.object().max(0),
    query: Joi.object().max(0),
    params: Joi.object({
      classId: classId(getLang),
    }).max(1),
  });
};

export const schemaCreateOne = (getLang: TGetLang) => {
  return Joi.object({
    body: Joi.object({
      idNumber: idNumber(getLang),
      firstname: firstname(getLang),
      lastname: lastname(getLang),
      number: number(getLang),
      gender: gender(getLang),
      birthday: birthday(getLang),
    }).max(6),
    query: Joi.object().max(0),
    params: Joi.object({
      classId: classId(getLang),
    }).max(1),
  });
};

export const schemaUpdateOne = (getLang: TGetLang) => {
  return Joi.object({
    body: Joi.object({
      classId: classId(getLang),
      idNumber: idNumber(getLang),
      firstname: firstname(getLang),
      lastname: lastname(getLang),
      number: number(getLang),
      birthday: birthday(getLang),
      gender: gender(getLang),
    }).max(7),
    query: Joi.object().max(0),
    params: Joi.object({
      id: studentId(getLang),
    }).max(1),
  });
};

export const schemaDeleteOne = (getLang: TGetLang) => {
  return Joi.object({
    body: Joi.object().max(0),
    query: Joi.object().max(0),
    params: Joi.object({
      id: studentId(getLang),
    }).max(1),
  });
};

export const studentId = (getLang: TGetLang) => {
  return Joi.number()
    .integer()
    .required()
    .messages({
      "any.required": getLang("ID_REQUIRED"),
      "number.base": getLang("ID_NUMBER"),
      "number.integer": getLang("ID_INTEGER"),
      "string.empty": getLang("ID_CANNOT_BE_EMPTY"),
    });
};

export const idNumber = (getLang: TGetLang) => {
  return Joi.string()
    .length(11)
    .required()
    .pattern(/^\d+$/)
    .messages({
      "string.length": getLang("ID_NUMBER_CHARACTER"),
      "string.pattern.base": getLang("ID_NUMBER_NUMBER"),
      "any.required": getLang("ID_NUMBER_REQUIRED"),
      "string.empty": getLang("ID_NUMBER_CANNOT_BE_EMPTY"),
      "string.base": getLang("ID_NUMBER_REQUIRED"),
    });
};

export const firstname = (getLang: TGetLang) => {
  return Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({
      "any.required": getLang("FIRSTNAME_REQUIRED"),
      "string.empty": getLang("FIRSTNAME_CANNOT_BE_EMPTY"),
      "string.base": getLang("FIRSTNAME_REQUIRED"),
      "string.min": getLang("FIRSTNAME_MIN"),
      "string.max": getLang("FIRSTNAME_MAX"),
    });
};

export const lastname = (getLang: TGetLang) => {
  return Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({
      "any.required": getLang("LASTNAME_REQUIRED"),
      "string.empty": getLang("ASTNAME_CANNOT_BE_EMPTY"),
      "string.base": getLang("LASTNAME_REQUIRED"),
      "string.min": getLang("LASTNAME_MIN"),
      "string.max": getLang("LASTNAME_MAX"),
    });
};

export const number = (getLang: TGetLang) => {
  return Joi.number()
    .required()
    .custom((value, helpers) => {
      const stringValue = value.toString();
      if (stringValue.length < 2 || stringValue.length > 15) {
        return helpers.error("any.invalid");
      }
      return value;
    }, "Custom length validation")
    .messages({
      "any.invalid": getLang("NUMBER_INVALID"),
      "any.required": getLang("NUMBER_REQUIRED"),
      "number.base": getLang("NUMBER_REQUIRED"),
      "string.empty": getLang("NUMBER_CANNOT_BE_EMPTY"),
    });
};

export const gender = (getLang: TGetLang) => {
  return Joi.string()
    .valid("Female", "Male")
    .required()
    .messages({
      "any.only": getLang("GENDER_VALIDATION_MESSAGE"),
      "any.required": getLang("GENDER_REQUIRED"),
      "string.empty": getLang("GENDER_EMPTY"),
      "string.base": getLang(" GENDER_REQUIRED"),
    });
};

export const birthday = (getLang: TGetLang) => {
  return Joi.date()
    .iso()
    .required()
    .messages({
      "any.required": getLang("BIRTHDAY_REQUIRED"),
      "date.base": getLang("BIRTHDAY_REQUIRED"),
      "date.empty": getLang("BIRTHDAY_CANNOT_BE_EMPTY"),
      "date.format": getLang("BIRTHDAY_INVALID"),
    });
};
