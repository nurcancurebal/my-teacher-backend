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
};
