// index.js
import express from "express";
import cors from 'cors';
import proveedorRutas from './rutas/proveedores/proveedorRuta.js';
import orderRoutes from './rutas/pedidos/pedidosRoutes.js';
import restauranteRutas from './rutas/restaurantes/restauranteRutas.js';
import promocionRutas from './rutas/promociones/promocionRuta.js';
import ventaRutas from './rutas/ventas/ventasRoutes.js';
import productoRutas from './rutas/productos/productRoutes.js';
import usuarioRutas from "./rutas/usuarios/usuariosRutas.js";
import { swaggerDocs, swaggerUi } from "./config/swagger.js"; 
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectMongoDB from "./config/MongoDB.js";
import configInitRutas from "./rutas/IoT/configInitRoutes.js";
import dataRutas from "./rutas/IoT/dataRoutes.js";

dotenv.config();
console.log(process.env.MONGO_URI);
const app = express();

// Habilitar CORS para todas las rutas
app.use(cors());

// Conectar a las bases de datos
connectMongoDB();     // Conexión a MongoDB Local

// Middleware para analizar las solicitudes JSON
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Definir rutas
app.use("/api", proveedorRutas);
app.use("/api", orderRoutes);
app.use("/api", restauranteRutas);
app.use("/api", promocionRutas);
app.use("/api", ventaRutas);
app.use("/api", productoRutas);
app.use("/api", usuarioRutas);
app.use("/api", configInitRutas);
app.use("/api", dataRutas);

// Swagger Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

export { app, server };
