import { WhereOptions } from "sequelize";
import Student, { StudentCreationAttributes } from "../models/Student";

export const studentExists = async (student_number: number) => {
  const where: WhereOptions = {
    student_number,
  };

  const student = await Student.findOne({
    where,
  });
  return student !== null;
};

interface StudentAttributes extends StudentCreationAttributes {
  teacher_id: number;
  class_id: number;
  student_name: string;
  student_lastname: string;
  student_number: number;
}

export const createStudent = async (student: StudentAttributes) => {
  const newStudent = await Student.create(student);
  return newStudent;
};

export const getStudentCount = async (teacher_id: number) => {
  const where: WhereOptions = {
    teacher_id,
  };

  const count = await Student.count({ where });
  return count;
};
