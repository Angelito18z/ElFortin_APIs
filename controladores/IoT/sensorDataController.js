import SensorDataService from '../../modelos/IoT/sensorData.js';

class SensorDataController {
    // Get all sensor data
    static async getAllSensorData(req, res) {
        try {
            const sensorData = await SensorDataService.findAll();
            return res.status(200).json({
                status: 'success',
                message: 'Sensor data retrieved successfully',
                data: sensorData,
            });
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: error.message,
                stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
            });
        }
    }

    // Find sensor data by ID
    static async getSensorDataById(req, res) {
        try {
            const sensorData = await SensorDataService.findById(req.params.id);
            console.log(req.params.id);

            if (!sensorData) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Sensor data not found',
                });
            }
            return res.status(200).json({
                status: 'success',
                message: 'Sensor data retrieved successfully',
                data: sensorData,
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

export default SensorDataController;