import { WhereOptions } from "sequelize";
import Student, { StudentCreationAttributes } from "../models/Student";
import Class from "../models/Class";

export const getStudents = async (teacher_id: number, class_id: number) => {
  const where: WhereOptions = {
    teacher_id,
    class_id,
  };

  const students = await Student.findAll({ where });
  return students;
};

export const getStudentClassCount = async (class_id: number) => {
  const where: WhereOptions = {
    class_id,
  };

  const count = await Student.count({ where });
  return count;
};

export const getStudentCount = async (teacher_id: number) => {
  const where: WhereOptions = {
    teacher_id,
  };

  const count = await Student.count({ where });
  return count;
};

export const studentExists = async (student_number: number) => {
  const where: WhereOptions = {
    student_number,
  };

  const student = await Student.findOne({
    where,
  });
  return student !== null;
};

interface ClassBelongsToTeacherParams {
  id: number;
  teacher_id: number;
}

export const classBelongsToTeacher = async (
  payload: ClassBelongsToTeacherParams
) => {
  const where: WhereOptions = {
    id: payload.id,
    teacher_id: payload.teacher_id,
  };

  const teacherClass = await Class.findOne({
    where,
  });

  return teacherClass;
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
