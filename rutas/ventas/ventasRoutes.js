import express from 'express';
import VentaControlador from '../../controladores/ventas/ventasController.js';

const router = express.Router();


router.get('/ventas/descargarExcel', VentaControlador.descargarVentasExcel);

// Obtener todas las ventas (protección opcional según necesidad)
router.get('/ventas', VentaControlador.obtenerVentas);

// Crear una nueva venta (protegida por autenticación)
router.post('/ventas',   VentaControlador.crearVenta);

// Obtener una venta por ID  
router.get('/ventas/:id',   VentaControlador.obtenerVentaPorId);

// Actualizar una venta por ID  
router.put('/ventas/:id',   VentaControlador.actualizarVenta);

// Eliminar una venta por ID  
router.delete('/ventas/:id',   VentaControlador.borrarVenta);


router.get('/ventas/buscar/:q', VentaControlador.buscarVentasFiltro);


export default router;
