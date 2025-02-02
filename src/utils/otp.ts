import { authenticator } from "otplib";

import config from "../config";

const expireOTPInSeconds = 60 * parseInt(config.otp.expiry);

authenticator.options = {
  step: expireOTPInSeconds,
  digits: 6,
};

export default { generateOTP, verifyOTP };

function generateOTP(email: string) {
  const secret = email + config.otp.secret;
  return authenticator.generate(secret);
}

function verifyOTP(email: string, otp: string) {
  const secret = email + config.otp.secret;
  return authenticator.verify({ secret, token: otp });
}
