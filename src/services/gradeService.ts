import Grade, { GradeCreationAttributes } from "../models/Grade";
import { WhereOptions } from "sequelize";

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

// Aynı Türde Notun Tekrar Girilmesini Engelleme
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

interface CreateGradePayload extends GradeCreationAttributes {
  student_id: number;
  class_id: number;
  grade_type: string;
  grade_value: number;
}

export const createGrade = async (payload: CreateGradePayload) => {
  const grade = await Grade.create(payload);
  return grade;
};
