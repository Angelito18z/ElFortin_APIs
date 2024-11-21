import express from "express";
import cors from 'cors'; // Import CORS package
import proveedorRutas from './rutas/proveedores/proveedorRuta.js'; // Other imports...
import orderRoutes from './rutas/pedidos/pedidosRoutes.js';
import restauranteRutas from './rutas/restaurantes/restauranteRutas.js';
import promocionRutas from './rutas/promociones/promocionRuta.js';
import ventaRutas from './rutas/ventas/ventasRoutes.js';
import productoRutas from './rutas/productos/productRoutes.js';
import usuarioRutas from "./rutas/usuarios/usuariosRutas.js";
import { swaggerDocs, swaggerUi } from "./config/swagger.js"; 

import dotenv from "dotenv"; // Load environment variables
dotenv.config();

const app = express();

// Enable CORS for all routes
app.use(cors());  // This enables CORS for all incoming requests

// Middleware to parse JSON requests
app.use(express.json());

// Define routes
app.use("/api", proveedorRutas);
app.use("/api", orderRoutes);
app.use("/api", restauranteRutas);
app.use("/api", promocionRutas);
app.use("/api", ventaRutas);
app.use("/api", productoRutas);
app.use("/api", usuarioRutas);

// Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Start the server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export { app, server };
