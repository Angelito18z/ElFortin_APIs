import express from 'express';
import upload from '../../config/multer.js'; // Adjust the path based on your folder structure
import AutenticationController from '../../controladores/usuarios/authenticationController.js';
import {login} from '../../controladores/usuarios/authController.js';
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for managing users and authentication
 */

/**
 * @swagger
 * /usuarios/descargarExcel:
 *   get:
 *     summary: Download users in Excel format
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Excel file with user data
 *         content:
 *           application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
 *             schema:
 *               type: string
 *               format: binary
 */
router.get('/usuarios/descargarExcel', AutenticationController.descargarUsuariosExcel); // Download users in Excel format

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Authenticate a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful, returns user token
 *       401:
 *         description: Unauthorized, invalid credentials
 */

router.post('/login', login); // Log in
/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/usuarios', AutenticationController.getAllUsers); // Get all users

/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
router.get('/usuarios/:id', AutenticationController.getUserById); // Get a user by ID

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 */
router.post('/usuarios', upload.single('image'), AutenticationController.createUser); // Create a new user

/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 */
router.put('/usuarios/:id', upload.single('image'), AutenticationController.updateUser); // Update user by ID

/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete('/usuarios/:id', AutenticationController.deleteUser); // Delete user by ID

export default router;
