import { Response, NextFunction } from "express";
import { WhereOptions } from "sequelize";
import { customRequest } from "../types/customDefinition";
import { createStudent, studentExists } from "../services/studentService";
import { ApiError } from "../util/ApiError";
import Class from "../models/Class";

export const createStudentController = async (
  req: customRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { class_id, student_name, student_lastname, student_number } =
      req.body;

    // Öğrencinin var olup olmadığını kontrol et
    const studentExist = await studentExists(student_number);
    if (studentExist) {
      throw new ApiError(400, "Student number is already used");
    }

    // Sınıfın var olup olmadığını ve öğretmene ait olup olmadığını kontrol et
    const where: WhereOptions<Class> = {
      id: class_id,
      teacher_id: req.user.id,
    };

    const studentClass = await Class.findOne({
      where,
    });
    if (!studentClass) {
      throw new ApiError(404, "Class not found or not authorized");
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
