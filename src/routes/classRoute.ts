import { Router } from "express";
import { requireUser, validateRequest } from "../middleware";

import {
  getClassController,
  getClassCountController,
  createClassController,
  updateClassController,
} from "../controllers/class";

import { classSchema } from "../validation/class";

const classRouter = Router();

classRouter.get("/", requireUser, getClassController);
classRouter.get("/count", requireUser, getClassCountController);
classRouter.post(
  "/",
  requireUser,
  validateRequest(classSchema),
  createClassController
);
classRouter.patch(
  "/:id",
  requireUser,
  validateRequest(classSchema),
  updateClassController
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
 */

/**
 * @swagger
 * /class/{id}:
 *   patch:
 *     summary: Update class by id
 *     description: Update class by id
 *     tags: [Class]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Class id
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
 *       "401":
 *         description: Invalid email or password
 */
