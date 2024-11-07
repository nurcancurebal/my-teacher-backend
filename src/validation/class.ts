import joi from "joi";

export const classSchema = joi.object({
  class_name: joi.string().min(2).max(3).required(),
});
