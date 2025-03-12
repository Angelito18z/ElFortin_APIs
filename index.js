import express from "express";
import cors from 'cors'; // Import CORS package
import bodyParser from "body-parser";
import dotenv from "dotenv"; // Load environment variables
import mongoose from "mongoose";
import { Client } from 'pg'; // PostgreSQL

dotenv.config();

const app = express();

// Enable CORS for all routes
app.use(cors());  // This enables CORS for all incoming requests

// Middleware to parse JSON requests
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 1. Conexión a PostgreSQL (Local)
const client = new Client({
  connectionString: process.env.DB_LOCAL_POSTGRES_CONNECTION,  // Asume que la URL está en el archivo .env
});
client.connect()
  .then(() => console.log('Conexión exitosa a PostgreSQL'))
  .catch((err) => console.error('Error al conectar con PostgreSQL', err));

// 2. Conexión a MongoDB Local
mongoose.connect(process.env.DB_LOCAL_MONGO_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conexión exitosa a MongoDB local'))
  .catch((err) => console.error('Error al conectar con MongoDB local', err));

// 3. Conexión a MongoDB Atlas
mongoose.connect(process.env.DB_ATLAS_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conexión exitosa a MongoDB Atlas'))
  .catch((err) => console.error('Error al conectar con MongoDB Atlas', err));

// Definir rutas y otros middlewares
// Aquí debes agregar tus rutas y middlewares, como en tu código original.

// Inicia el servidor
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export { app, server };
