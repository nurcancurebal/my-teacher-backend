import joi from "joi";

export const studentSchema = joi.object({
  tc: joi
    .number()
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
  student_name: joi.string().min(3).max(30).required(),
  student_lastname: joi.string().min(3).max(30).required(),
  student_number: joi
    .number()
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
  gender: joi.string().valid("K", "E").required().messages({
    "any.only": "'gender' must be one of [K, E]",
  }),
  birthdate: joi.date().required(),
});
