import express from 'express';
import VentaControlador from '../../controladores/ventas/ventasController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Sales
 *   description: API for managing sales
 */

/**
 * @swagger
 * /ventas/descargarExcel:
 *   get:
 *     summary: Download sales data in Excel format
 *     tags: [Sales]
 *     responses:
 *       200:
 *         description: Excel file with sales data
 *         content:
 *           application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
 *             schema:
 *               type: string
 *               format: binary
 */
router.get('/ventas/descargarExcel', VentaControlador.descargarVentasExcel); // Download sales data in Excel format

/**
 * @swagger
 * /ventas:
 *   get:
 *     summary: Get all sales
 *     tags: [Sales]
 *     responses:
 *       200:
 *         description: List of all sales
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DetalleVenta'  # Updated reference
 */
router.get('/ventas', VentaControlador.obtenerVentas); // Get all sales

/**
 * @swagger
 * /ventas:
 *   post:
 *     summary: Create a new sale
 *     tags: [Sales]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DetalleVenta'  # Updated reference
 *     responses:
 *       201:
 *         description: DetalleVenta created successfully
 */
router.post('/ventas', VentaControlador.crearVenta); // Create a new sale

/**
 * @swagger
 * /ventas/{id}:
 *   get:
 *     summary: Get a sale by ID
 *     tags: [Sales]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: DetalleVenta ID
 *     responses:
 *       200:
 *         description: DetalleVenta details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DetalleVenta'  # Updated reference
 *       404:
 *         description: DetalleVenta not found
 */
router.get('/ventas/:id', VentaControlador.obtenerVentaPorId); // Get a sale by ID

/**
 * @swagger
 * /ventas/{id}:
 *   put:
 *     summary: Update a sale by ID
 *     tags: [Sales]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: DetalleVenta ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DetalleVenta'  # Updated reference
 *     responses:
 *       200:
 *         description: DetalleVenta updated successfully
 *       404:
 *         description: DetalleVenta not found
 */
router.put('/ventas/:id', VentaControlador.actualizarVenta); // Update a sale by ID

/**
 * @swagger
 * /ventas/{id}:
 *   delete:
 *     summary: Delete a sale by ID
 *     tags: [Sales]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: DetalleVenta ID
 *     responses:
 *       200:
 *         description: DetalleVenta deleted successfully
 *       404:
 *         description: DetalleVenta not found
 */
router.delete('/ventas/:id', VentaControlador.borrarVenta); // Delete a sale by ID

/**
 * @swagger
 * /ventas/buscar/{q}:
 *   get:
 *     summary: Search sales by query
 *     tags: [Sales]
 *     parameters:
 *       - in: path
 *         name: q
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query for sale details (e.g., item names, customer, etc.)
 *     responses:
 *       200:
 *         description: List of sales matching the search query
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DetalleVenta'  # Updated reference
 */
router.get('/ventas/buscar/:q', VentaControlador.buscarVentasFiltro); // Search sales by query

export default router;
