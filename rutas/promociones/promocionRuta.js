import express from "express";
import PromocionControlador from "../../controladores/promociones/promocionControlador.js";

const router = express.Router();


/**
 * @swagger
 * /promociones:
 *   get:
 *     summary: Get all active promotions
 *     tags: [Promotions]
 *     responses:
 *       200:
 *         description: List of all active promotions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Promotion'
 *       500:
 *         description: Internal server error
 */
router.get('/promociones', PromocionControlador.obtenerPromociones); // Get all active promotions

/**
 * @swagger
 * /promociones:
 *   post:
 *     summary: Create a new promotion
 *     tags: [Promotions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Promotion'
 *     responses:
 *       201:
 *         description: Promotion created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */
router.post('/promociones', PromocionControlador.crearPromocion); // Create a new promotion

/**
 * @swagger
 * /promociones/{id}:
 *   get:
 *     summary: Get promotion by ID
 *     tags: [Promotions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the promotion
 *     responses:
 *       200:
 *         description: Promotion details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Promotion'
 *       404:
 *         description: Promotion not found
 *       500:
 *         description: Internal server error
 */
router.get('/promociones/:id', PromocionControlador.obtenerPromocionPorId); // Get promotion by ID

/**
 * @swagger
 * /promociones/buscar/{q}:
 *   get:
 *     summary: Search promotions by filter
 *     tags: [Promotions]
 *     parameters:
 *       - in: path
 *         name: q
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query for promotions
 *     responses:
 *       200:
 *         description: List of promotions matching the search query
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Promotion'
 *       400:
 *         description: Invalid query
 *       500:
 *         description: Internal server error
 */
router.get('/promociones/buscar/:q', PromocionControlador.buscarPromocionesFiltro); // Search promotions by filter

/**
 * @swagger
 * /promociones/descargarExcel:
 *   get:
 *     summary: Download promotions in Excel format
 *     tags: [Promotions]
 *     responses:
 *       200:
 *         description: Excel file with promotions data
 *         content:
 *           application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
 *             schema:
 *               type: string
 *               format: binary
 *       500:
 *         description: Internal server error
 */
router.get('/promociones/descargarExcel', PromocionControlador.descargarPromocionesExcel); // Download promotions in Excel format

/**
 * @swagger
 * /promociones/{id}:
 *   put:
 *     summary: Update promotion by ID
 *     tags: [Promotions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the promotion to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Promotion'
 *     responses:
 *       200:
 *         description: Promotion updated successfully
 *       404:
 *         description: Promotion not found
 *       500:
 *         description: Internal server error
 */
router.put('/promociones/:id', PromocionControlador.actualizarPromocion); // Update promotion by ID

/**
 * @swagger
 * /promociones/{id}:
 *   delete:
 *     summary: Delete promotion by ID
 *     tags: [Promotions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the promotion to delete
 *     responses:
 *       200:
 *         description: Promotion deleted successfully
 *       404:
 *         description: Promotion not found
 *       500:
 *         description: Internal server error
 */
router.delete('/promociones/:id', PromocionControlador.borrarPromocion); // Delete promotion by ID

export default router;
