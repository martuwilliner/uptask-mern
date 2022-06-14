import express from 'express';
import { registrar, autenticar, confirmar, olvidePassword,comprobarToken, nuevoPassword, perfil} from '../controllers/usuariosController.js';
import checkAuth from '../middlewares/checkAuth.js';

const router = express.Router();

// Autenticacion. Registro y Confirmacion de usuarios
router.post('/', registrar); // Crear un nuevo user
router.post('/login', autenticar) // Autenticar un user
router.get('/confirmar/:token', confirmar); // Confirmar un user
router.post('/olvide-password', olvidePassword); // Enviar email para restablecer password'

router.get('/perfil', checkAuth, perfil)

router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword);


export default router;