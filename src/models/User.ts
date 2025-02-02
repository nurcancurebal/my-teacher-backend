import { DataTypes, Model, Optional } from "sequelize";

import sequelize from "../utils/db";

interface IUserAttributes {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  language?: string;
  password: string;
  created_at: Date;
  last_updated: Date;
}

interface IUserCreationAttributes
  extends Optional<IUserAttributes, "id" | "created_at" | "last_updated"> {}

class ModelUser
  extends Model<IUserAttributes, IUserCreationAttributes>
  implements IUserAttributes
{
  public id!: number;
  public firstname!: string;
  public lastname!: string;
  public username!: string;
  public language!: string;
  public email!: string;
  public password!: string;
  public readonly created_at!: Date;
  public readonly last_updated!: Date;
}

ModelUser.init(
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
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    language: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "TR",
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
    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "last_updated",
  }
);

export default ModelUser;
export { IUserCreationAttributes };
