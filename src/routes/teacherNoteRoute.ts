import { Router } from "express";

import { requireUser, validateRequest } from "../middleware";
import { createTeacherNoteController } from "../controllers/teacherNote";
import { createSchema } from "../validation/teacherNote";

const teacherNoteRouter = Router();

teacherNoteRouter.post(
  "/:class_id",
  requireUser,
  validateRequest(createSchema),
  createTeacherNoteController
);

export default teacherNoteRouter;

/**
 * @swagger
 * tags:
 *   name: TeacherNote
 *   description: Teacher note management
 */

/**
 * @swagger
 * /teacher-note/{class_id}:
 *   post:
 *     summary: Create a new teacher note
 *     description: Create a new teacher note
 *     tags: [TeacherNote]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: class_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Class ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - student_id
 *               - title
 *               - note
 *             properties:
 *               student_id:
 *                 type: number
 *               title:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 20
 *               note:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 130
 *             example:
 *               student_id: 1
 *               title: "Math"
 *               note: "Great improvement!"
 *     responses:
 *       "201":
 *         description: Created
 *       "400":
 *         description: Bad Request
 *       "401":
 *         description: Unauthorized
 */
