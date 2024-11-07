import joi from "joi";

export const createSchema = joi.object({
  student_id: joi.number().required(),
  grade_type: joi.string().required(),
  grade_value: joi.number().required(),
});
