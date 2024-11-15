import { Response, NextFunction } from "express";
import { WhereOptions } from "sequelize";

import { customRequest } from "../types/customDefinition";
import { createGrade, gradeExists } from "../services/gradeService";
import Student from "../models/Student";
import Class from "../models/Class";

export const createGradeController = async (
  req: customRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { student_id, grade_type, grade_value } = req.body;

    // Öğrencinin var olup olmadığını kontrol et
    const student = await Student.findByPk(student_id);
    if (!student) {
      return res
        .status(404)
        .json({ message: "Student not found", error: true });
    }

    // Öğrencinin öğretmenin sınıfında olup olmadığını kontrol et
    const where: WhereOptions<Class> = {
      id: student.class_id,
      teacher_id: req.user.id,
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
    const exists = await gradeExists({ student_id, grade_type });
    if (exists) {
      return res.status(400).json({
        message: "Grade of this type already exists for this student",
        error: true,
      });
    }

    // Yeni not oluştur
    const newGrade = await createGrade({
      student_id,
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
