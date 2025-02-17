import mongoose from 'mongoose';

// Define the simplified CircuitStatus schema
const circuitStatusSchema = new mongoose.Schema({
    sensor: { type: String, required: true }, // Name of the sensor
    value: { type: String, required: true }, // Value reported by the sensor
    units: { type: String, required: true } // Units of the value (e.g., "V", "A", "°C")
});

// Create the CircuitStatus model
const CircuitStatus = mongoose.model('CircuitStatus', circuitStatusSchema);

class CircuitStatusService {
    // Find all circuit statuses
    static async findAll() {
        return await CircuitStatus.find({});
    }

    // Find a circuit status by ID
    static async findById(id) {
        return await CircuitStatus.findById(id);
    }

    // Update a circuit status
    static async update(id, data) {
        return await CircuitStatus.findByIdAndUpdate(
            id,
            data,
            { new: true } // Return the updated document
        );
    }


}

export default CircuitStatusService;