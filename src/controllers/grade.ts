import { Response, NextFunction } from "express";

import { customRequest } from "../types/customDefinition";
import { getGrade, gradeExists, createGrade } from "../services/gradeService";
import Student from "../models/Student";
import Class from "../models/Class";
import Grade from "../models/Grade";

export const getGradeController = async (
  req: customRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { class_id } = req.params;
    const teacher_id = req.user.id;

    const classIdNumber = parseInt(class_id, 10);
    if (isNaN(classIdNumber)) {
      return res.status(400).json({ message: "Invalid class_id", error: true });
    }

    // Sınıfın var olup olmadığını ve öğretmene ait olup olmadığını kontrol et
    const classExists = await Class.findOne({
      where: {
        id: classIdNumber,
        teacher_id,
      },
    });

    if (!classExists) {
      return res
        .status(404)
        .json({ message: "Class not found or not authorized", error: true });
    }

    const grades = await getGrade({ class_id: classIdNumber });

    return res.status(200).json({
      data: grades,
      error: false,
    });
  } catch (error) {
    next(error);
  }
};

export const existGradeController = async (
  req: customRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    let { grade_type } = req.body;
    const { class_id } = req.params;

    grade_type = grade_type
      .trim()
      .toLowerCase()
      .replace(/^[a-z]/, (c: string) => c.toUpperCase());

    const classIdNumber = parseInt(class_id, 10);

    // Sınıfın içerisinde öğrenci var mı kontrol et
    const studentCount = await Student.count({
      where: { class_id: classIdNumber },
    });

    if (studentCount === 0) {
      return res.status(404).json({
        message: "There are no students in the classroom",
        error: true,
      });
    }

    // Aynı türde notun tekrar girilmesini engelle
    const exists = await gradeExists({
      class_id: classIdNumber,
      grade_type,
    });
    if (exists) {
      return res.status(400).json({
        message: "This grade has been entered in this class before",
        error: true,
      });
    }

    return res.status(201).json({
      data: true,
      error: false,
    });
  } catch (error) {
    next(error);
  }
};

export const createGradeController = async (
  req: customRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { grade_value } = req.body;
    let { grade_type } = req.body;
    const { class_id, student_id } = req.params;
    const teacher_id = req.user.id;

    grade_type = grade_type
      .trim()
      .toLowerCase()
      .replace(/^[a-z]/, (c: string) => c.toUpperCase());

    // class_id'yi number türüne dönüştür
    const classIdNumber = parseInt(class_id, 10);
    if (isNaN(classIdNumber)) {
      return res.status(400).json({ message: "Invalid class_id", error: true });
    }

    const studentIdNumber = parseInt(student_id, 10);
    if (isNaN(studentIdNumber)) {
      return res.status(400).json({
        message: "Invalid student_id",
        error: true,
      });
    }

    // Sınıfın içerisinde öğrenci var mı
    const classStudent = await Student.findOne({
      where: { id: studentIdNumber, class_id: classIdNumber },
    });

    if (!classStudent) {
      return res.status(404).json({
        message: "There are no students in the classroom",
        error: true,
      });
    }

    // Öğrencinin belirtilen class_id'ye ait olup olmadığını kontrol et

    const student = await Student.findOne({
      where: {
        id: studentIdNumber,
        class_id: classIdNumber,
      },
    });
    if (!student) {
      return res.status(404).json({
        message: "Student not found in the specified class",
        error: true,
      });
    }

    // Öğrencinin öğretmenin sınıfında olup olmadığını kontrol et

    const studentClass = await Class.findOne({
      where: { id: classIdNumber, teacher_id },
    });
    if (!studentClass) {
      return res.status(403).json({
        message: "Not authorized to grade this student",
        error: true,
      });
    }

    // Aynı türde notun tekrar girilmesini engelle

    const exists = await Grade.findOne({
      where: {
        class_id: classIdNumber,
        student_id: studentIdNumber,
        grade_type,
      },
    });
    if (exists) {
      return res.status(400).json({
        message: "Grade of this type already exists for this student",
        error: true,
      });
    }

    // Yeni not oluştur
    const newGrade = await createGrade({
      student_id: studentIdNumber,
      class_id: classIdNumber,
      grade_type,
      grade_value,
    });

    return res.status(201).json({
      data: newGrade,
      error: false,
    });
  } catch (err) {
    next(err);
  }
};
