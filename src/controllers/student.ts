import { Response, NextFunction } from "express";
import { customRequest } from "../types/customDefinition";
import { classExists } from "../services/classService";
import { createStudent } from "../services/studentService";

export const createStudentController = async (
  req: customRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { class_id, student_name, student_lastname, student_number } =
      req.body;
    const { id: teacher_id } = req.user;

    const classExist = await classExists({ class_id, teacher_id });

    if (!classExist) {
      return res
        .status(403)
        .json({ errorMsg: "Class not found or not authorized", error: true });
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
