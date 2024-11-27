import joi from "joi";

export const studentSchema = joi.object({
  class_id: joi.number().required(),
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
});
