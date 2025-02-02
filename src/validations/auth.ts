import Joi from "joi";

import { TGetLang } from "../types";

import { email, password } from "./user";

export const getSession = () => {
  return Joi.object({
    body: Joi.object().max(0),
    query: Joi.object().max(0),
    params: Joi.object().max(0),
  });
};

export const login = (getLang: TGetLang) => {
  return Joi.object({
    body: Joi.object({
      email: email(getLang),
      password: password(getLang),
    }),
    query: Joi.object().max(0),
    params: Joi.object().max(0),
  });
};

export const register = (getLang: TGetLang) => {
  return Joi.object({
    body: Joi.object({
      firstname: Joi.string().min(3).max(30).required(),
      lastname: Joi.string().min(3).max(30).required(),
      username: Joi.string().min(3).max(30).required(),
      email: email(getLang),
      password: password(getLang),
    }),
    query: Joi.object().max(0),
    params: Joi.object().max(0),
  });
};

export const passwordReset = (getLang: TGetLang) => {
  return Joi.object({
    body: Joi.object({
      password: password(getLang),
      otp: Joi.string().length(6).required(),
      email: email(getLang),
    }),
    query: Joi.object().max(0),
    params: Joi.object().max(0),
  });
};
