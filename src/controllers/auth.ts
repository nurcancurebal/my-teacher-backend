import { NextFunction, Request, Response } from "express";
import { omit } from "lodash";

import { sign } from "../util/jwt";
import { generateOTP, verifyOTP } from "../util/otp";
import { ApiError } from "../util/ApiError";

import {
  userExists,
  createUser,
  findOneUser,
  validatePassword,
  updateUserById,
} from "../services/userService";

import { sendOTP } from "../helpers/mailHelper";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let user = req.body;

    const userExist = await userExists({
      email: user.email,
    });
    if (userExist) {
      throw new ApiError(400, "Email is already used");
    }

    user = await createUser(user);

    const userData = omit(user?.toJSON(), ["password"]);

    const accessToken = sign({ ...userData });

    return res.status(200).json({
      data: userData,
      error: false,
      accessToken,
      message: "User registered successfully",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const user = await findOneUser({ email });

    if (!user) {
      throw new ApiError(400, "Email is incorrect");
    }

    const validPassword = await validatePassword(user.email, password);

    if (!validPassword) {
      throw new ApiError(400, "Password is incorrect");
    }

    const userData = omit(user?.toJSON(), ["password"]);
    const accessToken = sign({ ...userData });

    return res.status(200).json({
      data: userData,
      access_token: accessToken,
      error: false,
    });
  } catch (err) {
    next(err);
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;

    let user = await findOneUser({ email });

    if (!user) {
      throw new ApiError(400, "Email is incorrect");
    }

    // generate otp
    user = user.toJSON();
    const otp = generateOTP(user.email);

    // send otp to email
    const send = await sendOTP(user.email, otp);

    if (!send) {
      throw new ApiError(400, "Failed to send OTP");
    }

    return res.status(200).json({
      message: "Email sent successfully",
      error: false,
    });
  } catch (err) {
    next(err);
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, otp, password } = req.body;

    let user = await findOneUser({ email });

    if (!user) {
      throw new ApiError(400, "Email is incorrect");
    }

    user = user?.toJSON();
    const isValid = verifyOTP(user.email, otp);

    if (!isValid) {
      return res.status(400).json({
        error: true,
        message: "Otp code is invalid.",
      });
    }

    const updated = await updateUserById({ password }, user.id);

    return res.status(200).json({
      updated: updated[0],
      message: updated[0] ? "Password reseted successfully" : "Failed to reset",
      error: false,
    });
  } catch (err) {
    next(err);
  }
};
