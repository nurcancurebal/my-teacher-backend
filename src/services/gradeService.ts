import Grade, { GradeCreationAttributes } from "../models/Grade";
import { WhereOptions } from "sequelize";
import Student from "../models/Student";
import Class from "../models/Class";

interface GetGradeOptions {
  class_id: number;
}

export const getGrade = async (options: GetGradeOptions) => {
  const where: WhereOptions = {
    class_id: options.class_id,
  };

  const grades = await Grade.findAll({
    where,
  });
  return grades;
};

interface GradeExistsOptions {
  class_id: number;
  grade_type: string;
}

// Aynı Türde Notun Aynı Sınıfa Tekrar Girilmesini Engelleme
export const gradeExists = async (options: GradeExistsOptions) => {
  if (!options.class_id || !options.grade_type) {
    throw new Error("class_id and grade_type are required");
  }

  const where: WhereOptions = {
    class_id: options.class_id,
    grade_type: options.grade_type,
  };

  const grade = await Grade.findOne({ where });
  return grade !== null;
};

interface CheckStudentInClassOptions {
  student_id: number;
  class_id: number;
}

export const checkStudentInClass = async (
  options: CheckStudentInClassOptions
) => {
  const where: WhereOptions = {
    id: options.student_id,
    class_id: options.class_id,
  };

  const student = await Student.findOne({
    where,
  });
  return student;
};

interface CheckTeacherClassOptions {
  id: number;
  teacher_id: number;
}

export const checkTeacherClass = async (options: CheckTeacherClassOptions) => {
  const where: WhereOptions = {
    id: options.id,
    teacher_id: options.teacher_id,
  };

  const studentClass = await Class.findOne({
    where,
  });

  return studentClass;
};

interface CountStudentInClassOptions {
  class_id: number;
}

export const countStudentInClass = async (
  options: CountStudentInClassOptions
) => {
  const where: WhereOptions = {
    class_id: options.class_id,
  };

  const studentCount = await Student.count({
    where,
  });
  return studentCount;
};

interface CreateGradePayload extends GradeCreationAttributes {
  student_id: number;
  class_id: number;
  grade_type: string;
  grade_value: number | null;
}

interface checkDuplicateGradePayload {
  class_id: number;
  student_id: number;
  grade_type: string;
}

export const checkDuplicateGrade = async (
  payload: checkDuplicateGradePayload
) => {
  const where: WhereOptions = {
    class_id: payload.class_id,
    student_id: payload.student_id,
    grade_type: payload.grade_type,
  };

  const duplicateGrade = await Grade.findOne({
    where,
  });

  return duplicateGrade;
};

export const createGrade = async (payload: CreateGradePayload) => {
  const grade = await Grade.create(payload);
  return grade;
};

interface UpdateGradePayload {
  id: number;
  student_id: number;
  class_id: number;
  grade_value: number | null;
}

export const updateGrade = async (payload: UpdateGradePayload) => {
  const { id, student_id, class_id, grade_value } = payload;

  const where: WhereOptions = { id, student_id, class_id };

  const grade = await Grade.update({ grade_value }, { where });
  return grade;
};
