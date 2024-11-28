import Joi from "joi";

export const registerSchema = Joi.object({
  firstname: Joi.string().min(3).max(30).required(),
  lastname: Joi.string().min(3).max(30).required(),
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]+$"))
    .required()
    .messages({
      "string.pattern.base":
        "The password must contain at least one letter and one number.",
    }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]+$"))
    .required()
    .messages({
      "string.pattern.base":
        "The password must contain at least one letter and one number.",
    }),
});

export const updateSchema = Joi.object({
  firstname: Joi.string().min(3).max(30).required(),
  lastname: Joi.string().min(3).max(30).required(),
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]+$"))
    .required()
    .messages({
      "string.pattern.base":
        "The password must contain at least one letter and one number.",
    }),
});

export const passwordResetSchema = Joi.object({
  password: Joi.string()
    .min(8)
    .pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]+$"))
    .required()
    .messages({
      "string.pattern.base":
        "The password must contain at least one letter and one number.",
    }),
  otp: Joi.string().length(6).required(),
  email: Joi.string().email().required(),
});
