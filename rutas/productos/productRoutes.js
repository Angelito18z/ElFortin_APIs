import express from "express";
import upload from '../../config/multer.js'; // Adjust the path based on your folder structure
import ProductController from "../../controladores/productos/productController.js"; // Update to reference the correct controller
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API for managing products
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier of the product
 *         name:
 *           type: string
 *           description: Name of the product
 *         description:
 *           type: string
 *           description: Detailed description of the product
 *         price:
 *           type: number
 *           format: float
 *           description: Price of the product
 *         category_name:
 *           type: int
 *           description: Name of the product's category
 *         pre_tax_cost:
 *           type: number
 *           format: float
 *           description: Cost of the product before tax
 *         post_tax_cost:
 *           type: number
 *           format: float
 *           description: Cost of the product after tax
 *     ProductInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *           format: float
 *         category_name:
 *           type: int
 *         pre_tax_cost:
 *           type: number
 *           format: float
 *         post_tax_cost:
 *           type: number
 *           format: float
 *         image:
 *           type: string
 *           format: binary
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of all products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/products', ProductController.getAllProducts); // Get all products

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */
router.get('/products/:id', ProductController.getProductById); // Get a product by ID

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       201:
 *         description: Product created successfully
 *       500:
 *         description: Server error
 */
router.post('/products', upload.single('image'), ProductController.createProduct); // Create a new product

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.put('/products/:id', upload.single('image'), ProductController.updateProduct); // Update a product by ID

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.delete('/products/:id', ProductController.deleteProduct); // Delete a product by ID

/**
 * @swagger
 * /products/search/{q}:
 *   get:
 *     summary: Search products by query
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: q
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query for product names or descriptions
 *     responses:
 *       200:
 *         description: List of products matching the search query
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid query parameter
 *       500:
 *         description: Server error
 */
router.get('/products/search/:q', ProductController.searchAllColumns); // Search products by query

/**
 * @swagger
 * /products/download/excel:
 *   get:
 *     summary: Download products in Excel format
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Excel file with products
 *         content:
 *           application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
 *             schema:
 *               type: string
 *               format: binary
 *       500:
 *         description: Server error
 */
router.get('/products/download/excel', ProductController.downloadExcel); // Download products in Excel format

export default router;
