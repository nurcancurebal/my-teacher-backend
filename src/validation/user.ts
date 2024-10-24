import Joi from "joi";

export const registerSchema = Joi.object({
  firstname: Joi.string().min(3).max(30).required(),
  lastname: Joi.string().min(3).max(30).required(),
  username: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export const updateSchema = Joi.object({
  firstname: Joi.string().min(3).max(30),
  username: Joi.string(),
  country_code: Joi.string(),
  country: Joi.string(),
  province: Joi.string(),
  location: Joi.string(),
  date_of_birth: Joi.string(),
});
