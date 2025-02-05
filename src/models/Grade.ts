import { DataTypes, Model, Optional } from "sequelize";

import sequelize from "../utils/db";

import ModelStudent from "./student";
import ModelClass from "./class";
import ModelUser from "./user";

interface IGradeAttributes {
  id: number;
  teacher_id: number;
  student_id: number;
  class_id: number;
  grade_type: string;
  grade_value: number | null;
  created_at: Date;
  last_updated: Date;
}

interface IGradeCreationAttributes
  extends Optional<IGradeAttributes, "id" | "created_at" | "last_updated"> {}

class ModelGrade
  extends Model<IGradeAttributes, IGradeCreationAttributes>
  implements IGradeAttributes
{
  public id!: number;
  public teacher_id!: number;
  public student_id!: number;
  public class_id!: number;
  public grade_type!: string;
  public grade_value!: number | null;
  public readonly created_at!: Date;
  public readonly last_updated!: Date;
}

ModelGrade.init(
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
      onDelete: "CASCADE",
    },
    class_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ModelClass,
        key: "id",
      },
    },
    grade_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    grade_value: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
    tableName: "grades",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "last_updated",
  }
);

export default ModelGrade;
export { IGradeCreationAttributes };
