import { NextFunction, Response } from "express";
import { omit } from "lodash";
import { findOneUser, updateUserById } from "../services/userService";
import { customRequest } from "../types/customDefinition";
import { ApiError } from "../util/ApiError";

const omitData = ["password"];

export const updateUser = async (
  req: customRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.user;

    let body = req.body;
    body = omit(body, omitData);

    let user = await findOneUser({ id });

    if (!user) {
      throw new ApiError(400, "User not found");
    }

    user = user?.toJSON();

    const updated = await updateUserById(body, parseInt(id, 10));

    return res.status(200).json({
      error: false,
      updated: updated[0],
      msg: updated[0] ? "Data updated successfully" : "failed to update",
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
