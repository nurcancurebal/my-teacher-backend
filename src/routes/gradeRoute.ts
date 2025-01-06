import { Router } from "express";

import { requireUser, validateRequest } from "../middleware";
import {
  getGradeController,
  getLastAddedGradeController,
  existGradeController,
  createGradeController,
  updateGradeController,
} from "../controllers/grade";
import { existSchema, createSchema, updateSchema } from "../validation/grade";

const gradeRouter = Router();

gradeRouter.get("/last-added", requireUser, getLastAddedGradeController);
gradeRouter.get("/:class_id", requireUser, getGradeController);
gradeRouter.post(
  "/:class_id",
  requireUser,
  validateRequest(existSchema),
  existGradeController
);
gradeRouter.post(
  "/:class_id/:student_id",
  requireUser,
  validateRequest(createSchema),
  createGradeController
);
gradeRouter.patch(
  "/:class_id/:student_id/:id",
  requireUser,
  validateRequest(updateSchema),
  updateGradeController
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
 * /grade/last-added:
 *   get:
 *     summary: Get the last added grade
 *     description: Get the last added grade
 *     tags: [Grade]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *       "401":
 *         description: Invalid email or password
 */

/**
 * @swagger
 * /grade/{class_id}:
 *   post:
 *     summary: Check the existence of a grade
 *     description: Only authenticated users can check the existence of a grade.
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
 *               - grade_type
 *             properties:
 *               grade_type:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 30
 *             example:
 *               grade_type: "midterm"
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

/**
 * @swagger
 * /grade/{class_id}/{student_id}:
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
 *       - in: path
 *         name: student_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the student
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - grade_type
 *               - grade_value
 *             properties:
 *               grade_type:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 30
 *               grade_value:
 *                 type: number
 *             example:
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

/**
 * @swagger
 * /grade/{class_id}/{student_id}/{id}:
 *   patch:
 *     summary: Update a grade
 *     description: Only authenticated users can update grades.
 *     tags: [Grade]
 *     parameters:
 *       - in: path
 *         name: class_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the class
 *       - in: path
 *         name: student_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the student
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the grade
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - grade_value
 *             properties:
 *               grade_value:
 *                 type: number
 *             example:
 *               grade_value: 80
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "201":
 *         description: Updated
 *       "400":
 *         description: Bad Request
 *       "401":
 *         description: Unauthorized
 */
