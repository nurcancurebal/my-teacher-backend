import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../db/connection";
import Student from "./Student";

interface GradeAttributes {
  id: number;
  student_id: number;
  grade_type: string;
  grade_value: number;
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
  public grade_type!: string;
  public grade_value!: number;
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
    },
    grade_type: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      set(value: string) {
        // Baş ve sondaki boşlukları silerek kaydet
        this.setDataValue("grade_type", value.trim());
      },
    },
    grade_value: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
