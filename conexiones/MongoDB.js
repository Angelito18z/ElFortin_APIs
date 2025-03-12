import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectLocalDB = async () => {
  try {
    await mongoose.connect(process.env.DB_LOCAL_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conexión exitosa a MongoDB local');
  } catch (error) {
    console.error('Error al conectar con MongoDB local:', error);
  }
};

export default connectLocalDB;
