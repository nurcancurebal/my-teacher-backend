import { Router } from "express";
import { validateRequest } from "../middleware";
import {
  forgotPassword,
  loginUser,
  registerUser,
  resetPassword,
} from "../controllers/auth";
import {
  loginSchema,
  registerSchema,
  passwordResetSchema,
} from "../validation/user";

const authRouter = Router();

authRouter.post("/register", validateRequest(registerSchema), registerUser);
authRouter.post("/login", validateRequest(loginSchema), loginUser);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post(
  "/reset-password",
  validateRequest(passwordResetSchema),
  resetPassword
);

export default authRouter;

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register as user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstname
 *               - lastname
 *               - username
 *               - email
 *               - password
 *             properties:
 *               firstname:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 30
 *               lastname:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 30
 *               username:
 *                type: string
 *                minLength: 3
 *                description: must be unique
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: At least one number and one letter
 *             example:
 *               firstname: firstname
 *               lastname: lastname
 *               username: username
 *               email: name@example.com
 *               password: password1
 *     responses:
 *       "201":
 *         description: Created
 *       "400":
 *         description: Bad Request
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: At least one number and one letter
 *             example:
 *               email: name@example.com
 *               password: password1
 *     responses:
 *       "200":
 *         description: OK
 *
 *       "401":
 *         description: Invalid email or password
 *
 */

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Forgot password
 *     description: An email will be sent to reset password.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *     responses:
 *       "204":
 *         description: No content
 *       "404":
 *         description: Email not found
 *
 */

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Reset password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - otp
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: At least one number and one letter
 *               otp:
 *                 type: string
 *                 length: 6
 *                 description: One time password
 *             example:
 *               email: name@example.com
 *               password: password1
 *               otp: 123344
 *     responses:
 *       "204":
 *         description: No content
 *       "401":
 *         description: Password reset failed

 */
