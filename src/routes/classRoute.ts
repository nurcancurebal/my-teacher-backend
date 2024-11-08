import { Router } from "express";
import { requireUser, validateRequest } from "../middleware";

import { createClassController } from "../controllers/class";

import { classSchema } from "../validation/class";

const classRouter = Router();

classRouter.post(
  "/",
  requireUser,
  validateRequest(classSchema),
  createClassController
);

export default classRouter;

/**
 * @swagger
 * tags:
 *   name: Class
 *   description: Class management
 */

/**
 * @swagger
 * /class:
 *   post:
 *     summary: Create a new class
 *     description: Create a new class
 *     tags: [Class]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - class_name
 *             properties:
 *               class_name:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 3
 *                 description: must be unique
 *             example:
 *               class_name: 3B
 *     responses:
 *       "200":
 *         description: OK
 *
 *       "401":
 *         description: Invalid email or password
 *
 */
