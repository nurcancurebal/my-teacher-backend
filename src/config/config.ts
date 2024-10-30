import dotenv from "dotenv";

dotenv.config({ path: ".env" });

import { Dialect } from "sequelize";

export const dbConfig = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  dialect: process.env.DB_TYPE as Dialect,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

export const jwtConfig = {
  secret: process.env.SECRET,
  expiry: process.env.TOKEN_EXPIRY_HOUR,
  saltRound: 3,
};

export const emailConfig = {
  smtpHost: process.env.SMTP_HOST,
  smtpPort: process.env.SMTP_PORT,
  smtpUser: process.env.SMTP_USER,
  smtpPass: process.env.SMTP_PASS,
  smtpRecipient: process.env.SMTP_RECIPIENT,
};

export const otpConfig = {
  otpExpiry: process.env.OTP_EXPIRY_MIN,
  otpSecret: process.env.OTP_SECRET,
};
