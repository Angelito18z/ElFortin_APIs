import mongoose from 'mongoose';

const sensorDataSchema = new mongoose.Schema({
    Sensor: { type: String, required: true },
    value: { type: Number, required: true },
    meassure: { type: String }
});

const SensorData = mongoose.model('SensorData', sensorDataSchema);

class SensorDataService {
    // Find all sensor data entries
    static async findAll() {
        return await SensorData.find();
    }

    // Find a sensor data entry by id
    static async findById(id) {
        return await SensorData.findOne({ _id: id });
    }


}

export default SensorDataService;
