import express from 'express';
import { registrar, autenticar, confirmar, olvidePassword,comprobarToken } from '../controllers/usuariosController.js';
const router = express.Router();

// Autenticacion. Registro y Confirmacion de usuarios
router.post('/', registrar); // Crear un nuevo user
router.post('/login', autenticar) // Autenticar un user
router.get('/confirmar/:token', confirmar); // Confirmar un user
router.post('/olvide-password', olvidePassword); // Enviar email para restablecer password'
router.get('/olvide-password/:token', comprobarToken); // Restablecer password


export default router;