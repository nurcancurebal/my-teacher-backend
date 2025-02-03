import { DataTypes, Model, Optional } from "sequelize";

import sequelize from "../utils/db";

import ModelClass from "./class";
import ModelUser from "./user";
import ModelGrade from "./grade";
import ModelTeacherNote from "./teacher-note";

interface IStudentAttributes {
  id: number;
  class_id: number;
  teacher_id: number;
  id_number: bigint;
  student_name: string;
  student_lastname: string;
  student_number: number;
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
  public class_id!: number;
  public teacher_id!: number;
  public id_number!: bigint;
  public student_name!: string;
  public student_lastname!: string;
  public student_number!: number;
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
    class_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ModelClass,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    teacher_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ModelUser,
        key: "id",
      },
    },
    id_number: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: true,
    },
    student_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    student_lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    student_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
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
    hooks: {
      beforeDestroy: async (instance: ModelStudent) => {
        await ModelGrade.destroy({ where: { student_id: instance.id } });
        await ModelTeacherNote.destroy({ where: { student_id: instance.id } });
      },
    },
  }
);

export default ModelStudent;
export { IStudentCreationAttributes };
