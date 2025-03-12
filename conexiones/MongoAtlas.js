import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectAtlasDB = async () => {
  try {
    await mongoose.connect(process.env.DB_ATLAS_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conexión exitosa a MongoDB Atlas');
  } catch (error) {
    console.error('Error al conectar con MongoDB Atlas:', error);
  }
};

export default connectAtlasDB;
