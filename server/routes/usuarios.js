import express from 'express';
import { registrar, autenticar } from '../controllers/usuariosController.js';
const router = express.Router();

// Autenticacion. Registro y Confirmacion de usuarios
router.post('/', registrar); // Crear un nuevo user
router.post('/login', autenticar) // Autenticar un user




export default router;