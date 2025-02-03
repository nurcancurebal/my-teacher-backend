import { Router } from "express";

const router = Router();

import MiddlewareRedValidate from "../middlewares/req-validate";

import ControllerStudent from "../controllers/student";

import { schemaGetCount, schemaGetAll } from "../validations/student";

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
 * /student/:
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
 * tags:
 *   name: Student
 *   description: Student management
 */
export default router;
