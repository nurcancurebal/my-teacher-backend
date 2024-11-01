import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../db/connection";
import User from "./User";

interface ClassAttributes {
  id: number;
  class_name: string;
  teacher_id: number;
}

interface ClassCreationAttributes extends Optional<ClassAttributes, "id"> {}

class Class
  extends Model<ClassAttributes, ClassCreationAttributes>
  implements ClassAttributes
{
  public id!: number;
  public class_name!: string;
  public teacher_id!: number;
}

Class.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    class_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    teacher_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    sequelize: sequelizeConnection,
    tableName: "classes",
  }
);

export default Class;
