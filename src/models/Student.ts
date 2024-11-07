import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../db/connection";
import Class from "./Class";

interface StudentAttributes {
  id: number;
  class_id: number;
  student_name: string;
  student_lastname: string;
  student_number: number;
}

interface StudentCreationAttributes extends Optional<StudentAttributes, "id"> {}

class Student
  extends Model<StudentAttributes, StudentCreationAttributes>
  implements StudentAttributes
{
  public id!: number;
  public class_id!: number;
  public student_name!: string;
  public student_lastname!: string;
  public student_number!: number;
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
  },
  {
    sequelize: sequelizeConnection,
    tableName: "students",
    timestamps: false,
  }
);

export default Student;
