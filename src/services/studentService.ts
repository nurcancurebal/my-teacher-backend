import Student from "../models/Student";

interface StudentAttributes {
  class_id: number;
  student_name: string;
  student_lastname: string;
  student_number: string;
}

export const createStudent = async (student: StudentAttributes) => {
  const newStudent = await Student.create(student);
  return newStudent;
};
