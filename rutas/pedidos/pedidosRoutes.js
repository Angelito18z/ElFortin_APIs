import express from 'express';
import orderController from '../../controladores/pedidos/pedidosController.js'; // Update to reference the correct controller

const router = express.Router();

// Define routes for managing orders
router.get('/orders', orderController.getAllOrders); // Get all orders
router.post('/orders', orderController.createOrder); // Create a new order
router.get('/orders/search', orderController.searchAllColumns); // Search orders
router.get('/orders/excel', orderController.downloadOrdersExcel); // Download orders in Excel format
router.get('/orders/:id', orderController.getOrderById); // Get an order by ID
router.put('/orders/:id', orderController.updateOrder); // Update an order by ID
router.delete('/orders/:id', orderController.deleteOrder); // Delete an order by ID

export default router;
