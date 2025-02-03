import { Router } from "express";
import swaggerUi from "swagger-ui-express";

import ControllerDocs from "../controllers/docs";

const router = Router();

router.use("/", swaggerUi.serve);

/**
 * @swagger
 * /docs:
 *   get:
 *     summary: Get Swagger documentation
 *     tags: [Docs]
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
router.get("/", ControllerDocs.generateDocs);

/**
 * @swagger
 * tags:
 *   name: Docs
 */
export default router;
