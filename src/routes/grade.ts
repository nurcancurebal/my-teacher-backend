import { Router } from "express";

const router = Router();

import MiddlewareRedValidate from "../middlewares/req-validate";

import ControllerGrade from "../controllers/grade";

import {
  schemaLatestGrade,
  schemaClassIdFindAll,
  schemaGradeTypeExists,
  schemaCreateOne,
  schemaUpdateOne,
} from "../validations/grade";

/**
 * @swagger
 * /grade/last-added:
 *   get:
 *     summary: Get the last added grade
 *     tags: [Grade]
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
  "/last-added",
  MiddlewareRedValidate(schemaLatestGrade),
  ControllerGrade.findLatestGrade
);

/**
 * @swagger
 * /grade/{classId}:
 *   get:
 *     summary: Get grades by classId
 *     tags: [Grade]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: classId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the class
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
  "/:classId",
  MiddlewareRedValidate(schemaClassIdFindAll),
  ControllerGrade.classIdFindAll
);

/**
 * @swagger
 * /grade/{classId}:
 *   post:
 *     summary: Check the existence of a grade
 *     tags: [Grade]
 *     parameters:
 *       - in: path
 *         name: classId
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
 *               - gradeType
 *             properties:
 *               gradeType:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 30
 *             example:
 *               gradeType: "midterm"
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
router.post(
  "/:classId",
  MiddlewareRedValidate(schemaGradeTypeExists),
  ControllerGrade.gradeTypeExists
);

/**
 * @swagger
 * /grade/{classId}/{studentId}:
 *   post:
 *     summary: Create a new grade
 *     tags: [Grade]
 *     parameters:
 *       - in: path
 *         name: classId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the class
 *       - in: path
 *         name: studentId
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
 *               - gradeType
 *               - gradeValue
 *             properties:
 *               gradeType:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 30
 *               gradeValue:
 *                 type: number
 *             example:
 *               gradeType: "midterm"
 *               gradeValue: 80
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
router.post(
  "/:classId/:studentId",
  MiddlewareRedValidate(schemaCreateOne),
  ControllerGrade.createOne
);

/**
 * @swagger
 * /grade/{classId}/{studentId}/{id}:
 *   put:
 *     summary: Update a grade
 *     description: Only authenticated users can update grades.
 *     tags: [Grade]
 *     parameters:
 *       - in: path
 *         name: classId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the class
 *       - in: path
 *         name: studentId
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
 *               - gradeValue
 *               - gradeType
 *             properties:
 *               gradeValue:
 *                 type: number
 *               gradeType:
 *                 type: string
 *             example:
 *               gradeValue: 80
 *               gradeType: "midterm"
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
router.put(
  "/:classId/:studentId/:id",
  MiddlewareRedValidate(schemaUpdateOne),
  ControllerGrade.updateOne
);

/**
 * @swagger
 * tags:
 *   name: Grade
 *   description: Grade management
 */
export default router;
