import { Request, Response, NextFunction } from "express";

import { IUserCreationAttributes } from "../models/user";

import ServiceAuth from "../services/auth";

import utilJwt from "../utils/jwt";
import utilEncrypt from "../utils/encrypt";
import utilOtp from "../utils/otp";
import utilMail from "../utils/mail";

import helperFormatName from "../helpers/format-name";

import { TDecoded } from "../types";

export default {
  getSession,
  login,
  register,
  forgotPassword,
  resetPassword,
  refreshToken,
};

async function getSession(_req: Request, res: Response, next: NextFunction) {
  try {
    const currentUser = res.locals.user;

    res.json({
      error: false,
      data: currentUser,
      message: res.locals.getLang("USER_FOUND"),
    });
  } catch (error) {
    next(error);
  }
}

async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;

    const user: IUserCreationAttributes = await ServiceAuth.findOneWithEmail(
      email
    );

    if (!user) {
      throw new Error(res.locals.getLang("USER_NOT_FOUND"));
    }

    const isPasswordCorrect = utilEncrypt.compareSync(password, user.password);

    if (!isPasswordCorrect) {
      throw new Error(res.locals.getLang("USER_PASSWORD_IS_INCORRENT"));
    }

    const newTokens = utilJwt.authTokenGenerate(user.id);

    res.json({
      error: false,
      data: newTokens,
      message: res.locals.getLang("LOGIN_SUCCESS", user.language),
    });
  } catch (error) {
    next(error);
  }
}

async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const body = req.body;

    const newUser: IUserCreationAttributes = {
      firstname: helperFormatName(body.firstname),
      lastname: helperFormatName(body.lastname),
      username: body.username.trim(),
      email: body.email,
      password: utilEncrypt.encryptSync(body.password),
    };

    const emailExists = await ServiceAuth.emailWithExists(newUser.email);

    if (emailExists) {
      throw new Error(res.locals.getLang("EMAIL_EXISTS"));
    }

    const usernameExists = await ServiceAuth.usernameWithExists(
      newUser.username
    );

    if (usernameExists) {
      throw new Error(res.locals.getLang("USERNAME_EXISTS"));
    }

    const userId = await ServiceAuth.createOne(newUser);

    const newTokens = utilJwt.authTokenGenerate(userId);

    res.json({
      error: false,
      data: newTokens,
      message: res.locals.getLang("USER_REGISTERED_SUCCESSFULLY"),
    });
  } catch (error) {
    next(error);
  }
}

async function refreshToken(req: Request, res: Response, next: NextFunction) {
  try {
    const { refreshToken } = req.body;

    const verify = utilJwt.verify(refreshToken);

    if (!verify.valid) {
      throw new Error(res.locals.getLang("REFRESH_TOKEN_INVALID"));
    }

    if (verify.expired) {
      throw new Error(res.locals.getLang("REFRESH_TOKEN_EXPIRED"));
    }

    const decoded = verify.decoded as TDecoded;

    const newTokens = utilJwt.authTokenGenerate(decoded.userId);

    res.json({
      error: false,
      data: newTokens,
      message: res.locals.getLang("TOKEN_SUCCESS_REFRESHED"),
    });
  } catch (error) {
    next(error);
  }
}

async function forgotPassword(req: Request, res: Response, next: NextFunction) {
  try {
    const { email } = req.body;

    const user = await ServiceAuth.findOneWithEmail(email);

    if (!user) {
      throw new Error(res.locals.getLang("EMAIL_IS_INCORRECT"));
    }

    const otp = utilOtp.generateOTP(user.email);

    const send = await utilMail.sendOTP(user.email, otp);

    if (!send) {
      throw new Error(res.locals.getLang("FAILED_TO_SEND_OTP"));
    }

    res.json({
      error: false,
      data: null,
      message: res.locals.getLang("EMAIL_SENT_SUCCESSFULLY"),
    });
  } catch (error) {
    next(error);
  }
}

async function resetPassword(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, otp, password } = req.body;

    const user = await ServiceAuth.findOneWithEmail(email);

    if (!user) {
      throw new Error(res.locals.getLang("EMAIL_IS_INCORRECT"));
    }

    const isValid = utilOtp.verifyOTP(user.email, otp);

    if (!isValid) {
      throw new Error(res.locals.getLang("INVALID_OTP"));
    }

    const updated = await ServiceAuth.updatePasswordById(user.id, password);

    if (!updated) {
      throw new Error(res.locals.getLang("FAILED_TO_UPDATE_PASSWORD"));
    }

    res.json({
      error: false,
      data: null,
      message: res.locals.getLang("PASSWORD_UPDATED_SUCCESSFULLY"),
    });
  } catch (error) {
    next(error);
  }
}
