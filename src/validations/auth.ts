import Joi from "joi";

import { TGetLang } from "../types";

export const schemaGetSession = () => {
  return Joi.object({
    body: Joi.object().max(0),
    query: Joi.object().max(0),
    params: Joi.object().max(0),
  });
};

export const schemaLogin = (getLang: TGetLang) => {
  return Joi.object({
    body: Joi.object({
      email: email(getLang),
      password: password(getLang),
    }).max(2),
    query: Joi.object().max(0),
    params: Joi.object().max(0),
  });
};

export const schemaRegister = (getLang: TGetLang) => {
  return Joi.object({
    body: Joi.object({
      firstname: firstname(getLang),
      lastname: lastname(getLang),
      username: username(getLang),
      email: email(getLang),
      password: password(getLang),
    }).max(5),
    query: Joi.object().max(0),
    params: Joi.object().max(0),
  });
};

export const schemaResetPassword = (getLang: TGetLang) => {
  return Joi.object({
    body: Joi.object({
      password: password(getLang),
      otp: otp(getLang),
      email: email(getLang),
    }).max(3),
    query: Joi.object().max(0),
    params: Joi.object().max(0),
  });
};

export const schemaForgotPassword = (getLang: TGetLang) => {
  return Joi.object({
    body: Joi.object({
      email: email(getLang),
    }).max(1),
    query: Joi.object().max(0),
    params: Joi.object().max(0),
  });
};

export const schemaRefreshToken = (getLang: TGetLang) => {
  return Joi.object({
    body: Joi.object({
      refreshToken: refreshToken(getLang),
    }).max(1),
    query: Joi.object().max(0),
    params: Joi.object().max(0),
  });
};

export const otp = (getLang: TGetLang) => {
  return Joi.string()
    .length(6)
    .required()
    .messages({
      "string.length": getLang("OTP_LENGTH"),
      "any.required": getLang("OTP_REQUIRED"),
      "string.empty": getLang("OTP_EMPTY"),
      "string.base": getLang("OTP_REQUIRED"),
    });
};

export const refreshToken = (getLang: TGetLang) => {
  return Joi.string()
    .required()
    .messages({
      "any.required": getLang("REFRESH_TOKEN_REQUIRED"),
      "string.empty": getLang("REFRESH_TOKEN_EMPTY"),
      "string.base": getLang("REFRESH_TOKEN_REQUIRED"),
    });
};

export const password = (getLang: TGetLang) => {
  return Joi.string()
    .min(8)
    .max(20)
    .pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]+$"))
    .required()
    .messages({
      "string.pattern.base": getLang("PASSWORD_REQUIREMENTS"),
      "string.min": getLang("PASSWORD_STRING_MIN"),
      "any.required": getLang("PASSWORD_REQUIRED"),
      "string.empty": getLang("PASSWORD_CANNOT_BE_EMPTY"),
      "string.base": getLang("PASSWORD_REQUIRED"),
      "string.max": getLang("PASSWORD_STRING_MAX"),
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
      "any.required": getLang("EMAIL_REQUIRED"),
      "string.empty": getLang("EMAIL_CANNOT_BE_EMPTY"),
      "string.base": getLang("EMAIL_REQUIRED"),
      "string.min": getLang("EMAIL_MIN"),
      "string.max": getLang("EMAIL_MAX"),
    });
};

export const username = (getLang: TGetLang) => {
  return Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({
      "any.required": getLang("USERNAME_REQUIRED"),
      "string.empty": getLang("USERNAME_CANNOT_BE_EMPTY"),
      "string.base": getLang("USERNAME_REQUIRED"),
      "string.min": getLang("USERNAME_MIN"),
      "string.max": getLang("USERNAME_MAX"),
    });
};

export const lastname = (getLang: TGetLang) => {
  return Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({
      "any.required": getLang("LASTNAME_REQUIRED"),
      "string.empty": getLang("LASTNAME_CANNOT_BE_EMPTY"),
      "string.base": getLang("LASTNAME_REQUIRED"),
      "string.min": getLang("LASTNAME_MIN"),
      "string.max": getLang("LASTNAME_MAX"),
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
