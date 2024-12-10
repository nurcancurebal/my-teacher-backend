import { WhereOptions } from "sequelize";

import TeacherNote, {
  TeacherNoteCreationAttributes,
} from "../models/TeacherNote";

import Student from "../models/Student";
import Class from "../models/Class";

interface CreateTeacherNotePayload extends TeacherNoteCreationAttributes {
  teacher_id: number;
  student_id: number;
  title: string;
  note: string;
}

export const createTeacherNote = async (noteData: CreateTeacherNotePayload) => {
  const newNote = await TeacherNote.create(noteData);
  return newNote;
};

export const foundStudent = async (student_id: number) => {
  const student = await Student.findByPk(student_id);
  return student;
};

interface classBelongsToTeacherParams {
  id: number;
  teacher_id: number;
}

export const classBelongsToTeacher = async (
  payload: classBelongsToTeacherParams
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
