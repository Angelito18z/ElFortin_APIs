import  express from 'express';
import  AutenticationController from '../../controladores/usuarios/authenticationController.js';

const  router = express.Router();

router.get("usuarios/descargarExcel", AutenticationController.descargarUsuariosExcel);
router.get('/login', AutenticationController.getUserByCredencials);
router.get('/usuarios', AutenticationController.getAllUsers);
router.get('/usuarios/:id', AutenticationController.getUserById);
router.post('/usuarios', AutenticationController.createUser);
router.put('/usuarios/:id', AutenticationController.updateUser);
router.delete('/usuarios/:id', AutenticationController.deleteUser);

export default router;