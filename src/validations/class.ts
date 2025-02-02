import Joi from "joi";

export const create = () => {
  return Joi.object({
    body: Joi.object({
      class_name: Joi.string().min(2).max(3).required(),
      explanation: Joi.string().required(),
    }),
    query: Joi.object().max(0),
    params: Joi.object().max(0),
  });
};

export const update = () => {
  return Joi.object({
    body: Joi.object({
      class_name: Joi.string().min(2).max(3),
      explanation: Joi.string(),
    }).or("class_name", "explanation"),
    query: Joi.object().max(0),
    params: Joi.object().max(0),
  });
};
