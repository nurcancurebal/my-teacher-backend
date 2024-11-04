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
/*
classRouter.get("/", getAllClasses);
classRouter.get("/:id", getClassById);
classRouter.put("/:id", validateRequest(classSchema), updateClass);
classRouter.delete("/:id", deleteClass);
*/

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
 *               - teacher_id
 *             properties:
 *               class_name:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 3
 *                 description: must be unique
 *               teacher_id:
 *                 type: number
 *             example:
 *               class_name: 3B
 *               teacher_id: 1
 *     responses:
 *       "200":
 *         description: OK
 *
 *       "401":
 *         description: Invalid email or password
 *
 */
