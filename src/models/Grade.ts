import { DataTypes, Model, Optional } from "sequelize";

import sequelize from "../utils/db";

import ModelStudent from "./student";
import ModelClass from "./class";
import ModelUser from "./user";

interface IGradeAttributes {
  id: number;
  teacherId: number;
  studentId: number;
  classId: number;
  gradeType: string;
  gradeValue: number | null;
  createdAt: Date;
  lastUpdated: Date;
}

interface IGradeCreationAttributes
  extends Optional<IGradeAttributes, "id" | "createdAt" | "lastUpdated"> {}

class ModelGrade
  extends Model<IGradeAttributes, IGradeCreationAttributes>
  implements IGradeAttributes
{
  public id!: number;
  public teacherId!: number;
  public studentId!: number;
  public classId!: number;
  public gradeType!: string;
  public gradeValue!: number | null;
  public readonly createdAt!: Date;
  public readonly lastUpdated!: Date;
}

ModelGrade.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    teacherId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ModelUser,
        key: "id",
      },
    },
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ModelStudent,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    classId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ModelClass,
        key: "id",
      },
    },
    gradeType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gradeValue: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    lastUpdated: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "grades",
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "lastUpdated",
  }
);

export default ModelGrade;
export { IGradeCreationAttributes };
