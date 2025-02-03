import mongoose from 'mongoose';

const configInitSchema = new mongoose.Schema({
    name: { type: String, required: true },
    value: { type: String, required: true },
    description: { type: String },
    unit: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, default: null }
});

const ConfigInit = mongoose.model('configInit', configInitSchema);

class ConfigInitService {
    // Find all configInit
    static async findAll() {
        return await ConfigInit.find({ deleted_at: null });
    }

    // Create a new configInit
    static async create(data) {
        const newConfigInit = new ConfigInit(data);
        return await newConfigInit.save();
    }

    // Find a configInit by id
    static async findById(id) {
        return await ConfigInit.findOne({ _id: id, deleted_at: null });
    }

    // Update a configInit
    static async update(id, data) {
        data.updated_at = new Date();  // Update the timestamp
        return await ConfigInit.findOneAndUpdate(
            { _id: id, deleted_at: null },
            data,
            { new: true }
        );
    }

    // Soft delete a configInit
    static async delete(id) {
        return await ConfigInit.findOneAndUpdate(
            { _id: id },
            { deleted_at: new Date() },
            { new: true }
        );
    }
}

export default ConfigInitService;
