import joi from "joi";

export const studentSchema = joi.object({
  class_id: joi.number().required(),
  student_name: joi.string().min(3).max(30).required(),
  student_lastname: joi.string().min(3).max(30).required(),
  student_number: joi.string().min(2).max(15).required(),
});
