import { Response, NextFunction } from "express";
import { customRequest } from "../types/customDefinition";
import {
  classBelongsToTeacher,
  createStudent,
  studentExists,
  getStudentCount,
  getStudents,
  getStudentClassCount,
} from "../services/studentService";
import { ApiError } from "../util/ApiError";

const formatName = (name: string): string => {
  return name
    .trim()
    .toLowerCase()
    .replace(/^\w/, c => c.toUpperCase());
};

export const getStudentsController = async (
  req: customRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: teacher_id } = req.user;
    const { class_id } = req.params;

    // class_id'yi number türüne dönüştür
    const classIdNumber = parseInt(class_id, 10);

    if (isNaN(classIdNumber)) {
      throw new ApiError(400, "Invalid class_id");
    }

    const students = await getStudents(teacher_id, classIdNumber);

    return res.status(200).json({ data: students, error: false });
  } catch (err) {
    next(err);
  }
};

export const getClassCountController = async (
  req: customRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { class_id } = req.params;

    const classIdNumber = parseInt(class_id, 10);

    if (isNaN(classIdNumber)) {
      throw new ApiError(400, "Invalid class_id");
    }

    const studentCount = await getStudentClassCount(classIdNumber);

    return res.status(200).json({ data: studentCount, error: false });
  } catch (err) {
    next(err);
  }
};

export const getStudentCountController = async (
  req: customRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: teacher_id } = req.user;

    const studentCount = await getStudentCount(teacher_id);

    return res.status(200).json({ data: studentCount, error: false });
  } catch (err) {
    next(err);
  }
};

export const createStudentController = async (
  req: customRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { class_id, student_number } = req.body;
    let { student_name, student_lastname } = req.body;

    const { id: teacher_id } = req.user;

    student_name = formatName(student_name);
    student_lastname = formatName(student_lastname);

    // Öğrencinin var olup olmadığını kontrol et
    const studentExist = await studentExists(student_number);
    if (studentExist) {
      throw new ApiError(400, "Student number is already used");
    }

    // Sınıfın var olup olmadığını ve öğretmene ait olup olmadığını kontrol et
    const teacherClass = await classBelongsToTeacher({
      id: class_id,
      teacher_id,
    });
    if (!teacherClass) {
      throw new ApiError(404, "Class not found or not authorized");
    }

    const student = await createStudent({
      class_id,
      teacher_id,
      student_name,
      student_lastname,
      student_number,
    });

    return res.status(201).json({ data: student, error: false });
  } catch (err) {
    next(err);
  }
};
