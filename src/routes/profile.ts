import { Router } from "express";

const router = Router();

import MiddlewareRedValidate from "../middlewares/req-validate";

import ControllerProfile from "../controllers/profile";

import { schemaUpdate } from "../validations/profile";

/**
 * @swagger
 * tags:
 *   name: Profile
 */

/**
 * @swagger
 * /profile/{id}:
 *   put:
 *     summary: Update profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: integer
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
 *               - language
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
 *                description: must contain at least one letter and one number and must be between 8 and 20 characters
 *               language:
 *                type: string
 *                maxLength: 2
 *                description: must be a valid language code
 *             example:
 *               firstname: John
 *               lastname: Doe
 *               username: johndoe
 *               email: johndoe@example.com
 *               password: password12
 *               language: EN
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
  MiddlewareRedValidate(schemaUpdate),
  ControllerProfile.updateOne
);

export default router;
