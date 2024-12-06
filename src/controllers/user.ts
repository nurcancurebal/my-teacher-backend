import { NextFunction, Response } from "express";
import { omit } from "lodash";
import {
  findOneUser,
  updateUserById,
  userExists,
  validatePassword,
} from "../services/userService";
import { customRequest } from "../types/customDefinition";
import { ApiError } from "../util/ApiError";

const formatName = (name: string): string => {
  return name
    .trim()
    .toLowerCase()
    .replace(/^\w/, c => c.toUpperCase());
};

export const updateUser = async (
  req: customRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, id } = req.user;

    const body = req.body;

    body.firstname = formatName(body.firstname);
    body.lastname = formatName(body.lastname);
    body.username = formatName(body.username);

    const user = await findOneUser({ email });

    if (!user) {
      throw new ApiError(400, "User not found");
    }

    if (user.email !== body.email) {
      const repeatEmail = await userExists({ email: body.email });

      if (repeatEmail) {
        throw new ApiError(400, "Email already exists");
      }
    }

    const validPassword = await validatePassword(user.email, body.password);

    if (!validPassword) {
      throw new ApiError(400, "Password is incorrect");
    }

    const userData = omit(body, ["password"]);

    const updated = await updateUserById(userData, id);

    return res.status(200).json({
      success: updated[0],
      updated: updated[0],
      message: updated[0] ? "Data updated successfully" : "failed to update",
    });
  } catch (err) {
    next(err);
  }
};

export const getUserData = async (
  req: customRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).json({
      data: req.user,
      error: false,
    });
  } catch (err) {
    next(err);
  }
};
