import express from "express";
import ProveedorControlador from "../../controladores/proveedores/proveedorControlador.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Providers
 *   description: API for managing suppliers (proveedores)
 */

/**
 * @swagger
 * /proveedores/buscar/{q}:
 *   get:
 *     summary: Search providers by query
 *     tags: [Providers]
 *     parameters:
 *       - in: path
 *         name: q
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query for provider names or descriptions
 *     responses:
 *       200:
 *         description: List of providers matching the search query
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Supplier'
 */
router.get('/proveedores/buscar/:q', ProveedorControlador.buscarProveedoresFiltro); // Search providers by query

/**
 * @swagger
 * /proveedores/descargarExcel:
 *   get:
 *     summary: Download providers in Excel format
 *     tags: [Providers]
 *     responses:
 *       200:
 *         description: Excel file with provider information
 *         content:
 *           application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
 *             schema:
 *               type: string
 *               format: binary
 */
router.get('/proveedores/descargarExcel', ProveedorControlador.descargarProveedoresExcel); // Download providers in Excel format

/**
 * @swagger
 * /proveedores/{id}:
 *   get:
 *     summary: Get a provider by ID
 *     tags: [Providers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Supplier ID
 *     responses:
 *       200:
 *         description: Supplier details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Supplier'
 *       404:
 *         description: Supplier not found
 */
router.get('/proveedores/:id', ProveedorControlador.obtenerProveedorPorId); // Get provider by ID

/**
 * @swagger
 * /proveedores:
 *   get:
 *     summary: Get all providers
 *     tags: [Providers]
 *     responses:
 *       200:
 *         description: List of all providers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Supplier'
 */
router.get('/proveedores', ProveedorControlador.obtenerProveedores); // Get all providers

/**
 * @swagger
 * /proveedores:
 *   post:
 *     summary: Create a new provider
 *     tags: [Providers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Supplier'
 *     responses:
 *       201:
 *         description: Supplier created successfully
 */
router.post('/proveedores', ProveedorControlador.crearProveedor); // Create a new provider

/**
 * @swagger
 * /proveedores/{id}:
 *   put:
 *     summary: Update a provider by ID
 *     tags: [Providers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Supplier ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Supplier'
 *     responses:
 *       200:
 *         description: Supplier updated successfully
 *       404:
 *         description: Supplier not found
 */
router.put('/proveedores/:id', ProveedorControlador.actualizarProveedor); // Update provider by ID

/**
 * @swagger
 * /proveedores/{id}:
 *   delete:
 *     summary: Delete a provider by ID
 *     tags: [Providers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Supplier ID
 *     responses:
 *       200:
 *         description: Supplier deleted successfully
 *       404:
 *         description: Supplier not found
 */
router.delete('/proveedores/:id', ProveedorControlador.borrarProveedor); // Delete provider by ID

export default router;
