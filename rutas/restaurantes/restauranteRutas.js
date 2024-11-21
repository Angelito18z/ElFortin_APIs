import express from 'express';
import RestauranteControlador from '../../controladores/restaurantes/restauranteControlador.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Restaurants
 *   description: API for managing restaurants
 */

/**
 * @swagger
 * /restaurantes/buscar/{q}:
 *   get:
 *     summary: Search restaurants by query
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: q
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query for restaurant names or descriptions
 *     responses:
 *       200:
 *         description: List of restaurants matching the search query
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Restaurant'
 */
router.get('/restaurantes/buscar/:q', RestauranteControlador.buscarRestaurantesFiltro); // Search restaurants by query

/**
 * @swagger
 * /restaurantes/descargarExcel:
 *   get:
 *     summary: Download restaurants in Excel format
 *     tags: [Restaurants]
 *     responses:
 *       200:
 *         description: Excel file with restaurant information
 *         content:
 *           application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
 *             schema:
 *               type: string
 *               format: binary
 */
router.get('/restaurantes/descargarExcel', RestauranteControlador.descargarRestaurantesExcel); // Download restaurants in Excel format

/**
 * @swagger
 * /restaurantes/{id}:
 *   get:
 *     summary: Get a restaurant by ID
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Restaurant ID
 *     responses:
 *       200:
 *         description: Restaurant details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Restaurant'
 *       404:
 *         description: Restaurant not found
 */
router.get('/restaurantes/:id', RestauranteControlador.obtenerRestaurantePorId); // Get restaurant by ID

/**
 * @swagger
 * /restaurantes:
 *   get:
 *     summary: Get all restaurants
 *     tags: [Restaurants]
 *     responses:
 *       200:
 *         description: List of all restaurants
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Restaurant'
 */
router.get('/restaurantes', RestauranteControlador.obtenerRestaurantes); // Get all restaurants

/**
 * @swagger
 * /restaurantes:
 *   post:
 *     summary: Create a new restaurant
 *     tags: [Restaurants]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Restaurant'
 *     responses:
 *       201:
 *         description: Restaurant created successfully
 */
router.post('/restaurantes', RestauranteControlador.crearRestaurante); // Create a new restaurant

/**
 * @swagger
 * /restaurantes/{id}:
 *   put:
 *     summary: Update a restaurant by ID
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Restaurant ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Restaurant'
 *     responses:
 *       200:
 *         description: Restaurant updated successfully
 *       404:
 *         description: Restaurant not found
 */
router.put('/restaurantes/:id', RestauranteControlador.actualizarRestaurante); // Update restaurant by ID

/**
 * @swagger
 * /restaurantes/{id}:
 *   delete:
 *     summary: Delete a restaurant by ID
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Restaurant ID
 *     responses:
 *       200:
 *         description: Restaurant deleted successfully
 *       404:
 *         description: Restaurant not found
 */
router.delete('/restaurantes/:id', RestauranteControlador.borrarRestaurante); // Delete restaurant by ID

export default router;
