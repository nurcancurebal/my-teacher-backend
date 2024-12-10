import { Response, NextFunction } from "express";

import { customRequest } from "../types/customDefinition";

import {
  createTeacherNote,
  foundStudent,
  classBelongsToTeacher,
} from "../services/teacherNoteService";

export const createTeacherNoteController = async (
  req: customRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { student_id, title, note } = req.body;
    const { class_id } = req.params;
    const { id: teacher_id } = req.user;

    const classIdNumber = parseInt(class_id, 10);
    if (isNaN(classIdNumber)) {
      return res.status(400).json({ message: "Invalid class_id", error: true });
    }

    // Öğrencinin var olup olmadığını kontrol et
    const student = await foundStudent(student_id);
    if (!student) {
      return res
        .status(404)
        .json({ message: "Student not found", error: true });
    }

    // Öğrencinin öğretmenin sınıfında olup olmadığını kontrol et
    const studentClass = await classBelongsToTeacher({
      id: classIdNumber,
      teacher_id,
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
