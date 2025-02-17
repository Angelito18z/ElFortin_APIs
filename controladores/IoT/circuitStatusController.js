import CircuitStatusService from '../../modelos/IoT/circuitStatus.js';
import mongoose from 'mongoose'; // Import mongoose for ObjectId validation

class CircuitStatusController {
    // Get all circuit statuses
    static async getAllCircuitStatus(req, res) {
        try {
            const circuitStatus = await CircuitStatusService.findAll();
            return res.status(200).json({
                status: 'success',
                message: 'CircuitStatus retrieved successfully',
                data: circuitStatus,
            });
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: error.message,
                stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
            });
        }
    }

    // Find a circuit status by ID
    static async getCircuitStatusById(req, res) {
        const { id } = req.params;

        // Validate the ObjectId format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid ObjectId format',
            });
        }

        try {
            const circuitStatus = await CircuitStatusService.findById(id);
            if (!circuitStatus) {
                return res.status(404).json({
                    status: 'error',
                    message: 'CircuitStatus not found',
                });
            }
            return res.status(200).json({
                status: 'success',
                message: 'CircuitStatus retrieved successfully',
                data: circuitStatus,
            });
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: error.message,
                stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
            });
        }
    }

    // Update a circuit status
    static async updateCircuitStatus(req, res) {
        const { id } = req.params;

        // Validate the ObjectId format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid ObjectId format',
            });
        }

        try {
            const circuitStatus = await CircuitStatusService.update(id, req.body);
            if (!circuitStatus) {
                return res.status(404).json({
                    status: 'error',
                    message: 'CircuitStatus not found',
                });
            }
            return res.status(200).json({
                status: 'success',
                message: 'CircuitStatus updated successfully',
                data: circuitStatus,
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

export default CircuitStatusController;
