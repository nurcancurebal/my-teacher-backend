import Joi from "joi";

export const create = () => {
  return Joi.object({
    body: Joi.object({
      student_id: Joi.number().required(),
      title: Joi.string().min(3).max(20).required(),
      note: Joi.string().min(3).max(130).required(),
    }),
    query: Joi.object().max(0),
    params: Joi.object().max(0),
  });
};
