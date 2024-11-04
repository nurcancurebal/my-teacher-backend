import { Router } from "express";

import { getServerStatus, syncDatabase } from "../controllers/global";

const globalRouter = Router();

// route to test server
globalRouter.get("/", getServerStatus);

// route to sync db
globalRouter.patch("/sync", syncDatabase);

export default globalRouter;

/**
 * @swagger
 * tags:
 *   name: Global
 *
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get server status
 *     description: Logged in users can fetch only their own user information or Check Server Status
 *     tags: [Global]
 *     responses:
 *       "200":
 *         description: OK
 *
 * /sync:
 *   patch:
 *     summary: Sync database
 *     description: To sync database first time and after change in model.
 *     tags: [Global]
 *     responses:
 *       "200":
 *         description: OK
 *
 */
