import Joi from "joi";

export const student = () => {
  return Joi.object({
    body: Joi.object({
      tc: Joi.number()
        .integer()
        .required()
        .custom((value, helpers) => {
          const stringValue = value.toString();
          if (stringValue.length !== 11) {
            return helpers.error("any.invalid");
          }
          return value;
        }, "TC Length Validation")
        .messages({
          "any.invalid": "'tc' must be exactly 11 digits long",
          "number.base": "'tc' must be a number",
        }),
      student_name: Joi.string().min(3).max(30).required(),
      student_lastname: Joi.string().min(3).max(30).required(),
      student_number: Joi.number()
        .required()
        .custom((value, helpers) => {
          const stringValue = value.toString();
          if (stringValue.length < 2 || stringValue.length > 15) {
            return helpers.error("any.invalid");
          }
          return value;
        }, "Custom length validation")
        .messages({
          "any.invalid":
            "'student_number' must be between 2 and 15 characters long",
        }),
      gender: Joi.string().valid("K", "E").required().messages({
        "any.only": "'gender' must be one of [K, E]",
      }),
      birthdate: Joi.date().required(),
    }),
    query: Joi.object().max(0),
    params: Joi.object().max(0),
  });
};
