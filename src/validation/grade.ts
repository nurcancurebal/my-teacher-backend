import joi from "joi";

export const existSchema = joi.object({
  class_id: joi.number().required(),
  grade_type: joi.string().min(3).max(30).required(),
});

export const createSchema = joi.object({
  student_id: joi.number().required(),
  grade_type: joi.string().min(3).max(30).required(),
  grade_value: joi.number().required(),
});
