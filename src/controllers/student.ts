import { Response, NextFunction } from "express";
import { customRequest } from "../types/customDefinition";
import { createStudent, studentExists } from "../services/studentService";
import { ApiError } from "../util/ApiError";

export const createStudentController = async (
  req: customRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { class_id, student_name, student_lastname, student_number } =
      req.body;

    const studentExist = await studentExists(student_number);
    if (studentExist) {
      throw new ApiError(400, "Email is alredy used");
    }

    const student = await createStudent({
      class_id,
      student_name,
      student_lastname,
      student_number,
    });

    return res.status(201).json({ student, error: false });
  } catch (err) {
    next(err);
  }
};
