import { DataTypes, Model, Optional } from "sequelize";
import { compareSync } from "../util/encrypt";
import sequelizeConnection from "../db/connection";

interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  mobile?: string;
  status: boolean;
  role: number;
  created_at: Date;
  last_updated: Date;
}

interface UserCreationAttributes
  extends Optional<UserAttributes, "id" | "created_at" | "last_updated"> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public mobile!: string;
  public status!: boolean;
  public role!: number;
  // timestamps!
  public readonly created_at!: Date;
  public readonly last_updated!: Date;

  static validPassword: (password: string, hash: string) => boolean;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    mobile: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    role: {
      type: DataTypes.INTEGER,
      defaultValue: 2,
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
    tableName: "users",
    createdAt: "created_at",
    updatedAt: "last_updated",
  }
);

User.validPassword = (password: string, hash: string) => {
  return compareSync(password, hash);
};

export default User;
export { UserCreationAttributes };
