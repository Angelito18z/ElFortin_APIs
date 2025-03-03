import express from 'express';
import DataController from '../../controladores/IoT/controllerData.js';
const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: data
 *   description: API for managing data records
 */

/**
 * @swagger
 * /data:
 *   get:
 *     summary: Retrieve all data records
 *     tags: [data]
 *     responses:
 *       200:
 *         description: List of all data records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/data'
 *       500:
 *         description: Internal server error
 */
router.get("/data", DataController.getAll);

/**
 * @swagger
 * /data:
 *   post:
 *     summary: Create a new data record
 *     tags: [data]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/data'
 *     responses:
 *       201:
 *         description: Data record created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/data'
 *       400:
 *         description: Bad request, invalid data
 *       500:
 *         description: Internal server error
 */
router.post("/data", DataController.create);

export default router;
