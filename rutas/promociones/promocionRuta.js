import express from "express";
import PromocionControlador from "../../controladores/promociones/promocionControlador.js";

const router = express.Router();

router.get('/promociones/buscar/:q',PromocionControlador.buscarPromocionesFiltro);
router.get('/promociones/descargarExcel',PromocionControlador.descargarPromocionesExcel);
router.get('/promociones/:id',PromocionControlador.obtenerPromocionPorId);

router.get('/promociones',PromocionControlador.obtenerPromociones);
router.post('/promociones',PromocionControlador.crearPromocion);
router.put('/promociones/:id',PromocionControlador.actualizarPromocion);
router.delete('/promociones/:id',PromocionControlador.borrarPromocion);

export default router;