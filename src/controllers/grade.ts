import { Response, NextFunction } from "express";
import { WhereOptions } from "sequelize";

import { customRequest } from "../types/customDefinition";
import { getGrade, gradeExists, createGrade } from "../services/gradeService";
import Student from "../models/Student";
import Class from "../models/Class";

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
    const { class_id } = req.body;
    let { grade_type } = req.body;

    grade_type = grade_type
      .trim()
      .toLowerCase()
      .replace(/^[a-z]/, (c: string) => c.toUpperCase());

    // Aynı türde notun tekrar girilmesini engelle
    const exists = await gradeExists({ class_id, grade_type });
    if (exists) {
      return res.status(400).json({
        message: "Grade of this type already exists for this student",
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
    const { student_id, grade_value } = req.body;
    let { grade_type } = req.body;
    const { class_id } = req.params;
    const teacher_id = req.user.id;

    // class_id'yi number türüne dönüştür
    const classIdNumber = parseInt(class_id, 10);
    if (isNaN(classIdNumber)) {
      return res.status(400).json({ message: "Invalid class_id", error: true });
    }

    grade_type = grade_type
      .trim()
      .toLowerCase()
      .replace(/^[a-z]/, (c: string) => c.toUpperCase());

    // Öğrencinin var olup olmadığını kontrol et
    const student = await Student.findByPk(student_id);
    if (!student) {
      return res
        .status(404)
        .json({ message: "Student not found", error: true });
    }

    // Öğrencinin öğretmenin sınıfında olup olmadığını kontrol et
    const where: WhereOptions<Class> = {
      id: classIdNumber,
      teacher_id,
    };

    const studentClass = await Class.findOne({
      where,
    });
    if (!studentClass) {
      return res.status(403).json({
        message: "Not authorized to grade this student",
        error: true,
      });
    }

    // Aynı türde notun tekrar girilmesini engelle
    const exists = await gradeExists({ class_id: classIdNumber, grade_type });
    if (exists) {
      return res.status(400).json({
        message: "Grade of this type already exists for this student",
        error: true,
      });
    }

    // Yeni not oluştur
    const newGrade = await createGrade({
      student_id,
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
