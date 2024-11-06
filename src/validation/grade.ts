import joi from "joi";

export const gradeSchema = joi.object({
  student_id: joi.number().required(),
  exam1: joi.number().optional(),
  exam2: joi.number().optional(),
  exam3: joi.number().optional(),
  oral1: joi.number().optional(),
  oral2: joi.number().optional(),
  oral3: joi.number().optional(),
  performance1: joi.number().optional(),
  performance2: joi.number().optional(),
  performance3: joi.number().optional(),
  project: joi.number().optional(),
  note1: joi.string().optional(),
  note2: joi.string().optional(),
  note3: joi.string().optional(),
});
