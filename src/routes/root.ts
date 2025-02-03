import { Router } from "express";

const router = Router();

import ControllerRoot from "../controllers/root";

/**
 * @swagger
 * /status:
 *   get:
 *     summary: Get server status
 *     tags: [Root]
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
router.get("/status", ControllerRoot.home);

/**
 * @swagger
 * /db-sync:
 *   patch:
 *     summary: Sync database
 *     tags: [Root]
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
router.patch("/db-sync", ControllerRoot.databaseSync);

/**
 * @swagger
 * tags:
 *   name: Root
 */
export default router;
