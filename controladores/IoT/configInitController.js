import configInitModel from '../../modelos/IoT/configInitModel.js';
import ExcelJS from 'exceljs';

class ConfigInitController {
    // Get all configInit
    static async getAllConfigInit(req, res) {
        try {
            const configInit = await configInitModel.findAll();
            return res.status(200).json({
                status: 'success',
                message: 'ConfigInit retrieved successfully',
                data: configInit,
            });
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: error.message,
                stack: process.env.NODE_ENV === 'development' ? error.stack : undefined, // Include stack trace in development only
            });
        }
    }

    // Create a new configInit
    static async createConfigInit(req, res) {
        try {
            const configInit = await configInitModel.create(req.body);
            return res.status(201).json({
                status: 'success',
                message: 'ConfigInit created successfully',
                data: configInit,
            });
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: error.message,
                stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
            });
        }
    }

    // Find a configInit by id
    static async getConfigInitById(req, res) {
        try {
            const configInit = await configInitModel.findById(req.params.id);
            if (!configInit) {
                return res.status(404).json({
                    status: 'error',
                    message: 'ConfigInit not found',
                });
            }
            return res.status(200).json({
                status: 'success',
                message: 'ConfigInit retrieved successfully',
                data: configInit,
            });
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: error.message,
                stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
            });
        }
    }

    // Update a configInit
    static async updateConfigInit(req, res) {
        try {
            const configInit = await configInitModel.update(req.params.id, req.body);
            if (!configInit) {
                return res.status(404).json({
                    status: 'error',
                    message: 'ConfigInit not found',
                });
            }
            return res.status(200).json({
                status: 'success',
                message: 'ConfigInit updated successfully',
                data: configInit,
            });
        }
        catch (error) {
            return res.status(500).json({
                status: 'error',
                message: error.message,
                stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
            });
        }
    }

    // Soft delete a configInit
    static async deleteConfigInit(req, res) {
        try {
            const configInit = await configInitModel.delete(req.params.id);
            if (!configInit) {
                return res.status(404).json({
                    status: 'error',
                    message: 'ConfigInit not found',
                });
            }
            return res.status(200).json({
                status: 'success',
                message: 'ConfigInit deleted successfully',
                data: configInit,
            });
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: error.message,
                stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
            });
        }
    }

    // Export configInit to Excel

    static async exportConfigInitToExcel(req, res) {
        try {
            const configInit = await configInitModel.findAll();
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('ConfigInit');
            worksheet.columns = [
                { header: 'ID', key: '_id', width: 30 },
                { header: 'Name', key: 'name', width: 30 },
                { header: 'Value', key: 'value', width: 30 },
                { header: 'Description', key: 'description', width: 30 },
                { header: 'Unit', key: 'unit', width: 30 },
                { header: 'Created At', key: 'created_at', width: 30 },
                { header: 'Updated At', key: 'updated_at', width: 30 },
                { header: 'Deleted At', key: 'deleted_at', width: 30 },
            ];
            worksheet.addRows(configInit);
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', 'attachment; filename=configInit.xlsx');
            return workbook.xlsx.write(res)
                .then(function () {
                    res.status(200).end();
                });
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: error.message,
                stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
            });
        }
    }
}

export default ConfigInitController;