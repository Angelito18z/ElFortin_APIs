import express from 'express';
import CircuitStatusController from '../../controladores/IoT/circuitStatusController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: CircuitStatus
 *   description: API for managing circuit status
 */

/**
 * @swagger
 * /circuitStatus:
 *   get:
 *     summary: Retrieve all circuit statuses
 *     tags: [CircuitStatus]
 *     responses:
 *       200:
 *         description: List of all circuit statuses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CircuitStatus'
 *       500:
 *         description: Internal server error
 */
router.get('/circuitStatus', CircuitStatusController.getAllCircuitStatus); // Get all circuit statuses

/**
 * @swagger
 * /circuitStatus/{id}:
 *   get:
 *     summary: Retrieve circuit status by id
 *     tags: [CircuitStatus]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Circuit status retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CircuitStatus'
 *       404:
 *         description: CircuitStatus not found
 *       500:
 *         description: Internal server error
 */
router.get('/circuitStatus/:id', CircuitStatusController.getCircuitStatusById); // Get circuit status by id

/**
 * @swagger
 * /circuitStatus/{id}:
 *   put:
 *     summary: Update an existing circuit status by ID
 *     tags: [CircuitStatus]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the circuit status to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CircuitStatus'
 *     responses:
 *       200:
 *         description: Circuit status updated successfully
 *       404:
 *         description: CircuitStatus not found
 *       500:
 *         description: Internal server error
 */
router.put('/circuitStatus/:id', CircuitStatusController.updateCircuitStatus); // Update an existing circuit status by ID

export default router;
