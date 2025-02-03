import runningConfigModel from "../../modelos/IoT/runningConfigModel.js";
import ExcelJS from "exceljs";

class RunningConfigController {
    // Get all runningConfig
    static async getAllRunningConfig(req, res) {
        try {
        const runningConfig = await runningConfigModel.findAll();
        return res.status(200).json({
            status: "success",
            message: "RunningConfig retrieved successfully",
            data: runningConfig,
        });
        } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message,
            stack:
            process.env.NODE_ENV === "development" ? error.stack : undefined, // Include stack trace in development only
        });
        }
    }
    
    // Create a new runningConfig
    static async createRunningConfig(req, res) {
        try {
        const runningConfig = await runningConfigModel.create(req.body);
        return res.status(201).json({
            status: "success",
            message: "RunningConfig created successfully",
            data: runningConfig,
        });
        } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message,
            stack:
            process.env.NODE_ENV === "development" ? error.stack : undefined,
        });
        }
    }
    
    // Find a runningConfig by id
    static async getRunningConfigById(req, res) {
        try {
        const runningConfig = await runningConfigModel.findById(req.params.id);
        if (!runningConfig) {
            return res.status(404).json({
            status: "error",
            message: "RunningConfig not found",
            });
        }
        return res.status(200).json({
            status: "success",
            message: "RunningConfig retrieved successfully",
            data: runningConfig,
        });
        } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message,
            stack:
            process.env.NODE_ENV === "development" ? error.stack : undefined,
        });
        }
    }
    
    // Update a runningConfig
    static async updateRunningConfig(req, res) {
        try {
        const runningConfig = await runningConfigModel.update(
            req.params.id,
            req.body
        );
        if (!runningConfig) {
            return res.status(404).json({
            status: "error",
            message: "RunningConfig not found",
            });
        }
        return res.status(200).json({
            status: "success",
            message: "RunningConfig updated successfully",
            data: runningConfig,
        });
        }
        catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message,
            stack:
            process.env.NODE_ENV === "development" ? error.stack : undefined,
        });
        }
    }

    // Delete a runningConfig
    static async deleteRunningConfig(req, res) {
        try {
        const runningConfig = await runningConfigModel.delete(req.params.id);
        if (!runningConfig) {
            return res.status(404).json({
            status: "error",
            message: "RunningConfig not found",
            });
        }
        return res.status(200).json({
            status: "success",
            message: "RunningConfig deleted successfully",
        });
        } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message,
            stack:
            process.env.NODE_ENV === "development" ? error.stack : undefined,
        });
        }
    }

    // Export runningConfig to Excel

    static async exportRunningConfigToExcel(req, res) {
        try {
            const runningConfig = await runningConfigModel.findAll();
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet("RunningConfig");
            worksheet.columns = [
                { header: "Name", key: "name", width: 30 },
                { header: "Value", key: "value", width: 30 },
                { header: "Description", key: "description", width: 30 },
                { header: "Unit", key: "unit", width: 30 },
                { header: "Created At", key: "created_at", width: 30 },
                { header: "Updated At", key: "updated_at", width: 30 },
            ];
            runningConfig.forEach((config) => {
                worksheet.addRow(config);
            });
            res.setHeader(
                "Content-Type",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            );
            res.setHeader(
                "Content-Disposition",
                "attachment; filename=" + "runningConfig.xlsx"
            );
            return workbook.xlsx.write(res).then(function () {
                res.status(200).end();
            });
        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: error.message,
                stack:
                process.env.NODE_ENV === "development" ? error.stack : undefined,
            });
        }
    }
}

export default RunningConfigController;