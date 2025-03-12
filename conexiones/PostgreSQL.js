import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connectPostgresDB = async () => {
  const client = new Client({
    connectionString: process.env.DB_LOCAL_POSTGRES_CONNECTION, // Define la URI de conexión en el archivo .env
  });

  try {
    await client.connect();
    console.log('Conexión exitosa a PostgreSQL local');
  } catch (error) {
    console.error('Error al conectar con PostgreSQL local:', error);
  }

  return client;
};

export default connectPostgresDB;
