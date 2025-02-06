import Joi from "joi";

import { TGetLang } from "../types";

import { email, password, firstname, lastname, username } from "./user";

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
