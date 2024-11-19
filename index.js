import express from "express"; // Importa el framework Express
import proveedorRutas from './rutas/proveedores/proveedorRuta.js'; // Importa las rutas de productos
import orderRoutes from './rutas/pedidos/pedidosRoutes.js';
import restauranteRutas from './rutas/restaurantes/restauranteRutas.js';
import promocionRutas from './rutas/promociones/promocionRuta.js';
import ventaRutas from './rutas/ventas/ventasRoutes.js';
import productoRutas from './rutas/productos/productRoutes.js';
import usuarioRutas from "./rutas/usuarios/usuariosRutas.js";
import { swaggerDocs, swaggerUi } from "./config/swagger.js"; 

import dotenv from "dotenv"; // Carga las variables de entorno desde el archivo .env
dotenv.config();

const app = express(); // Crea una instancia de la aplicación Express
app.use(express.json()); // Middleware para parsear el cuerpo de las solicitudes JSON

// Usa las rutas de productos con el prefijo "/api"
app.use("/api", proveedorRutas);
app.use("/api", orderRoutes);
app.use("/api", restauranteRutas);
app.use("/api", promocionRutas);
app.use("/api", ventaRutas);
app.use("/api", productoRutas);
app.use("/api", usuarioRutas);

// Documentación Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs)); // Ruta para acceder a la documentación
// Inicia el servidor y escucha en el puerto definido
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`); // Muestra un mensaje en la consola indicando que el servidor está corriendo
});

export { app, server };