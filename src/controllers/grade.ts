import { Response, NextFunction } from "express";
import { format } from "date-fns";
import { customRequest } from "../types/customDefinition";
import {
  getGrade,
  gradeExists,
  checkStudentInClass,
  countStudentInClass,
  checkDuplicateGrade,
  createGrade,
  updateGrade,
  checkTeacherClass,
  getLastAddedGrade,
} from "../services/gradeService";

const formatName = (name: string): string => {
  return name
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (c, index) =>
      index === 0 || name[index - 1] === " " ? c.toUpperCase() : c
    );
};

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
    const studentClass = await checkTeacherClass({
      id: classIdNumber,
      teacher_id,
    });

    if (!studentClass) {
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

    grade_type = formatName(grade_type);

    const classIdNumber = parseInt(class_id, 10);

    // Sınıfın içerisinde öğrenci var mı kontrol et
    const studentCount = await countStudentInClass({ class_id: classIdNumber });

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

export const getLastAddedGradeController = async (
  _req: customRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const grade = await getLastAddedGrade();
    if (!grade) {
      return res.status(404).json({ message: "No grades found", error: true });
    }

    const formattedDate = format(grade.created_at, "dd.MM.yyyy");

    return res.status(200).json({
      data: formattedDate,
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

    grade_type = formatName(grade_type);

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

    // Öğrencinin belirtilen class_id'ye ait olup olmadığını kontrol et
    const student = await checkStudentInClass({
      student_id: studentIdNumber,
      class_id: classIdNumber,
    });
    if (!student) {
      return res.status(404).json({
        message: "Student not found in the specified class",
        error: true,
      });
    }

    // Öğrencinin öğretmenin sınıfında olup olmadığını kontrol et
    const studentClass = await checkTeacherClass({
      id: classIdNumber,
      teacher_id,
    });
    if (!studentClass) {
      return res.status(403).json({
        message: "Not authorized to grade this student",
        error: true,
      });
    }

    // Aynı öğrenciye aynı türde notun tekrar girilmesini engelle
    const duplicateGrade = await checkDuplicateGrade({
      class_id: classIdNumber,
      student_id: studentIdNumber,
      grade_type,
    });
    if (duplicateGrade) {
      return res.status(400).json({
        message: "Grade of this type already exists for this student",
        error: true,
      });
    }

    // Yeni not oluştur
    await createGrade({
      student_id: studentIdNumber,
      class_id: classIdNumber,
      grade_type,
      grade_value,
    });

    return res.status(201).json({
      message: "Grades have been successfully created",
      error: false,
    });
  } catch (err) {
    next(err);
  }
};

export const updateGradeController = async (
  req: customRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { grade_value } = req.body;
    const { class_id, student_id, id } = req.params;
    const teacher_id = req.user.id;

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

    const gradeIdNumber = parseInt(id, 10);
    if (isNaN(gradeIdNumber)) {
      return res.status(400).json({
        message: "Invalid grade_id",
        error: true,
      });
    }

    // Öğrencinin belirtilen class_id'ye ait olup olmadığını kontrol et
    const student = await checkStudentInClass({
      student_id: studentIdNumber,
      class_id: classIdNumber,
    });
    if (!student) {
      return res.status(404).json({
        message: "Student not found in the specified class",
        error: true,
      });
    }

    // Öğrencinin öğretmenin sınıfında olup olmadığını kontrol et
    const studentClass = await checkTeacherClass({
      id: classIdNumber,
      teacher_id,
    });
    if (!studentClass) {
      return res.status(403).json({
        message: "Not authorized to grade this student",
        error: true,
      });
    }

    // Notu güncelle
    const grade = await updateGrade({
      id: gradeIdNumber,
      class_id: classIdNumber,
      student_id: studentIdNumber,
      grade_value,
    });

    return res.status(200).json({
      data: grade,
      error: false,
    });
  } catch (err) {
    next(err);
  }
};
