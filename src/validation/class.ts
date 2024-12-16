import joi from "joi";

export const createSchema = joi.object({
  class_name: joi.string().min(2).max(3).required(),
  explanation: joi.string().required(),
});

export const updateSchema = joi
  .object({
    class_name: joi.string().min(2).max(3),
    explanation: joi.string(),
  })
  .or("class_name", "explanation"); // En az birinin bulunmasını zorunlu kılar;
