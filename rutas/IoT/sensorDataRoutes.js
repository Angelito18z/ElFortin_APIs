import express from 'express';
import SensorDataController from '../../controladores/IoT/sensorDataController.js';
const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: sensorData
 *  description: API for managing sensorData
 */

/**
 * @swagger
 * /sensorData:
 *  get:
 *   summary: Retrieve all sensorData
 *   tags: [sensorData]
 *   responses:
 *     200:
 *       description: List of all sensorData
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/sensorData'
 *     500:
 *       description: Internal server error
 */
router.get('/sensorData', SensorDataController.getAllSensorData); // Get all sensorData


/**
 * @swagger
 * /sensorData/{id}:
 *   get:
 *     summary: Retrieve sensorData by id
 *     tags: [sensorData]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: sensorData retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/sensorData'
 *       404:
 *         description: sensorData not found
 *       500:
 *         description: Internal server error
 */
router.get('/sensorData/:id', SensorDataController.getSensorDataById); // Get sensorData by id

export default router;
