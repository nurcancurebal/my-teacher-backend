import { WhereOptions } from "sequelize";
import Student, { StudentCreationAttributes } from "../models/Student";
import Class from "../models/Class";

export const getStudents = async (teacher_id: number, class_id?: number) => {
  const where: WhereOptions = {
    teacher_id,
  };

  if (class_id) {
    where.class_id = class_id;
  }

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

export const studentExistsByTc = async (tc: bigint) => {
  const where: WhereOptions = {
    tc,
  };

  const student = await Student.findOne({
    where,
  });
  return student !== null;
};

interface StudentAttributes extends StudentCreationAttributes {
  class_id: number;
  teacher_id: number;
  tc: bigint;
  student_name: string;
  student_lastname: string;
  student_number: number;
  gender: string;
  birthdate: Date;
}

export const createStudent = async (student: StudentAttributes) => {
  const newStudent = await Student.create(student);
  return newStudent;
};

interface UpdateStudent {
  id: number;
  class_id?: number;
  teacher_id: number;
  tc?: bigint;
  student_name?: string;
  student_lastname?: string;
  student_number?: number;
  gender?: string;
  birthdate?: Date;
}

export const updateStudent = async (student: UpdateStudent) => {
  const { id, teacher_id, ...rest } = student;

  const where: WhereOptions = {
    id,
    teacher_id,
  };

  const [updated] = await Student.update(rest, {
    where,
  });

  return updated;
};

export const studentRecord = async (id: number, teacher_id: number) => {
  const where: WhereOptions = {
    id,
    teacher_id,
  };

  const student = await Student.findOne({
    where,
  });

  return student;
};

export const deleteStudent = async (id: number) => {
  const where: WhereOptions = {
    id,
  };

  const deleted = await Student.destroy({
    where,
  });

  return deleted;
};
