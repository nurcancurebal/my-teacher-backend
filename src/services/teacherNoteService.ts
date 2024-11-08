import TeacherNote, {
  TeacherNoteCreationAttributes,
} from "../models/TeacherNote";

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
