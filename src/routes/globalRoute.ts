import { Router } from "express";
import { customRequest } from "../types/customDefinition";
import { dbSync } from "../db/connection";

const globalRouter = Router();

// route to test server
globalRouter.get("/", (req: customRequest, res) => {
  res.status(200).json({ msg: "server is up..", user: req.user });
});

// route to sync db
globalRouter.patch("/sync", async (_req, res) => {
  try {
    const sync = await dbSync(); // dbSync() veritabanına bağlantı kurar ve veritabanı senkronizasyonunu gerçekleştirir.
    res.status(200).json({ ...sync, error: false });
  } catch (err) {
    console.log("ERR", err);
    let msg = "Internal Server Error";
    if (err instanceof Error) {
      msg = err.message;
    } else if (err) {
      msg = String(err);
    }
    return res.status(400).json({ errorMsg: msg, error: true });
  }
});

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
