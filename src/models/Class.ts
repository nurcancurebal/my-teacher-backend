import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../db/connection";
import User from "./User";

interface ClassAttributes {
  id: number;
  class_name: string;
  teacher_id: number;
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
  public class_name!: string;
  public teacher_id!: number;
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
  }
);

export default Class;
export { ClassCreationAttributes };
