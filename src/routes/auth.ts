import { Router } from "express";

const router = Router();

import MiddlewareRedValidate from "../middlewares/req-validate";

import ControllerAuth from "../controllers/auth";

import {
  schemaGetSession,
  schemaLogin,
  schemaRegister,
  schemaForgotPassword,
  schemaRefreshToken,
  schemaResetPassword,
} from "../validations/auth";

/**
 * @swagger
 * /auth:
 *   get:
 *     summary: Get user session
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *       "401":
 *         description: Unauthorized
 *       "400":
 *         description: Bad Request
 *       "500":
 *         description: Internal Server Error
 */
router.get(
  "/",
  MiddlewareRedValidate(schemaGetSession),
  ControllerAuth.getSession
);

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
 *                 minLength: 3
 *                 maxLength: 60
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 maxLength: 20
 *                 description: At least one number and one letter
 *             example:
 *               email: name@example.com
 *               password: password1
 *     responses:
 *       "200":
 *         description: OK
 *       "401":
 *         description: Unauthorized
 *       "400":
 *         description: Bad Request
 *       "500":
 *         description: Internal Server Error
 */
router.post("/login", MiddlewareRedValidate(schemaLogin), ControllerAuth.login);

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
 *                maxLength: 30
 *                description: must be unique
 *               email:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 60
 *                 format: email
 *                 description: must be unique
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 maxLength: 20
 *                 description: At least one number and one letter
 *             example:
 *               firstname: firstname
 *               lastname: lastname
 *               username: username
 *               email: name@example.com
 *               password: password1
 *     responses:
 *       "200":
 *         description: OK
 *       "401":
 *         description: Unauthorized
 *       "400":
 *         description: Bad Request
 *       "500":
 *         description: Internal Server Error
 */
router.post(
  "/register",
  MiddlewareRedValidate(schemaRegister),
  ControllerAuth.register
);

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Forgot password
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
 *                 minLength: 3
 *                 maxLength: 60
 *                 format: email
 *                 description: must be unique
 *     responses:
 *       "200":
 *         description: OK
 *       "401":
 *         description: Unauthorized
 *       "400":
 *         description: Bad Request
 *       "500":
 *         description: Internal Server Error
 */
router.post(
  "/forgot-password",
  MiddlewareRedValidate(schemaForgotPassword),
  ControllerAuth.forgotPassword
);

/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: Refresh the authentication token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: The refresh token to verify and refresh.
 *             example:
 *               refreshToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJlZnJlc2giOnRydWUsImlhdCI6MTczODUwNzQ1OCwiZXhwIjoxNzM5MTEyMjU4fQ.UmUdzAOnPRmjODG9pfM_hB8mX1snty1N3aQiTmBUxkU
 *     responses:
 *       "200":
 *         description: OK
 *       "401":
 *         description: Unauthorized
 *       "400":
 *         description: Bad Request
 *       "500":
 *         description: Internal Server Error
 */
router.post(
  "/refresh-token",
  MiddlewareRedValidate(schemaRefreshToken),
  ControllerAuth.refreshToken
);

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
 *                 minLength: 3
 *                 maxLength: 60
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 maxLength: 20
 *                 description: At least one number and one letter
 *               otp:
 *                 type: string
 *                 length: 6
 *                 description: One time password
 *             example:
 *               email: name@example.com
 *               password: password1
 *               otp: 12334e
 *     responses:
 *       "200":
 *         description: OK
 *       "401":
 *         description: Unauthorized
 *       "400":
 *         description: Bad Request
 *       "500":
 *         description: Internal Server Error
 */
router.post(
  "/reset-password",
  MiddlewareRedValidate(schemaResetPassword),
  ControllerAuth.resetPassword
);

/**
 * @swagger
 * tags:
 *   name: Auth
 */
export default router;
