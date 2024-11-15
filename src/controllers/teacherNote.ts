import { Response, NextFunction } from "express";
import { WhereOptions } from "sequelize";

import { customRequest } from "../types/customDefinition";
import Student from "../models/Student";
import Class from "../models/Class";
import { createTeacherNote } from "../services/teacherNoteService";

export const createTeacherNoteController = async (
  req: customRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { student_id, title, note } = req.body;
    const { id: teacher_id } = req.user;

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

    // Yeni not oluştur
    const newNote = await createTeacherNote({
      student_id,
      teacher_id,
      title,
      note,
    });

    return res.status(201).json({
      data: newNote,
      error: false,
    });
  } catch (error) {
    next(error);
  }
};
