import joi from "joi";

export const createSchema = joi.object({
  student_id: joi.number().required(),
  title: joi.string().min(3).max(20).required(),
  note: joi.string().min(3).max(130).required(),
});
