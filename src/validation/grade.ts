import joi from "joi";

export const existSchema = joi.object({
  grade_type: joi.string().min(3).max(30).required(),
});

export const createSchema = joi.object({
  grade_type: joi.string().min(3).max(30).required(),
  grade_value: joi.number().allow(null).optional(),
});

export const updateSchema = joi.object({
  grade_value: joi.number().allow(null).optional(),
});
