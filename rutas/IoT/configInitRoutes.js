import express from 'express';
import ConfigInitController from '../../controladores/IoT/configInitController.js';

const router = express.Router();



/**
 * @swagger
 * tags:
 *   name: ConfigInit
 *   description: API for managing configInit
 */

/**
 * @swagger
 * /configInit:
 *   get:
 *     summary: Retrieve all configInit
 *     tags: [ConfigInit]
 *     responses:
 *       200:
 *         description: List of all configInit
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ConfigInit'
 *       500:
 *         description: Internal server error
 */
router.get("/configInit", ConfigInitController.getAllConfigInit); // Get all configInit

/**
 * @swagger
 * /configInit:
 *   post:
 *     summary: Create a new configInit
 *     tags: [ConfigInit]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ConfigInit'
 *     responses:
 *       201:
 *         description: ConfigInit created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */
router.post("/configInit", ConfigInitController.createConfigInit); // Create a new configInit

/**
 * @swagger
 * /configInit/{id}:
 *   get:
 *     summary: Retrieve configInit by id
 *     tags: [ConfigInit]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: ConfigInit retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ConfigInit'
 *       404:
 *         description: ConfigInit not found
 *       500:
 *         description: Internal server error
 */
router.get("/configInit/:id", ConfigInitController.getConfigInitById); // Get configInit by id

/**
 * @swagger
 * /configInit/{id}:
 *   put:
 *     summary: Update an existing configInit by ID
 *     tags: [ConfigInit]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the configInit to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ConfigInit'
 *     responses:
 *       200:
 *         description: ConfigInit updated successfully
 *       404:
 *         description: ConfigInit not found
 *       500:
 *         description: Internal server error
 */
router.put("/configInit/:id", ConfigInitController.updateConfigInit); // Update an existing configInit by ID

/**
 * @swagger
 * /configInit/{id}:
 *   delete:
 *     summary: Delete a configInit by ID
 *     tags: [ConfigInit]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: ConfigInit deleted successfully
 *       404:
 *         description: ConfigInit not found
 *       500:
 *         description: Internal server error
 */
router.delete("/configInit/:id", ConfigInitController.deleteConfigInit); // Delete a configInit by ID


export default router;
