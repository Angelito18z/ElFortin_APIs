import express from 'express';
import RunningConfigController from '../../controladores/IoT/runningConfigController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: RunningConfig
 *  description: API for managing runningConfig
 */

/**
 * @swagger
 * /runningConfig:
 *  get:
 *   summary: Retrieve all runningConfig
 *   tags: [RunningConfig]
 *   responses:
 *     200:
 *       description: List of all runningConfig
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/RunningConfig'
 *     500:
 *       description: Internal server error
 */
router.get('/runningConfig', RunningConfigController.getAllRunningConfig); // Get all runningConfig

/**
 * @swagger
 * /runningConfig:
 *   post:
 *     summary: Create a new runningConfig
 *     tags: [RunningConfig]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RunningConfig'
 *     responses:
 *       201:
 *         description: RunningConfig created successfully
 *       500:
 *         description: Internal server error
 */
router.post('/runningConfig', RunningConfigController.createRunningConfig); // Create a new runningConfig

/**
 * @swagger
 * /runningConfig/{id}:
 *   get:
 *     summary: Retrieve runningConfig by id
 *     tags: [RunningConfig]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: RunningConfig retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RunningConfig'
 *       404:
 *         description: RunningConfig not found
 *       500:
 *         description: Internal server error
 */
router.get('/runningConfig/:id', RunningConfigController.getRunningConfigById); // Get runningConfig by id

/**
 * @swagger
 * /runningConfig/{id}:
 *   put:
 *     summary: Update an existing runningConfig by ID
 *     tags: [RunningConfig]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the runningConfig to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RunningConfig'
 *     responses:
 *       200:
 *         description: RunningConfig updated successfully
 *       404:
 *         description: RunningConfig not found
 *       500:
 *         description: Internal server error
 */
router.put('/runningConfig/:id', RunningConfigController.updateRunningConfig); 

/**
 * @swagger
 * /runningConfig/{id}:
 *   delete:
 *     summary: Delete a runningConfig by ID
 *     tags: [RunningConfig]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the runningConfig to delete
 *     responses:
 *       200:
 *         description: RunningConfig deleted successfully
 *       404:
 *         description: RunningConfig not found
 *       500:
 *         description: Internal server error
 */
router.delete('/runningConfig/:id', RunningConfigController.deleteRunningConfig); 

export default router;
