import { authenticator } from "otplib";
import { otpConfig } from "../config/config";

const expireOTPInSeconds = 60 * parseInt(otpConfig.otpExpiry);
authenticator.options = {
  step: expireOTPInSeconds,
  digits: 6,
};

export const generateOTP = (email: string) => {
  const secret = email + otpConfig.otpSecret;
  return authenticator.generate(secret);
};

export const verifyOTP = (email: string, otp: string) => {
  const secret = email + otpConfig.otpSecret;
  return authenticator.verify({ secret, token: otp });
};
