import express from 'express';
import OrderController from '../../controladores/pedidos/pedidosController.js'; // Update to reference the correct controller

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: API for managing orders
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Retrieve all orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: List of all orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       500:
 *         description: Internal server error
 */
router.get('/orders', OrderController.getAllOrders); // Get all orders

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: Order created successfully
 *       500:
 *         description: Internal server error
 */
router.post('/orders', OrderController.createOrder); // Create a new order


/**
 * @swagger
 * /orders/customer/{customerName}:
 *   get:
 *     summary: Retrieve orders by customer name
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: customerName
 *         schema:
 *           type: string
 *         required: true
 *         description: Name of the customer whose orders to retrieve
 *     responses:
 *       200:
 *         description: Orders retrieved successfully
 *       404:
 *         description: Orders not found for the given customer
 *       500:
 *         description: Internal server error
 */
router.get('/orders/customer/:customerName', OrderController.getOrdersByCustomerName); // Get orders by customer name


/**
 * @swagger
 * /orders/search:
 *   get:
 *     summary: Search for orders
 *     tags: [Orders]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query for orders
 *     responses:
 *       200:
 *         description: List of orders matching the search query
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       400:
 *         description: Query parameter 'q' is required
 *       500:
 *         description: Internal server error
 */
router.get('/orders/search', OrderController.searchAllColumns); // Search orders

/**
 * @swagger
 * /orders/excel:
 *   get:
 *     summary: Download all orders in Excel format
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Excel file containing all orders
 *         content:
 *           application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
 *             schema:
 *               type: string
 *               format: binary
 *       500:
 *         description: Internal server error
 */
router.get('/orders/excel', OrderController.downloadOrdersExcel); // Download orders in Excel format

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Retrieve an order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the order to retrieve
 *     responses:
 *       200:
 *         description: Order details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */
router.get('/orders/:id', OrderController.getOrderById); // Get an order by ID

/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: Update an existing order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the order to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       200:
 *         description: Order updated successfully
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */
router.put('/orders/:id', OrderController.updateOrder); // Update an order by ID





/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Delete an order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the order to delete
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */
router.delete('/orders/:id', OrderController.deleteOrder); // Delete an order by ID





export default router;
