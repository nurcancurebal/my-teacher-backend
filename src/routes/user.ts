import { Router } from "express";

const router = Router();

import MiddlewareRedValidate from "../middlewares/req-validate";

import ControllerUser from "../controllers/user";

import { schemaUpdate } from "../validations/user";

/**
 * @swagger
 * tags:
 *   name: User
 */

/**
 * @swagger
 * /user:
 *   put:
 *     summary: Update user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstname
 *               - lastname
 *               - username
 *               - email
 *               - password
 *             properties:
 *               firstname:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 30
 *               lastname:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 30
 *               username:
 *                type: string
 *                minLength: 3
 *                maxLength: 30
 *                description: must be unique
 *               email:
 *                type: string
 *                format: email
 *                description: must be unique
 *               password:
 *                type: string
 *                format: password
 *                minLength: 8
 *                maxLength: 20
 *                description: The current password of the user
 *             example:
 *               firstname: John
 *               lastname: Doe
 *               username: johndoe
 *               email: johndoe@example.com
 *               password: password12
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
router.put("/", MiddlewareRedValidate(schemaUpdate), ControllerUser.updateOne);

export default router;
