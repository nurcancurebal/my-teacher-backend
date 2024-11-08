import { Router } from "express";

import { requireUser, validateRequest } from "../middleware";
import { createGradeController } from "../controllers/grade";
import { createSchema } from "../validation/grade";

const gradeRouter = Router();

gradeRouter.post(
  "/",
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
 * /grade:
 *   post:
 *     summary: Create a new grade
 *     description: Only authenticated users can create grades.
 *     tags: [Grade]
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
