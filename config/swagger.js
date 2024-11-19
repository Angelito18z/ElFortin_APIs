import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { OrderSchema, ProductSchema  } from './schemas.js';

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Restaurante",
      version: "1.0.0",
      description: "Documentación de la API para el restaurante",
      contact: {
        name: "Soporte Técnico",
        email: "soporte@restaurante.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000/api",
        description: "Servidor local",
      },
    ],
    components: {
      schemas: {
        Order: OrderSchema,
        Product: ProductSchema,
      },
    },
  },
  apis: ["./rutas/**/*.js"],
};
  

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Exporta ambos objetos
export { swaggerDocs, swaggerUi };
