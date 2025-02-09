import { DataTypes, Model, Optional } from "sequelize";

import sequelize from "../utils/db";

import ModelUser from "./user";
import ModelStudent from "./student";
import ModelGrade from "./grade";

interface IClassAttributes {
  id: number;
  teacherId: number;
  className: string;
  explanation: string;
  createdAt: Date;
  lastUpdated: Date;
}

interface IClassCreationAttributes
  extends Optional<IClassAttributes, "id" | "createdAt" | "lastUpdated"> {}

class ModelClass
  extends Model<IClassAttributes, IClassCreationAttributes>
  implements IClassAttributes
{
  public id!: number;
  public teacherId!: number;
  public className!: string;
  public explanation!: string;
  public readonly createdAt!: Date;
  public readonly lastUpdated!: Date;
}

ModelClass.init(
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
    className: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    explanation: {
      type: DataTypes.TEXT,
      allowNull: false,
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
    tableName: "classes",
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "lastUpdated",
    indexes: [
      {
        unique: true,
        fields: ["teacherId", "className"],
      },
    ],
    hooks: {
      beforeDestroy: async (instance: ModelClass) => {
        const students = await ModelStudent.findAll({
          where: { classId: instance.id },
        });
        const studentIds = students.map(student => student.id);

        await ModelGrade.destroy({ where: { studentId: studentIds } });
        await ModelStudent.destroy({ where: { classId: instance.id } });
      },
    },
  }
);

export default ModelClass;
export { IClassCreationAttributes };
