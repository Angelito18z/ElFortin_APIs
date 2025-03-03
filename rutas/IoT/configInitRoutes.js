import express from 'express';
import ConfigInitController from '../../controladores/IoT/controllerConfigInit.js';
const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: configInit
 *   description: API for managing configuration initialization
 */

/**
 * @swagger
 * /configInit:
 *   get:
 *     summary: Retrieve all configuration initializations
 *     tags: [configInit]
 *     responses:
 *       200:
 *         description: List of all configuration initializations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/configInit'
 *       500:
 *         description: Internal server error
 */
router.get("/configInit", ConfigInitController.getAll);

/**
 * @swagger
 * /configInit:
 *   put:
 *     summary: Update a configuration initialization
 *     tags: [configInit]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/configInit'
 *     responses:
 *       200:
 *         description: Configuration updated successfully
 *       400:
 *         description: Bad request, invalid data
 *       500:
 *         description: Internal server error
 */
router.put("/configInit/:id", ConfigInitController.update);

export default router;