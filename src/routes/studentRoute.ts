import { Router } from "express";

import { requireUser, validateRequest } from "../middleware";
import {
  getStudentCountController,
  getAllStudentsController,
  getStudentsController,
  getClassCountController,
  createStudentController,
} from "../controllers/student";
import { studentSchema } from "../validation/student";

const studentRouter = Router();

studentRouter.get("/count", requireUser, getStudentCountController);
studentRouter.get("/", requireUser, getAllStudentsController);
studentRouter.get("/:class_id", requireUser, getStudentsController);
studentRouter.get(
  "/:class_id/class-count",
  requireUser,
  getClassCountController
);
studentRouter.post(
  "/:class_id",
  requireUser,
  validateRequest(studentSchema),
  createStudentController
);

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
 *       "401":
 *         description: Unauthorized
 *
 */

/**
 * @swagger
 * /student:
 *   get:
 *     summary: Get all students
 *     description: Get all students
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *       "401":
 *         description: Invalid email or password
 *
 */

/**
 * @swagger
 * /student/{class_id}:
 *   get:
 *     summary: Get students by class_id
 *     description: Get students by class_id
 *     tags: [Student]
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
 *
 */

/**
 * @swagger
 * /student/{class_id}/class-count:
 *   get:
 *     summary: Get student count by class_id
 *     description: Get student count by class_id
 *     tags: [Student]
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
 *
 */

/**
 * @swagger
 * /student/{class_id}:
 *   post:
 *     summary: Create a new student
 *     description: Create a new student
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
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
 *               - tc
 *               - student_name
 *               - student_lastname
 *               - student_number
 *               - gender
 *               - birthdate
 *             properties:
 *               tc:
 *                 type: string
 *                 pattern: "^[0-9]{11}$"
 *                 description: "11 haneli TC kimlik numarası"
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
 *               gender:
 *                 type: string
 *                 enum: ["K", "E"]
 *                 description: "Cinsiyet (K: Kadın, E: Erkek)"
 *               birthdate:
 *                 type: string
 *                 format: date
 *                 description: "Öğrencinin doğum tarihi"
 *             example:
 *               tc: 12345678901
 *               student_name: John
 *               student_lastname: Doe
 *               student_number: 123456
 *               gender: K
 *               birthdate: 1990-01-01
 *     responses:
 *       "200":
 *         description: OK
 *
 */
