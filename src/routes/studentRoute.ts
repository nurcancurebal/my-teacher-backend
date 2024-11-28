import { Router } from "express";

import { requireUser, validateRequest } from "../middleware";
import {
  createStudentController,
  getStudentCountController,
} from "../controllers/student";
import { studentSchema } from "../validation/student";

const studentRouter = Router();

studentRouter.post(
  "/",
  requireUser,
  validateRequest(studentSchema),
  createStudentController
);
studentRouter.get("/count", requireUser, getStudentCountController);

export default studentRouter;

/**
 * @swagger
 * tags:
 *   name: Student
 *   description: Student management
 */

/**
 * @swagger
 * /student/count:
 *   get:
 *     summary: Get student count
 *     description: Get student count
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
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
 * /student:
 *   post:
 *     summary: Create a new student
 *     description: Create a new student
 *     tags: [Student]
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
 *               - student_name
 *               - student_lastname
 *               - student_number
 *             properties:
 *               class_id:
 *                 type: number
 *               student_name:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 30
 *               student_lastname:
 *                type: string
 *                minLength: 3
 *                maxLength: 30
 *               student_number:
 *                type: number
 *                minLength: 2
 *                maxLength: 15
 *             example:
 *               class_id: 1
 *               student_name: John
 *               student_lastname: Doe
 *               student_number: 123456
 *     responses:
 *       "200":
 *         description: OK
 *
 */
