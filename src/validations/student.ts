import Joi from "joi";

import { TGetLang } from "../types";

import { classId } from "./class";

export const schemaStudent = (getLang: TGetLang) => {
  return Joi.object({
    body: Joi.object({
      idNumber: idNumber(getLang),
      studentName: studentName(getLang),
      studentLastname: studentLastname(getLang),
      studentNumber: studentNumber(getLang),
      gender: gender(getLang),
      birthdate: birthdate(getLang),
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
      studentName: studentName(getLang),
      studentLastname: studentLastname(getLang),
      studentNumber: studentNumber(getLang),
      gender: gender(getLang),
      birthdate: birthdate(getLang),
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
      studentName: studentName(getLang),
      studentLastname: studentLastname(getLang),
      studentNumber: studentNumber(getLang),
      birthdate: birthdate(getLang),
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
    }, "ID Number Length Validation")
    .messages({
      "any.invalid": getLang("ID_NUMBER_CHARACTER"),
      "number.base": getLang("ID_NUMBER_NUMBER"),
      "any.required": getLang("ID_NUMBER_REQUIRED"),
      "number.integer": getLang("ID_NUMBER_INTEGER"),
      "string.empty": getLang("ID_NUMBER_CANNOT_BE_EMPTY"),
      "string.base": getLang("ID_NUMBER_REQUIRED"),
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
    .iso()
    .required()
    .messages({
      "any.required": getLang("BIRTHDATE_REQUIRED"),
      "date.base": getLang("BIRTHDATE_REQUIRED"),
      "date.empty": getLang("BIRTHDATE_CANNOT_BE_EMPTY"),
      "date.format": getLang("BIRTHDATE_INVALID"),
    });
};
