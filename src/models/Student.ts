import { DataTypes, Model, Optional } from "sequelize";

import sequelize from "../utils/db";

import ModelClass from "./class";
import ModelUser from "./user";
import ModelGrade from "./grade";

interface IStudentAttributes {
  id: number;
  classId: number;
  teacherId: number;
  idNumber: string;
  studentName: string;
  studentLastname: string;
  studentNumber: number;
  gender: string;
  birthdate: Date;
}

interface IStudentCreationAttributes
  extends Optional<IStudentAttributes, "id"> {}

class ModelStudent
  extends Model<IStudentAttributes, IStudentCreationAttributes>
  implements IStudentAttributes
{
  public id!: number;
  public classId!: number;
  public teacherId!: number;
  public idNumber!: string;
  public studentName!: string;
  public studentLastname!: string;
  public studentNumber!: number;
  public gender!: string;
  public birthdate!: Date;
}

ModelStudent.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    classId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ModelClass,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    teacherId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ModelUser,
        key: "id",
      },
    },
    idNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    studentName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    studentLastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    studentNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthdate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    sequelize: sequelize,
    tableName: "students",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["teacherId", "idNumber"],
      },
      {
        unique: true,
        fields: ["teacherId", "studentNumber"],
      },
    ],
    hooks: {
      beforeDestroy: async (instance: ModelStudent) => {
        await ModelGrade.destroy({ where: { studentId: instance.id } });
      },
    },
  }
);

export default ModelStudent;
export { IStudentCreationAttributes };
