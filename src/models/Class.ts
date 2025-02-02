import { DataTypes, Model, Optional } from "sequelize";

import sequelize from "../utils/db";

import ModelUser from "./user";
import ModelStudent from "./student";
import ModelGrade from "./grade";
import ModelTeacherNote from "./teacher-note";

interface IClassAttributes {
  id: number;
  teacher_id: number;
  class_name: string;
  explanation: string;
  created_at: Date;
  last_updated: Date;
}

interface IClassCreationAttributes
  extends Optional<IClassAttributes, "id" | "created_at" | "last_updated"> {}

class ModelClass
  extends Model<IClassAttributes, IClassCreationAttributes>
  implements IClassAttributes
{
  public id!: number;
  public teacher_id!: number;
  public class_name!: string;
  public explanation!: string;
  public readonly created_at!: Date;
  public readonly last_updated!: Date;
}

ModelClass.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    teacher_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ModelUser,
        key: "id",
      },
    },
    class_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    explanation: {
      type: DataTypes.TEXT,
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
    sequelize,
    tableName: "classes",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "last_updated",
    hooks: {
      beforeDestroy: async (instance: ModelClass) => {
        const students = await ModelStudent.findAll({
          where: { class_id: instance.id },
        });
        const studentIds = students.map(student => student.id);

        await ModelGrade.destroy({ where: { student_id: studentIds } });
        await ModelTeacherNote.destroy({ where: { student_id: studentIds } });
        await ModelStudent.destroy({ where: { class_id: instance.id } });
      },
    },
  }
);

export default ModelClass;
export { IClassCreationAttributes };
