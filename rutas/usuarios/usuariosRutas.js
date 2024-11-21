import express from 'express';
import AutenticationController from '../../controladores/usuarios/authenticationController.js';

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
 *   get:
 *     summary: Get a user by credentials
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: The username of the user
 *       - in: query
 *         name: password
 *         schema:
 *           type: string
 *         required: true
 *         description: The password of the user
 *     responses:
 *       200:
 *         description: User details if credentials are correct
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Invalid credentials
 */
router.get('/login', AutenticationController.getUserByCredencials); // Get a user by credentials

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
router.post('/usuarios', AutenticationController.createUser); // Create a new user

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
router.put('/usuarios/:id', AutenticationController.updateUser); // Update user by ID

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
