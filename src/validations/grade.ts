import Joi from "joi";

export const exist = () => {
  return Joi.object({
    body: Joi.object({
      grade_type: Joi.string().min(3).max(30).required(),
    }),
    query: Joi.object().max(0),
    params: Joi.object().max(0),
  });
};

export const create = () => {
  return Joi.object({
    body: Joi.object({
      grade_type: Joi.string().min(3).max(30).required(),
      grade_value: Joi.number().allow(null).optional(),
    }),
    query: Joi.object().max(0),
    params: Joi.object().max(0),
  });
};

export const update = () => {
  return Joi.object({
    body: Joi.object({
      grade_value: Joi.number().allow(null).optional(),
    }),
    query: Joi.object().max(0),
    params: Joi.object().max(0),
  });
};
