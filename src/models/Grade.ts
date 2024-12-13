import { DataTypes, Model, Optional } from "sequelize";

import Student from "./Student";
import Class from "./Class";

import sequelizeConnection from "../db/connection";

interface GradeAttributes {
  id: number;
  student_id: number;
  class_id: number;
  grade_type: string;
  grade_value: number | null;
  created_at: Date;
  last_updated: Date;
}

interface GradeCreationAttributes
  extends Optional<GradeAttributes, "id" | "created_at" | "last_updated"> {}

class Grade
  extends Model<GradeAttributes, GradeCreationAttributes>
  implements GradeAttributes
{
  public id!: number;
  public student_id!: number;
  public class_id!: number;
  public grade_type!: string;
  public grade_value!: number | null;
  public readonly created_at!: Date;
  public readonly last_updated!: Date;
}

Grade.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Student,
        key: "id",
      },
      onDelete: "CASCADE", // Öğrenci silindiğinde notları da sil
    },
    class_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Class,
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
    sequelize: sequelizeConnection,
    tableName: "grades",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "last_updated",
  }
);

export default Grade;
export { GradeCreationAttributes };
