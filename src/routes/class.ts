import { Router } from "express";

const router = Router();

import MiddlewareRedValidate from "../middlewares/req-validate";

import ControllerClass from "../controllers/class";

import {
  schemaFindAll,
  schemaGetCount,
  schemaCreateOne,
  schemaUpdateOne,
  schemaDeleteOne,
} from "../validations/class";

/**
 * @swagger
 * /class:
 *   get:
 *     summary: Get all classes
 *     tags: [Class]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *       "401":
 *         description: Unauthorized
 *       "400":
 *         description: Bad Request
 *       "500":
 *         description: Internal Server Error
 */
router.get("/", MiddlewareRedValidate(schemaFindAll), ControllerClass.findAll);

/**
 * @swagger
 * /class/count:
 *   get:
 *     summary: Get class count
 *     tags: [Class]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *       "401":
 *         description: Unauthorized
 *       "400":
 *         description: Bad Request
 *       "500":
 *         description: Internal Server Error
 */
router.get(
  "/count",
  MiddlewareRedValidate(schemaGetCount),
  ControllerClass.getCount
);

/**
 * @swagger
 * /class:
 *   post:
 *     summary: Create a new class
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
 *               - className
 *               - explanation
 *             properties:
 *               className:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 3
 *                 description: must be unique
 *               explanation:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 60
 *             example:
 *               className: 3B
 *               explanation: 3B sınıfı
 *     responses:
 *       "200":
 *         description: OK
 *       "401":
 *         description: Unauthorized
 *       "400":
 *         description: Bad Request
 *       "500":
 *         description: Internal Server Error
 */
router.post(
  "/",
  MiddlewareRedValidate(schemaCreateOne),
  ControllerClass.createOne
);

/**
 * @swagger
 * /class/{id}:
 *   put:
 *     summary: Update a class
 *     tags: [Class]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Class ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - className
 *               - explanation
 *             properties:
 *               className:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 3
 *                 description: must be unique
 *               explanation:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 60
 *             example:
 *               className: 3B
 *               explanation: 3B sınıfı
 *     responses:
 *       "200":
 *         description: OK
 *       "401":
 *         description: Unauthorized
 *       "400":
 *         description: Bad Request
 *       "500":
 *         description: Internal Server Error
 */
router.put(
  "/:id",
  MiddlewareRedValidate(schemaUpdateOne),
  ControllerClass.updateOne
);

/**
 * @swagger
 * /class/{id}:
 *   delete:
 *     summary: Delete a class
 *     tags: [Class]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Class ID
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: OK
 *       "401":
 *         description: Unauthorized
 *       "400":
 *         description: Bad Request
 *       "500":
 *         description: Internal Server Error
 */
router.delete(
  "/:id",
  MiddlewareRedValidate(schemaDeleteOne),
  ControllerClass.deleteOne
);

/**
 * @swagger
 * tags:
 *   name: Class
 *   description: Class management
 */
export default router;
