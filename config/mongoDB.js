import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); 

// MONGO_URI=mongodb://<username>:<password>@<host>:<port>/<database>
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/PanaderiaElFortin'); // No need for the deprecated options anymore
        console.log('✅ MongoDB connected successfully');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1); 
    }
};

export default connectDB;
