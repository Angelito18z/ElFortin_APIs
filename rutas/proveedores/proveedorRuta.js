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
 * components:
 *   schemas:
 *     Supplier:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier of the supplier
 *         name:
 *           type: string
 *           description: Name of the supplier
 *         contact_info:
 *           type: string
 *           description: Contact information of the supplier
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Supplier creation date
 *     SupplierInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the supplier
 *         contact_info:
 *           type: string
 *           description: Contact information of the supplier
 */

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
 *       500:
 *         description: Server error
 */
router.get('/proveedores', ProveedorControlador.obtenerProveedores);

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
 *       500:
 *         description: Server error
 */
router.get('/proveedores/:id', ProveedorControlador.obtenerProveedorPorId);

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
 *             $ref: '#/components/schemas/SupplierInput'
 *     responses:
 *       201:
 *         description: Supplier created successfully
 *       500:
 *         description: Server error
 */
router.post('/proveedores', ProveedorControlador.crearProveedor);

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
 *             $ref: '#/components/schemas/SupplierInput'
 *     responses:
 *       200:
 *         description: Supplier updated successfully
 *       404:
 *         description: Supplier not found
 *       500:
 *         description: Server error
 */
router.put('/proveedores/:id', ProveedorControlador.actualizarProveedor);

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
 *       500:
 *         description: Server error
 */
router.delete('/proveedores/:id', ProveedorControlador.borrarProveedor);

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
 *       404:
 *         description: No matches found
 *       500:
 *         description: Server error
 */
router.get('/proveedores/buscar/:q', ProveedorControlador.buscarProveedoresFiltro);

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
 *       500:
 *         description: Server error
 */
router.get('/proveedores/descargarExcel', ProveedorControlador.descargarProveedoresExcel);

export default router;
