import express from "express";
import ProveedorControlador from "../../controladores/proveedores/proveedorControlador.js";

const router = express.Router();

router.get('/proveedores/buscar/:q', ProveedorControlador.buscarProveedoresFiltro);
router.get('/proveedores/descargarExcel', ProveedorControlador.descargarProveedoresExcel);
router.get('/proveedores/:id', ProveedorControlador.obtenerProveedorPorId);

router.get('/proveedores', ProveedorControlador.obtenerProveedores);
router.post('/proveedores', ProveedorControlador.crearProveedor);
router.put('/proveedores/:id', ProveedorControlador.actualizarProveedor);
router.delete('/proveedores/:id', ProveedorControlador.borrarProveedor);

export default router;