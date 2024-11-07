import Grade, { GradeCreationAttributes } from "../models/Grade";
import { WhereOptions } from "sequelize";

interface GradeExistsOptions {
  student_id: number;
  grade_type: string;
}

// Aynı Türde Notun Tekrar Girilmesini Engelleme
export const gradeExists = async (options: GradeExistsOptions) => {
  if (!options.student_id || !options.grade_type) {
    throw new Error("student_id and grade_type are required");
  }

  const where: WhereOptions = {
    student_id: options.student_id,
    grade_type: options.grade_type,
  };

  const grade = await Grade.findOne({ where });
  return grade !== null;
};

interface CreateGradePayload extends GradeCreationAttributes {
  student_id: number;
  grade_type: string;
  grade_value: number;
}

export const createGrade = async (payload: CreateGradePayload) => {
  const grade = await Grade.create(payload);
  return grade;
};
