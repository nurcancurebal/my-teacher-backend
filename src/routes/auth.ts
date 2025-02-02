import { Router } from "express";

const router = Router();

import MiddlewareRedValidate from "../middlewares/req-validate";

import { getSession, login, register } from "../validations/auth";

import ControllerAuth from "../controllers/auth";

router.get("/", MiddlewareRedValidate(getSession), ControllerAuth.getSession);
router.post("/login", MiddlewareRedValidate(login), ControllerAuth.login);
router.post(
  "/register",
  MiddlewareRedValidate(register),
  ControllerAuth.register
);
router.post("/forgot-password", ControllerAuth.forgotPassword);
router.post("/refresh-token", ControllerAuth.refreshToken);
router.post("/reset-password", ControllerAuth.resetPassword);

export default router;
