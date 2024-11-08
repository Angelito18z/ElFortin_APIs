import express from "express";
import ProductController from "../../controladores/productos/productController.js";
const router = express.Router();

router.get('/products', ProductController.getAllProducts);
router.get('/products/:id', ProductController.getProductById);
router.post('/products', ProductController.createProduct);
router.put('/products/:id', ProductController.updateProduct);
router.delete('/products/:id', ProductController.deleteProduct);
router.get('/products/search/:q', ProductController.searchAllColumns);
router.get('/products/download/excel', ProductController.downloadExcel);

export default router;
