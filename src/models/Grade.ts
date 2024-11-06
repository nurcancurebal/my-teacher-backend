import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../db/connection";
import Student from "./Student";

interface GradeAttributes {
  id: number;
  student_id: number;
  exam1?: number;
  exam2?: number;
  exam3?: number;
  oral1?: number;
  oral2?: number;
  oral3?: number;
  performance1?: number;
  performance2?: number;
  performance3?: number;
  project?: number;
  note1?: string;
  note2?: string;
  note3?: string;
}

interface GradeCreationAttributes extends Optional<GradeAttributes, "id"> {}

class Grade
  extends Model<GradeAttributes, GradeCreationAttributes>
  implements GradeAttributes
{
  public id!: number;
  public student_id!: number;
  public exam1!: number;
  public exam2!: number;
  public exam3!: number;
  public oral1!: number;
  public oral2!: number;
  public oral3!: number;
  public performance1!: number;
  public performance2!: number;
  public performance3!: number;
  public project!: number;
  public note1!: string;
  public note2!: string;
  public note3!: string;
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
    project: {
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
    tableName: "grades",
    timestamps: false,
  }
);

export default Grade;
