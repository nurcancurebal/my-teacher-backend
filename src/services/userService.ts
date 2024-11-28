import { encryptSync } from "../util/encrypt";
import User, { UserCreationAttributes } from "../models/User";
import { WhereOptions } from "sequelize";

interface UserExistsOptions {
  email: string;
}

// Kullanıcının veritabanında var olup olmadığını kontrol eder. Varsa tekrar kayıt yapmamak için kullandık
export const userExists = async (
  options: UserExistsOptions = {
    email: null,
  }
) => {
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
  email: string;
}

export const findOneUser = async (options: FindOneUserOptions) => {
  if (!options.email) {
    throw new Error("Please provide email to find user");
  }

  const where: WhereOptions = {
    email: options.email,
  };

  const user = await User.findOne({
    where,
    attributes: { exclude: ["password"] }, // Bir veritabanı sorgusu sırasında belirli alanların sonuçlardan hariç tutulmasını sağlar.
  });
  return user;
};

export const validatePassword = async (email: string, password: string) => {
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

export const updateUserById = (user: UpdateUserPayload, id: number) => {
  if (!user && !id) {
    throw new Error("Please provide user data and/or user id to update");
  }

  if (id && isNaN(id)) {
    throw new Error("Invalid user id");
  }

  if (user.password) {
    user.password = encryptSync(user.password);
  }

  return User.update(user, {
    where: { id },
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
