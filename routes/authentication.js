import express from "express";
import { verifyToken } from "../middleware";
import { changePwd, forgotPassword } from "../controllers/Authentication";

const authenticate = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     changePwd:
 *       type: object
 *       required:
 *         - email
 *         - existingPwd
 *         - newPwd
 *       example:
 *         email: example@gmail.com
 *         existingPwd: myPassword1
 *         newPwd: myPassword2
 */

/**
 * @swagger
 * tags:
 *   name: changePwd
 *   description: The password changing accesibility managing API
 */

/**
 * @swagger
 * /holidays/changepassword/:
 *   put:
 *     summary: Create a new password
 *     tags: [changePwd]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *          required: true
 *          content:
 *            application/json:
 *               schema:
 *                   $ref: '#/components/schemas/changePwd'
 *     responses:
 *       201:
 *          description: The new password was successfully changed
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/changePwd'
 *       401:
 *          description: wrong email or password credentials!
 *       500:
 *          description: Internal Server Error
 */

authenticate.put("/", verifyToken, changePwd);
authenticate.patch("/forgotpassword/:token", forgotPassword);

export default authenticate;
