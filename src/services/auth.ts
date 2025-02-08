import ModelUser, { IUserCreationAttributes } from "../models/user";

import utilEncrypt from "../utils/encrypt";

export default class UserService extends ModelUser {
  static async findOneWithEmail(
    email: string
  ): Promise<IUserCreationAttributes | null> {
    const user = await this.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  static async emailWithExists(email: string): Promise<boolean> {
    const user = await this.findOneWithEmail(email);

    return !!user;
  }

  static async usernameWithExists(username: string): Promise<boolean> {
    const user = await this.findOne({
      where: {
        username,
      },
    });

    return !!user;
  }

  static async createOne(userData: IUserCreationAttributes) {
    const user = await this.create(userData);

    return user.id;
  }

  static async updatePasswordById(id: number, newPassword: string) {
    const hashNewPassword = utilEncrypt.encryptSync(newPassword);

    return await this.update(
      {
        password: hashNewPassword,
      },
      {
        where: {
          id,
        },
      }
    );
  }

  static async validatePassword(email: string, password: string) {
    const user = await this.findOneWithEmail(email);

    if (!user) {
      return false;
    }

    return utilEncrypt.compareSync(password, user.password);
  }

  static async getOneById(id: number) {
    const user = await this.findByPk(id, {
      attributes: { exclude: ["password"] },
    });

    return user;
  }

  static async deleteOneById(id: number) {
    return await this.destroy({
      where: {
        id,
      },
    });
  }

  static async updateOneById(
    id: number,
    newUserData: {
      username?: string;
      firstname?: string;
      lastname?: string;
      password?: string;
    }
  ): Promise<number[]> {
    if (newUserData.password) {
      newUserData.password = utilEncrypt.encryptSync(newUserData.password);
    }

    return this.update(newUserData, {
      where: {
        id,
      },
    });
  }
}
