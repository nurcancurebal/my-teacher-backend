import { Router } from "express";
import { requireUser, validateRequest } from "../middleware";
import { getUserData, updateUser } from "../controllers/user";
import { userSchema } from "../validation/user";

const userRouter = Router();

userRouter.get("/", requireUser, getUserData);
userRouter.patch("/", requireUser, validateRequest(userSchema), updateUser);

export default userRouter;

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management
 */

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get user information
 *     description: Logged in users can fetch only their own user information.
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *
 *   patch:
 *     summary: Update  user
 *     description: Logged in users can only update their own information.
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
 *                 description: The current password of the user
 *             example:
 *               firstname: John
 *               lastname: Doe
 *               username: johndoe
 *               email: johndoe@example.com
 *               password: password123
 *     responses:
 *       "200":
 *         description: OK
 *
 */
