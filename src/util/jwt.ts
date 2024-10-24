import { jwtConfig } from "../config/config";
// SignOptions: JWT oluşturma işlemi için kullanılabilecek seçenekleri tanımlayan bir tür.
import jwt, { SignOptions } from "jsonwebtoken";

export const sign = (
  payload: { [key: string]: unknown } | string,
  options: SignOptions = { expiresIn: jwtConfig.expiry + "h" }
) => {
  return jwt.sign(payload, jwtConfig.secret, options); // JWT oluşturma (sign)
};

export const verify = (token: string) => {
  // JWT doğrulama (verify)
  try {
    const decoded = jwt.verify(token, jwtConfig.secret);
    return { valid: true, expired: false, decoded };
  } catch (error) {
    console.log("token", token, { error });
    let msg;
    if (error instanceof Error) {
      msg = error.message;
    } else {
      msg = error;
    }
    return {
      valid: false,
      expired: msg === "jwt expired",
      msg: msg,
      decoded: null as null,
    };
  }
};
