import { DataTypes, Model, Optional } from "sequelize";

import User from "./User";
import Student from "./Student";
import Grade from "./Grade";
import TeacherNote from "./TeacherNote";

import sequelizeConnection from "../db/connection";

interface ClassAttributes {
  id: number;
  teacher_id: number;
  class_name: string;
  explanation: string;
  created_at: Date;
  last_updated: Date;
}

interface ClassCreationAttributes
  extends Optional<ClassAttributes, "id" | "created_at" | "last_updated"> {}

class Class
  extends Model<ClassAttributes, ClassCreationAttributes>
  implements ClassAttributes
{
  public id!: number;
  public teacher_id!: number;
  public class_name!: string;
  public explanation!: string;
  public readonly created_at!: Date;
  public readonly last_updated!: Date;
}

Class.init(
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
        model: User,
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
    sequelize: sequelizeConnection,
    tableName: "classes",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "last_updated",
    hooks: {
      beforeDestroy: async (instance: Class) => {
        const students = await Student.findAll({
          where: { class_id: instance.id },
        });
        const studentIds = students.map(student => student.id);

        await Grade.destroy({ where: { student_id: studentIds } });
        await TeacherNote.destroy({ where: { student_id: studentIds } });
        await Student.destroy({ where: { class_id: instance.id } });
      },
    },
  }
);

export default Class;
export { ClassCreationAttributes };
