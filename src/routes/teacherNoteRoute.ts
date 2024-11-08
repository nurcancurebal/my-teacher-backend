import { Router } from "express";

import { requireUser, validateRequest } from "../middleware";
import { createTeacherNoteController } from "../controllers/teacherNote";
import { createSchema } from "../validation/teacherNote";

const teacherNoteRouter = Router();

teacherNoteRouter.post(
  "/",
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
 * /teacher-note:
 *   post:
 *     summary: Create a new teacher note
 *     description: Create a new teacher note
 *     tags: [TeacherNote]
 *     security:
 *       - bearerAuth: []
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
