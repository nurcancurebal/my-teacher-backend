import { Router } from "express";

import { requireUser, validateRequest } from "../middleware";
import {
  getGradeController,
  existGradeController,
  createGradeController,
} from "../controllers/grade";
import { existSchema, createSchema } from "../validation/grade";

const gradeRouter = Router();

gradeRouter.get("/:class_id", requireUser, getGradeController);
gradeRouter.post(
  "/",
  requireUser,
  validateRequest(existSchema),
  existGradeController
);
gradeRouter.post(
  "/:class_id",
  requireUser,
  validateRequest(createSchema),
  createGradeController
);

export default gradeRouter;

/**
 * @swagger
 * tags:
 *   name: Grade
 *   description: Grade management
 */

/**
 * @swagger
 * /grade/{class_id}:
 *   get:
 *     summary: Get grades by class_id
 *     description: Get grades by class_id
 *     tags: [Grade]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: class_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the class
 *     responses:
 *       "200":
 *         description: OK
 *       "401":
 *         description: Invalid email or password
 */

/**
 * @swagger
 * /grade:
 *   post:
 *     summary: Existence check for grade
 *     description: Only authenticated users can check the existence of a grade.
 *     tags: [Grade]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - class_id
 *               - grade_type
 *             properties:
 *               class_id:
 *                 type: number
 *               grade_type:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 30
 *                 description: must be unique
 *             example:
 *               class_id: 1
 *               grade_type: "midterm"
 *     responses:
 *       "200":
 *         description: OK
 *
 */

/**
 * @swagger
 * /grade/{class_id}:
 *   post:
 *     summary: Create a new grade
 *     description: Only authenticated users can create grades.
 *     tags: [Grade]
 *     parameters:
 *       - in: path
 *         name: class_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the class
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - student_id
 *               - grade_type
 *               - grade_value
 *             properties:
 *               student_id:
 *                 type: number
 *               grade_type:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 30
 *                 description: must be unique
 *               grade_value:
 *                 type: number
 *             example:
 *               student_id: 1
 *               grade_type: "midterm"
 *               grade_value: 80
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "201":
 *         description: Created
 *       "400":
 *         description: Bad Request
 *       "401":
 *         description: Unauthorized
 */
