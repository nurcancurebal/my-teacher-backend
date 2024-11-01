import { DataTypes, Model, Optional } from "sequelize";
import { compareSync } from "../util/encrypt";
import sequelizeConnection from "../db/connection";

// User modelinin özelliklerini tanımlayan arayüz
interface UserAttributes {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  created_at: Date;
  last_updated: Date;
}

// User modelinin oluşturulması sırasında elle girilmesi gerekli olmayan özellikleri tanımlayan arayüz
interface UserCreationAttributes
  extends Optional<UserAttributes, "id" | "created_at" | "last_updated"> {}

// User modelini tanımlayan sınıf
//implements Anahtar Kelimesi: User sınıfının UserAttributes arayüzünde tanımlanan tüm özellikleri içermesi gerektiğini belirtir.

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public firstname!: string;
  public lastname!: string;
  public username!: string;
  public email!: string;
  public password!: string;
  // timestamps!
  public readonly created_at!: Date;
  public readonly last_updated!: Date;

  // Şifre doğrulama fonksiyonu
  static validPassword(password: string, hash: string): boolean {
    return compareSync(password, hash);
  }
}

// User modelinin Sequelize ile başlatılması
User.init(
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
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "last_updated",
  }
);

export default User;
export { UserCreationAttributes };
