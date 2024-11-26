import Product from "../../modelos/productos/productModel.js";
import ExcelJS from 'exceljs';
import { uploadToCloudinaryProducts } from '../../config/cloudinary.js';

class ProductController {
  static async getAllProducts(req, res) {
    try {
      const products = await Product.findAll();
      res.json(products);
    } catch (error) {
      return res.status(500).json({
          status: 'error',
          message: error.message,
          stack: process.env.NODE_ENV === 'development' ? error.stack : undefined, // Include stack trace in development only
      });
    }
  }

  static async createProduct(req, res) {
    try {
      const { body } = req;
      const filePath = req.file?.path;  // Get the uploaded file path from multer

      const product = await Product.create(body, filePath);
      return res.status(201).json({
          status: 'success',
          message: 'Product created successfully',
          product

      });

  } catch (error) {
            console.error('Error creating product:', error);
            res.status(500).json({ message: 'Error del servidor', error: error.message });
        }
  }

  static async getProductById(req, res) {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
          return res.status(404).json({
              status: 'error',
              message: 'Product not found',
          });
      }
      return res.status(200).json({
          status: 'success',
          message: 'Product retrieved successfully',
          data: product,
      });
  } catch (error) {
      return res.status(500).json({
          status: 'error',
          message: error.message,
          stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      });
  }
  }

  static async updateProduct(req, res) {
    try {
        const { id } = req.params; // Get the product ID from the URL parameter
        const { body } = req; // Get the updated product data from the request body
        const filePath = req.file?.path;  // Get the uploaded file path from multer (if any)
        
        // Call the update method of the Product model, passing the product ID, updated data, and filePath
        const product = await Product.update(id, body, filePath);

        // If the product was not found, return a 404 error
        if (!product) {
            return res.status(404).json({
                status: 'error',
                message: 'Product not found',
            });
        }

        // Return the updated product in the response
        return res.status(200).json({
            status: 'success',
            message: 'Product updated successfully',
            data: product,
        });
    } catch (error) {
        // Handle errors and send a 500 response with the error message
        return res.status(500).json({
            status: 'error',
            message: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
        });
    }
}

  static async deleteProduct(req, res) {
    try {
      const product = await Product.delete(req.params.id);
      if (!product) {
          return res.status(404).json({
              status: 'error',
              message: 'Product not found',
          });
      }
      return res.status(200).json({
          status: 'success',
          message: 'Product deleted successfully',
          data: product,
      });
  } catch (error) {
      return res.status(500).json({
          status: 'error',
          message: error.message,
          stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      });
  }
  }

  static async searchAllColumns(req, res) { 
    try {
        const searchString = req.params.q;  // Cambiado a req.params
        if (!searchString) {
            return res.status(400).json({
                status: 'error',
                message: "Query parameter 'q' is required",
            });
        }
        const products = await Product.searchAllColumns(searchString);
        return res.status(200).json({
            status: 'success',
            message: 'Product retrieved successfully',
            data: products,
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
        });
    }
}


  static async downloadExcel(req, res) {
    try {
      const products = await Product.findAll();
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Products');

      worksheet.columns = [
        { header: 'Restaurant ID', key: 'restaurant_id', width: 15 },
        { header: 'Name', key: 'name', width: 30 },
        { header: 'Description', key: 'description', width: 50 },
        { header: 'Price', key: 'price', width: 10 },
        { header: 'Category Name', key: 'category_name', width: 20 },
        { header: 'Pre-Tax Cost', key: 'pre_tax_cost', width: 15 },
        { header: 'Post-Tax Cost', key: 'post_tax_cost', width: 15 }
      ];

      products.forEach(product => {
        worksheet.addRow(product);
      });

      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      );
      res.setHeader(
        'Content-Disposition',
        'attachment; filename=productos.xlsx'
      );

      await workbook.xlsx.write(res);
      res.end();
    } catch (error) {
      console.error('Error generating Excel file:', error);
      return res.status(500).json({
          status: 'error',
          message: 'Error generating Excel file',
          stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      });
  }
  }
}

export default ProductController;
