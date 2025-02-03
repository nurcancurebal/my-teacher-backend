import Joi from "joi";

import { TGetLang } from "../types";

export const schemaStudent = (getLang: TGetLang) => {
  return Joi.object({
    body: Joi.object({
      id_number: idNumber(getLang),
      student_name: studentName(getLang),
      student_lastname: studentLastname(getLang),
      student_number: studentNumber(getLang),
      gender: gender(getLang),
      birthdate: birthdate(getLang),
    }),
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

export const schemaGetAll = () => {
  return Joi.object({
    body: Joi.object().max(0),
    query: Joi.object().max(0),
    params: Joi.object().max(0),
  });
};

export const idNumber = (getLang: TGetLang) => {
  return Joi.number()
    .integer()
    .required()
    .custom((value, helpers) => {
      const stringValue = value.toString();
      if (stringValue.length !== 11) {
        return helpers.error("any.invalid");
      }
      return value;
    }, "TC Length Validation")
    .messages({
      "any.invalid": getLang("TC_CHARACTER"),
      "number.base": getLang("TC_NUMBER"),
      "any.required": getLang("TC_REQUIRED"),
      "number.integer": getLang("TC_INTEGER"),
      "string.empty": getLang("TC_CANNOT_BE_EMPTY"),
      "string.base": getLang("TC_REQUIRED"),
    });
};

export const studentName = (getLang: TGetLang) => {
  return Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({
      "any.required": getLang("STUDENTNAME_REQUIRED"),
      "string.empty": getLang("STUDENTNAME_CANNOT_BE_EMPTY"),
      "string.base": getLang("STUDENTNAME_REQUIRED"),
      "string.min": getLang("STUDENTNAME_MIN"),
      "string.max": getLang("STUDENTNAME_MAX"),
    });
};

export const studentLastname = (getLang: TGetLang) => {
  return Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({
      "any.required": getLang("STUDENT_LASTNAME_REQUIRED"),
      "string.empty": getLang("STUDENT_LASTNAME_CANNOT_BE_EMPTY"),
      "string.base": getLang("STUDENT_LASTNAME_REQUIRED"),
      "string.min": getLang("STUDENT_LASTNAME_MIN"),
      "string.max": getLang("STUDENT_LASTNAME_MAX"),
    });
};

export const studentNumber = (getLang: TGetLang) => {
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
      "any.invalid": getLang("STUDENT_NUMBER_INVALID"),
      "any.required": getLang("STUDENT_NUMBER_REQUIRED"),
      "number.base": getLang("STUDENT_NUMBER_REQUIRED"),
      "string.empty": getLang("STUDENT_NUMBER_CANNOT_BE_EMPTY"),
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

export const birthdate = (getLang: TGetLang) => {
  return Joi.date()
    .required()
    .messages({
      "any.required": getLang("BIRTHDATE_REQUIRED"),
      "date.base": getLang("BIRTHDATE_REQUIRED"),
      "date.empty": getLang("BIRTHDATE_CANNOT_BE_EMPTY"),
      "date.format": getLang("BIRTHDATE_INVALID"),
    });
};
