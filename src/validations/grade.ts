import Joi from "joi";

import { TGetLang } from "../types";

import { studentId } from "./student";
import { classId } from "./class";

export const schemaCreateOne = (getLang: TGetLang) => {
  return Joi.object({
    body: Joi.object({
      gradeType: gradeType(getLang),
      gradeValue: gradeValue(getLang),
    }).max(2),
    query: Joi.object().max(0),
    params: Joi.object({
      classId: classId(getLang),
      studentId: studentId(getLang),
    }).max(2),
  });
};

export const schemaUpdateOne = (getLang: TGetLang) => {
  return Joi.object({
    body: Joi.object({
      gradeValue: gradeValue(getLang),
      gradeType: gradeType(getLang),
    }).max(2),
    query: Joi.object().max(0),
    params: Joi.object({
      classId: classId(getLang),
      studentId: studentId(getLang),
      id: gradeId(getLang),
    }).max(3),
  });
};

export const schemaLatestGrade = () => {
  return Joi.object({
    body: Joi.object().max(0),
    query: Joi.object().max(0),
    params: Joi.object().max(0),
  });
};

export const schemaClassIdFindAll = (getLang: TGetLang) => {
  return Joi.object({
    body: Joi.object().max(0),
    query: Joi.object().max(0),
    params: Joi.object({
      classId: classId(getLang),
    }).max(1),
  });
};

export const schemaGradeTypeExists = (getLang: TGetLang) => {
  return Joi.object({
    body: Joi.object({
      gradeType: gradeType(getLang),
    }).max(1),
    query: Joi.object().max(0),
    params: Joi.object({
      classId: classId(getLang),
    }).max(1),
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
      "string.empty": getLang("GRADE_TYPE_EMPTY"),
    });
};

export const gradeValue = (getLang: TGetLang) => {
  return Joi.number()
    .allow(null)
    .required()
    .min(0)
    .max(100)
    .messages({
      "number.base": getLang("GRADE_VALUE_NUMBER"),
      "any.required": getLang("GRADE_VALUE_REQUIRED"),
      "number.integer": getLang("GRADE_VALUE_INTEGER"),
      "number.empty": getLang("GRADE_VALUE_EMPTY"),
      "number.min": getLang("GRADE_VALUE_NUMBER_MIN"),
      "number.max": getLang("GRADE_VALUE_NUMBER_MAX"),
    });
};

export const gradeId = (getLang: TGetLang) => {
  return Joi.number()
    .required()
    .messages({
      "number.base": getLang("GRADE_ID_NUMBER"),
      "any.required": getLang("GRADE_ID_REQUIRED"),
      "number.integer": getLang("GRADE_ID_INTEGER"),
      "number.empty": getLang("GRADE_ID_EMPTY"),
    });
};
