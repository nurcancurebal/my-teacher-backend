import { Application } from "express";

import { Dialect } from "sequelize";

const {
  DB_HOST,
  DB_PORT,
  DB_TYPE,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  JWT_SECRET,
  JWT_TOKEN_EXPIRY_HOUR,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_FROM,
  SMTP_PASS,
  SMTP_RECIPIENT,
  OTP_EXPIRY_MIN,
  OTP_SECRET,
} = process.env;

const db = {
  host: DB_HOST,
  port: parseInt(DB_PORT, 10),
  dialect: DB_TYPE as Dialect,
  database: DB_NAME,
  username: DB_USER,
  password: DB_PASSWORD,
};

const jwt = {
  secret: JWT_SECRET,
  expiry: JWT_TOKEN_EXPIRY_HOUR,
  saltRound: 3,
};

const smtp = {
  host: SMTP_HOST,
  port: SMTP_PORT,
  user: SMTP_USER,
  from: SMTP_FROM,
  password: SMTP_PASS,
  recipient: SMTP_RECIPIENT,
};

const otp = {
  expiry: OTP_EXPIRY_MIN,
  secret: OTP_SECRET,
};

function swagger(app: Application) {
  const PORT = app.get("port");
  const HOSTNAME = app.get("hostname");

  const isDevelopment = app.get("env") === "development" ? "http" : "https";

  return {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "my-teacher-backend API documentation",
        version: "1.0.0",
      },
      servers: [
        {
          url: `${isDevelopment}://${HOSTNAME}:${PORT}/api`,
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
    },

    apis: ["src/routes/*.ts", "src/app.ts"],
  };
}

export default { db, jwt, smtp, otp, swagger };
