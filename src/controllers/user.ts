import { NextFunction, Response, Request } from "express";

import ServiceUser from "../services/user";

import helperFormatName from "../helpers/format-name";

export default { updateOne };

async function updateOne(req: Request, res: Response, next: NextFunction) {
  try {
    const { email } = res.locals.user;

    const user = await ServiceUser.findOneWithEmail(email);

    if (!user) {
      throw new Error(res.locals.getLang("USER_NOT_FOUND"));
    }

    const body = req.body;

    if (email !== body.email) {
      const repeatEmail = await ServiceUser.emailWithExists(body.email);

      if (repeatEmail) {
        throw new Error(res.locals.getLang("USER_EMAIL_EXISTS"));
      }
    }

    if (user.username !== body.username) {
      const repeatUsername = await ServiceUser.usernameWithExists(
        body.username
      );

      if (repeatUsername) {
        throw new Error(res.locals.getLang("USER_USERNAME_EXISTS"));
      }
    }

    const validPassword = await ServiceUser.validatePassword(
      user.email,
      body.password
    );

    if (!validPassword) {
      throw new Error(res.locals.getLang("USER_PASSWORD_INVALID"));
    }

    const updateData = {
      firstname: helperFormatName(body.firstname),
      lastname: helperFormatName(body.lastname),
      email: body.email,
      username: body.username.trim(),
    };

    const updateUser = await ServiceUser.updateOneById(user.id, updateData);

    res.json({
      error: false,
      data: updateUser,
      message: res.locals.getLang("USER_UPDATED_SUCCESSFULLY"),
    });
  } catch (error) {
    next(error);
  }
}
