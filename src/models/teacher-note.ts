import { Model, DataTypes, Optional } from "sequelize";

import sequelize from "../utils/db";

import ModelUser from "./user";
import ModelStudent from "./student";

interface ITeacherNoteAttributes {
  id: number;
  teacher_id: number;
  student_id: number;
  title: string;
  note: string;
  created_at: Date;
  last_updated: Date;
}

interface ITeacherNoteCreationAttributes
  extends Optional<
    ITeacherNoteAttributes,
    "id" | "created_at" | "last_updated"
  > {}

class ModelTeacherNote
  extends Model<ITeacherNoteAttributes, ITeacherNoteCreationAttributes>
  implements ITeacherNoteAttributes
{
  public id!: number;
  public teacher_id!: number;
  public student_id!: number;
  public title!: string;
  public note!: string;
  public readonly created_at!: Date;
  public readonly last_updated!: Date;
}

ModelTeacherNote.init(
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
        model: ModelUser,
        key: "id",
      },
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ModelStudent,
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
    sequelize,
    tableName: "teacher_notes",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "last_updated",
  }
);

export default ModelTeacherNote;
export { ITeacherNoteCreationAttributes };
