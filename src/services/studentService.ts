import { WhereOptions } from "sequelize";
import Student from "../models/Student";

export const studentExists = async (student_number: number) => {
  if (!student_number) {
    throw new Error("Student number is required");
  }

  const where: WhereOptions = {
    student_number,
  };

  const student = await Student.findOne({
    where,
  });
  return student !== null;
};

interface StudentAttributes {
  class_id: number;
  student_name: string;
  student_lastname: string;
  student_number: number;
}

export const createStudent = async (student: StudentAttributes) => {
  const newStudent = await Student.create(student);
  return newStudent;
};
