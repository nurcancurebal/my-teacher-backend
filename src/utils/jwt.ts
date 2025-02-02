import jwt, { SignOptions } from "jsonwebtoken";

import config from "../config";

export default { sign, verify, authTokenGenerate };

function sign(
  payload: { [key: string]: unknown } | string,
  options: SignOptions = { expiresIn: config.jwt.expiry + "h" }
) {
  return jwt.sign(payload, config.jwt.secret, options);
}

function verify(token: string) {
  try {
    const decoded = jwt.verify(token, config.jwt.secret);
    return { valid: true, expired: false, decoded };
  } catch (error) {
    console.log("token", token, { error });
    let message;
    if (error instanceof Error) {
      message = error.message;
    } else {
      message = error;
    }
    return {
      valid: false,
      expired: message === "jwt expired",
      message,
      decoded: null as null,
    };
  }
}

function authTokenGenerate(userId: number) {
  const accessToken = sign({ userId, refresh: false }, { expiresIn: "1d" });

  const refreshToken = sign({ userId, refresh: true }, { expiresIn: "7d" });

  return { accessToken, refreshToken };
}
