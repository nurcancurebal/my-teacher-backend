import { encryptSync } from "../util/encrypt";
import User, { UserCreationAttributes } from "../models/User";
import { WhereOptions } from "sequelize";

interface UserExistsOptions {
  email: string;
}

export const userExists = async (
  // Kullanıcının veritabanında var olup olmadığını kontrol eder. Varsa tekrar kayıt yapmamak için kullandık
  options: UserExistsOptions = {
    email: null,
  }
) => {
  if (!options.email) {
    throw new Error("Please provide either of these options: email");
  }
  const where: WhereOptions = {
    email: options.email,
  };

  const user = await User.findOne({ where });
  return user !== null;
};

interface CreateUserPayload extends UserCreationAttributes {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
}

export const createUser = async (payload: CreateUserPayload) => {
  payload.password = encryptSync(payload.password);
  const user = await User.create(payload);
  return user;
};

interface FindOneUserOptions {
  email?: string;
  id?: number;
}

export const findOneUser = async (options: FindOneUserOptions) => {
  if (!options.email && !options.id) {
    throw new Error("Please provide email or id");
  }

  const where: WhereOptions = {};

  if (options.email) {
    where.email = options.email;
  } else if (options.id) {
    where.id = options.id;
  }

  const user = await User.findOne({
    where,
    attributes: { exclude: ["password"] }, // Bir veritabanı sorgusu sırasında belirli alanların sonuçlardan hariç tutulmasını sağlar.
  });
  return user;
};

export const validatePassword = async (email: string, password: string) => {
  if (!email && !password) {
    throw new Error("Please provide email and password");
  }

  const where: WhereOptions = {
    email,
  };

  const user = await User.findOne({ where });

  if (!user) {
    throw new Error("User not found");
  }

  return User.validPassword(password, user.password);
};

interface UpdateUserPayload {
  firstname?: string;
  lastname?: string;
  username?: string;
  email?: string;
  password?: string;
}

export const updateUserById = (user: UpdateUserPayload, userId: number) => {
  if (!user && !userId) {
    throw new Error("Please provide user data and/or user id to update");
  }

  if (userId && isNaN(userId)) {
    throw new Error("Invalid user id");
  }

  const id = userId;

  if (user.password) {
    user.password = encryptSync(user.password);
  }

  return User.update(user, {
    where: { id: id },
  });
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
