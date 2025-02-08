import Joi from "joi";

import { TGetLang } from "../types";

import { email, password, firstname, lastname, username } from "./auth";

export const schemaUpdate = (getLang: TGetLang) => {
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
