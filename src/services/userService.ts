import { encryptSync } from "../util/encrypt";
import User, { UserCreationAttributes } from "../models/User";
import { Op, WhereOptions } from "sequelize";

// Kullanıcı oluşturma fonksiyonu için payload arayüzü
interface CreateUserPayload extends UserCreationAttributes {
  name: string;
  email: string;
  password: string;
  mobile?: string;
  status: boolean;
  role: number;
}

export const createUser = async (payload: CreateUserPayload) => {
  payload.password = encryptSync(payload.password);
  const user = await User.create(payload);
  return user;
};

export const getUserById = async (id: number) => {
  const user = await User.findByPk(id, {
    attributes: { exclude: ["password"] },
  });
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

interface UserExistsOptions {
  email: string | null;
  mobile: string | null;
}

export const userExists = async (
  options: UserExistsOptions = {
    email: null,
    mobile: null,
  }
) => {
  if (!options.email) {
    throw new Error("Please provide either of these options: email");
  }
  const orCondition = Op.or as unknown as string;
  const where: WhereOptions = {
    [orCondition]: [],
  };
  if (options.email) {
    where[orCondition].push({ email: options.email });
  }
  if (options.mobile) {
    where[orCondition].push({ mobile: options.mobile });
  }

  const users = await User.findAll({ where: where });
  return users.length > 0;
};

export const validatePassword = async (email: string, password: string) => {
  if (!email && !password) {
    throw new Error("Please provide email and password");
  }
  const orCondition = Op.or as unknown as string;
  const where: WhereOptions = {
    [orCondition]: [],
  };

  if (email) {
    where[orCondition].push({ email: email });
  }

  const user = await User.findOne({ where });

  if (!user) {
    throw new Error("User not found");
  }

  return User.validPassword(password, user.password);
};

interface FindOneUserOptions {
  email?: string;
  id?: number;
}

export const findOneUser = async (options: FindOneUserOptions) => {
  if (!options.email && !options.id) {
    throw new Error("Please provide email or id ");
  }
  const orCondition = Op.or as unknown as string;
  const where: WhereOptions = {
    [orCondition]: [],
  };

  if (options.email) {
    where[orCondition].push({ email: options.email });
  }
  if (options.id) {
    where[orCondition].push({ id: options.id });
  }

  const user = await User.findOne({
    where,
    attributes: { exclude: ["password"] },
  });
  return user;
};

interface UpdateUserPayload {
  id?: number;
  email?: string;
  password?: string;
  mobile?: string;
  status?: boolean;
  role?: number;
}

export const updateUserById = (user: UpdateUserPayload, userId: number) => {
  if (!user && !userId) {
    throw new Error("Please provide user data and/or user id to update");
  }
  if (userId && isNaN(userId)) {
    throw new Error("Invalid user id");
  }
  if (user.id || userId) {
    const id = user.id || userId;

    if (user.password) {
      user.password = encryptSync(user.password);
    }

    return User.update(user, {
      where: { id: id },
    });
  }
};

export const deleteUserById = (userId: number) => {
  if (!userId) {
    throw new Error("Please user id to delete");
  }
  if (userId && isNaN(userId)) {
    throw new Error("Invalid user id");
  }

  return User.destroy({
    where: { id: userId },
  });
};
