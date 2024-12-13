import { Model, DataTypes, Optional } from "sequelize";

import User from "./User";
import Student from "./Student";

import sequelizeConnection from "../db/connection";

interface TeacherNoteAttributes {
  id: number;
  teacher_id: number;
  student_id: number;
  title: string;
  note: string;
  created_at: Date;
  last_updated: Date;
}

interface TeacherNoteCreationAttributes
  extends Optional<
    TeacherNoteAttributes,
    "id" | "created_at" | "last_updated"
  > {}

class TeacherNote
  extends Model<TeacherNoteAttributes, TeacherNoteCreationAttributes>
  implements TeacherNoteAttributes
{
  public id!: number;
  public teacher_id!: number;
  public student_id!: number;
  public title!: string;
  public note!: string;
  public readonly created_at!: Date;
  public readonly last_updated!: Date;
}

TeacherNote.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    teacher_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Student,
        key: "id",
      },
      onDelete: "CASCADE", // Öğrenci silindiğinde öğretmen notlarını da sil
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    note: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    last_updated: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: sequelizeConnection,
    tableName: "teacher_notes",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "last_updated",
  }
);

export default TeacherNote;
export { TeacherNoteCreationAttributes };
