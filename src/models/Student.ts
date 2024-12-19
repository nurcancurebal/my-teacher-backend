import { DataTypes, Model, Optional } from "sequelize";

import Class from "./Class";
import User from "./User";
import Grade from "./Grade";
import TeacherNote from "./TeacherNote";

import sequelizeConnection from "../db/connection";

interface StudentAttributes {
  id: number;
  class_id: number;
  teacher_id: number;
  tc: bigint;
  student_name: string;
  student_lastname: string;
  student_number: number;
  gender: string;
  birthdate: Date;
}

interface StudentCreationAttributes extends Optional<StudentAttributes, "id"> {}

class Student
  extends Model<StudentAttributes, StudentCreationAttributes>
  implements StudentAttributes
{
  public id!: number;
  public class_id!: number;
  public teacher_id!: number;
  public tc!: bigint;
  public student_name!: string;
  public student_lastname!: string;
  public student_number!: number;
  public gender!: string;
  public birthdate!: Date;
}

Student.init(
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
        model: Class,
        key: "id",
      },
      onDelete: "CASCADE", // Sınıf silindiğinde öğrencileri de sil
    },
    teacher_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    tc: {
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
    sequelize: sequelizeConnection,
    tableName: "students",
    timestamps: false,
    hooks: {
      beforeDestroy: async (instance: Student) => {
        await Grade.destroy({ where: { student_id: instance.id } });
        await TeacherNote.destroy({ where: { student_id: instance.id } });
      },
    },
  }
);

export default Student;
export { StudentCreationAttributes };
