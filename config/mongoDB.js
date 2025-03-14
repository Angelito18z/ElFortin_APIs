// conexiones/MongoDB.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Cargar las variables de entorno

const connectMongoDB = async () => {
  try {
    const localDbUri = process.env.DB_LOCAL_URI;  // Obtén la URI de MongoDB local
    const atlasDbUri = process.env.DB_ATLAS_CONNECTION; // Obtén la URI de MongoDB Atlas

    if (!localDbUri || !atlasDbUri) {
      throw new Error('Faltan las URIs de las bases de datos MongoDB en las variables de entorno');
    }

    // Conectarse primero a MongoDB local
    await mongoose.connect(localDbUri); 
    console.log('✅ Conexión exitosa a MongoDB (Local)');
    
    // Luego conectarse a MongoDB Atlas usando la misma instancia de Mongoose
    mongoose.createConnection(atlasDbUri);
    console.log('✅ Conexión exitosa a MongoDB (Atlas)');

  } catch (err) {
    console.error('❌ Error al conectar con MongoDB:', err.stack);
  }
};

export default connectMongoDB;
