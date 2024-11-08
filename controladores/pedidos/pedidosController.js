import Order from '../../modelos/pedidos/pedidosModelo.js';
import ExcelJS from 'exceljs';

class OrderController {
    // Get all orders
    static async getAllOrders(req, res) {
        try {
            const orders = await Order.findAll();
            return res.status(200).json({
                status: 'success',
                message: 'Orders retrieved successfully',
                data: orders,
            });
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: error.message,
                stack: process.env.NODE_ENV === 'development' ? error.stack : undefined, // Include stack trace in development only
            });
        }
    }

    // Create a new order
    static async createOrder(req, res) {
        try {
            const order = await Order.create(req.body);
            return res.status(201).json({
                status: 'success',
                message: 'Order created successfully',
                data: order,
            });
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: error.message,
                stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
            });
        }
    }

    // Find an order by id
    static async getOrderById(req, res) {
        try {
            const order = await Order.findById(req.params.id);
            if (!order) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Order not found',
                });
            }
            return res.status(200).json({
                status: 'success',
                message: 'Order retrieved successfully',
                data: order,
            });
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: error.message,
                stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
            });
        }
    }

    // Update an order
    static async updateOrder(req, res) {
        try {
            const order = await Order.update(req.params.id, req.body);
            if (!order) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Order not found',
                });
            }
            return res.status(200).json({
                status: 'success',
                message: 'Order updated successfully',
                data: order,
            });
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: error.message,
                stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
            });
        }
    }

    // Delete an order
    static async deleteOrder(req, res) {
        try {
            const order = await Order.delete(req.params.id);
            if (!order) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Order not found',
                });
            }
            return res.status(200).json({
                status: 'success',
                message: 'Order deleted successfully',
                data: order,
            });
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: error.message,
                stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
            });
        }
    }

    // Search orders by a reference that it contains
    static async searchAllColumns(req, res) {
        try {
            const searchString = req.query.q;
            if (!searchString) {
                return res.status(400).json({
                    status: 'error',
                    message: "Query parameter 'q' is required",
                });
            }
            const orders = await Order.searchAllColumns(searchString);
            return res.status(200).json({
                status: 'success',
                message: 'Orders retrieved successfully',
                data: orders,
            });
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: error.message,
                stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
            });
        }
    }

    // Get all orders in excel format
    static async downloadOrdersExcel(req, res) {
        try {
            const orders = await Order.findAll();

            // Create a new workbook and worksheet
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Orders');

            // Define the columns for the Excel sheet
            worksheet.columns = [
                { header: 'Table Number', key: 'table_number', width: 15 },
                { header: 'Restaurant ID', key: 'restaurant_id', width: 15 },
                { header: 'Total Amount', key: 'total_amount', width: 15 },
                { header: 'Client ID', key: 'client_id', width: 15 },
                { header: 'Pre-Tax Total', key: 'pre_tax_total', width: 15 },
                { header: 'Post-Tax Total', key: 'post_tax_total', width: 15 },
                { header: 'Order Type', key: 'order_type', width: 15 },
                { header: 'Created At', key: 'created_at', width: 20 },
            ];

            // Add each order to the worksheet
            orders.forEach(order => {
                worksheet.addRow(order);
            });

            // Set response headers for Excel download
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', 'attachment; filename=orders.xlsx');

            // Write the workbook to the response
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

// Export the controller
export default OrderController;
