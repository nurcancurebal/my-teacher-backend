import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../db/connection";
import Class from "./Class";

interface StudentAttributes {
  id: number;
  firstname: string;
  lastname: string;
  student_number: string;
  class_id: number;
  exam1?: number;
  exam2?: number;
  exam3?: number;
  oral1?: number;
  oral2?: number;
  oral3?: number;
  performance1?: number;
  performance2?: number;
  performance3?: number;
  project1?: number;
  note1?: string;
  note2?: string;
  note3?: string;
}

interface StudentCreationAttributes
  extends Optional<
    StudentAttributes,
    | "id"
    | "exam1"
    | "exam2"
    | "exam3"
    | "oral1"
    | "oral2"
    | "oral3"
    | "performance1"
    | "performance2"
    | "performance3"
    | "project1"
    | "note1"
    | "note2"
    | "note3"
  > {}

class Student
  extends Model<StudentAttributes, StudentCreationAttributes>
  implements StudentAttributes
{
  public id!: number;
  public firstname!: string;
  public lastname!: string;
  public student_number!: string;
  public class_id!: number;
  public exam1?: number;
  public exam2?: number;
  public exam3?: number;
  public oral1?: number;
  public oral2?: number;
  public oral3?: number;
  public performance1?: number;
  public performance2?: number;
  public performance3?: number;
  public project1?: number;
  public note1?: string;
  public note2?: string;
  public note3?: string;
}

Student.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    student_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    class_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Class,
        key: "id",
      },
    },
    exam1: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    exam2: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    exam3: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    oral1: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    oral2: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    oral3: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    performance1: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    performance2: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    performance3: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    project1: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    note1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    note2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    note3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: sequelizeConnection,
    tableName: "students",
  }
);

export default Student;
