import { Response, NextFunction } from "express";
import { customRequest } from "../types/customDefinition";
import { createGrade, gradeExists } from "../services/gradeService";
import Student from "../models/Student";
import Class from "../models/Class";
import { WhereOptions } from "sequelize";

export const createGradeController = async (
  req: customRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { student_id, grade_type, grade_value } = req.body;
    const { id: teacher_id } = req.user;

    // Öğrencinin var olup olmadığını kontrol et
    const student = await Student.findByPk(student_id);
    if (!student) {
      return res
        .status(404)
        .json({ errorMsg: "Student not found", error: true });
    }

    // Öğrencinin öğretmenin sınıfında olup olmadığını kontrol et
    const where: WhereOptions = {
      id: student.class_id,
      teacher_id,
    };

    const studentClass = await Class.findOne({
      where,
    });
    if (!studentClass) {
      return res.status(403).json({
        errorMsg: "Not authorized to grade this student",
        error: true,
      });
    }

    // Aynı türde notun tekrar girilmesini engelle
    const exists = await gradeExists({ student_id, grade_type });
    if (exists) {
      return res
        .status(400)
        .json({
          errorMsg: "Grade of this type already exists for this student",
          error: true,
        });
    }

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
