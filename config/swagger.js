import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { UserInputSchema, PromotionSchema, DetalleVentaSchema, DiscountSchema, OrderSchema, ProductSchema, RestaurantSchema, SupplierSchema, UserSchema  } from './schemas.js';
import dotenv from 'dotenv';
import User from '../modelos/usuarios/usuariosModel.js';
dotenv.config(); // Cargar variables de entorno primero

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
        url: `${process.env.SWAGGER_PRODUCCION}/api`,
        description: "Servidor local",
      },
      {
        url: `${process.env.SWAGGER_PRODUCCION}/api`,
        description: "Servidor de producción",
      },
    ],
    components: {
      schemas: {
        Order: OrderSchema,
        Product: ProductSchema,
        Discount: DiscountSchema,
        Supplier: SupplierSchema,
        Restaurant: RestaurantSchema,
        User: UserSchema,
        DetalleVenta: DetalleVentaSchema,
        Promotion: PromotionSchema,
        UserInput: UserInputSchema,
      },
    },
  },
  apis: ["./rutas/**/*.js"],
};
  

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Exporta ambos objetos
export { swaggerDocs, swaggerUi };
