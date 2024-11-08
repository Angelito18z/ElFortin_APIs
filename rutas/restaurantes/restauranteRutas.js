import express from 'express';
import RestauranteControlador from '../../controladores/restaurantes/restauranteControlador.js';

const router = express.Router();

router.get('/restaurantes/buscar/:q', RestauranteControlador.buscarRestaurantesFiltro);
router.get('/restaurantes/descargarExcel', RestauranteControlador.descargarRestaurantesExcel);
router.get('/restaurantes/:id', RestauranteControlador.obtenerRestaurantePorId);

router.get('/restaurantes', RestauranteControlador.obtenerRestaurantes);
router.post('/restaurantes', RestauranteControlador.crearRestaurante);
router.put('/restaurantes/:id', RestauranteControlador.actualizarRestaurante);
router.delete('/restaurantes/:id', RestauranteControlador.borrarRestaurante);

export default router;
