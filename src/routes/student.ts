import { Router } from "express";

const router = Router();

import MiddlewareRedValidate from "../middlewares/req-validate";

import ControllerStudent from "../controllers/student";

import {
  schemaGetCount,
  schemaGetAll,
  schemaGenderCount,
  schemaGetAllByClassId,
  schemaCountByClassId,
  schemaCreateOne,
  schemaUpdateOne,
  schemaDeleteOne,
  schemaFilter,
} from "../validations/student";

/**
 * @swagger
 * /student/count:
 *   get:
 *     summary: Get student count
 *     tags: [Student]
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
  ControllerStudent.getCount
);

/**
 * @swagger
 * /student:
 *   get:
 *     summary: Get all students
 *     tags: [Student]
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
router.get("/", MiddlewareRedValidate(schemaGetAll), ControllerStudent.getAll);

/**
 * @swagger
 * /student/filter:
 *   get:
 *     summary: Filter students
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: firstname
 *         schema:
 *           type: string
 *         required: false
 *         description: The first name of the student
 *       - in: query
 *         name: lastname
 *         schema:
 *           type: string
 *         required: false
 *         description: The last name of the student
 *       - in: query
 *         name: number
 *         schema:
 *           type: string
 *         required: false
 *         description: The student number
 *       - in: query
 *         name: gender
 *         schema:
 *           type: string
 *         required: false
 *         description: The gender of the student
 *       - in: query
 *         name: classId
 *         schema:
 *           type: string
 *         required: false
 *         description: The class ID
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
  "/filter",
  MiddlewareRedValidate(schemaFilter),
  ControllerStudent.filter
);

/**
 * @swagger
 * /student/gender-count:
 *   get:
 *     summary: Get student gender count
 *     tags: [Student]
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
  "/gender-count",
  MiddlewareRedValidate(schemaGenderCount),
  ControllerStudent.genderCount
);

/**
 * @swagger
 * /student/{classId}:
 *   get:
 *     summary: Get students by classId
 *     tags: [Student]
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
  MiddlewareRedValidate(schemaGetAllByClassId),
  ControllerStudent.getAllByClassId
);

/**
 * @swagger
 * /student/{classId}/class-count:
 *   get:
 *     summary: Get student count by classId
 *     tags: [Student]
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
  "/:classId/class-count",
  MiddlewareRedValidate(schemaCountByClassId),
  ControllerStudent.countByClassId
);

/**
 * @swagger
 * /student/{classId}:
 *   post:
 *     summary: Create a new student
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
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
 *               - idNumber
 *               - firstname
 *               - lastname
 *               - number
 *               - gender
 *               - birthday
 *             properties:
 *               idNumber:
 *                 type: string
 *                 length: 11
 *                 description: "11 digit Turkish identity number"
 *               firstname:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 30
 *               lastname:
 *                type: string
 *                minLength: 3
 *                maxLength: 30
 *               number:
 *                type: number
 *                minLength: 2
 *                maxLength: 15
 *               gender:
 *                 type: string
 *                 enum: ["Female", "Male"]
 *                 description: "Gender: Female or Male"
 *               birthday:
 *                 type: string
 *                 format: ISO date
 *             example:
 *               idNumber: 12345678901
 *               firstname: John
 *               lastname: Doe
 *               number: 123456
 *               gender: Female
 *               birthday: 2010-01-01
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
  MiddlewareRedValidate(schemaCreateOne),
  ControllerStudent.createOne
);

/**
 * @swagger
 * /student/{id}:
 *   put:
 *     summary: Update a student
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
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
 *             properties:
 *               classId:
 *                 type: integer
 *               idNumber:
 *                 type: string
 *                 length: 11
 *                 description: "11 digit Turkish identity number"
 *               firstname:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 30
 *               lastname:
 *                type: string
 *                minLength: 3
 *                maxLength: 30
 *               number:
 *                type: number
 *                minLength: 2
 *                maxLength: 15
 *               gender:
 *                 type: string
 *                 enum: ["Female", "Male"]
 *                 description: "Gender: Female or Male"
 *               birthday:
 *                 type: string
 *                 format: ISO date
 *             example:
 *               classId: 1
 *               idNumber: 12345678901
 *               firstname: John
 *               lastname: Doe
 *               number: 123456
 *               gender: Female
 *               birthday: 2010-01-01
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
  ControllerStudent.updateOne
);

/**
 * @swagger
 * /student/{id}:
 *   delete:
 *     summary: Delete a student
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The student ID
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
  ControllerStudent.deleteOne
);

/**
 * @swagger
 * tags:
 *   name: Student
 *   description: Student management
 */
export default router;
