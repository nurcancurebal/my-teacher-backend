import { Router } from "express";
import { requireUser, validateRequest } from "../middleware";

import {
  getClassController,
  getClassCountController,
  createClassController,
  updateClassController,
  deleteClassController,
} from "../controllers/class";

import { createSchema, updateSchema } from "../validation/class";

const classRouter = Router();

classRouter.get("/", requireUser, getClassController);
classRouter.get("/count", requireUser, getClassCountController);
classRouter.post(
  "/",
  requireUser,
  validateRequest(createSchema),
  createClassController
);
classRouter.patch(
  "/:id",
  requireUser,
  validateRequest(updateSchema),
  updateClassController
);
classRouter.delete("/:id", requireUser, deleteClassController);

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
 *   get:
 *     summary: Get all classes
 *     description: Get all classes
 *     tags: [Class]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *
 *       "401":
 *         description: Invalid email or password
 */

/**
 * @swagger
 * /class/count:
 *   get:
 *     summary: Get class count
 *     description: Get class count
 *     tags: [Class]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *
 *       "401":
 *         description: Invalid email or password
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
 *               - explanation
 *             properties:
 *               class_name:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 3
 *                 description: must be unique
 *               explanation:
 *                 type: string
 *             example:
 *               class_name: 3B
 *               explanation: 3B sınıfı
 *     responses:
 *       "200":
 *         description: OK
 *       "401":
 *         description: Invalid email or password
 */

/**
 * @swagger
 * /class/{id}:
 *   patch:
 *     summary: Update a class
 *     description: Update the class name and/or explanation of a specific class. At least one of `class_name` or `explanation` must be provided.
 *     tags: [Class]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The class ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               class_name:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 3
 *                 description: must be unique
 *               explanation:
 *                 type: string
 *                 description: The explanation of the class
 *             example:
 *               class_name: 3B
 *               explanation: "This is a class explanation."
 *     responses:
 *       "200":
 *         description: OK
 *       "401":
 *         description: Invalid email or password
 */

/**
 * @swagger
 * /class/{id}:
 *   delete:
 *     summary: Delete a class
 *     description: Delete a specific class by ID.
 *     tags: [Class]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The class ID
 *     responses:
 *       "200":
 *         description: Class deleted successfully
 *       "400":
 *         description: Invalid class ID
 *       "401":
 *         description: Unauthorized
 *       "404":
 *         description: Class not found
 *       "500":
 *         description: Internal server error
 */
