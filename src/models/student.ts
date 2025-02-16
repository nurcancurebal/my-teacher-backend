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
  firstname: string;
  lastname: string;
  number: number;
  gender: string;
  birthday: Date;
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
  public firstname!: string;
  public lastname!: string;
  public number!: number;
  public gender!: string;
  public birthday!: Date;
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
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthday: {
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
        fields: ["teacherId", "number"],
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
