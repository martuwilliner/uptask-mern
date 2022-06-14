/* const express = require('express'); */
import express from 'express';
import dotenv from "dotenv";
import conectarDB from './config/database.js';
import usuarios from './routes/usuarios.js';
import proyectos from './routes/proyectoRoutes.js';

const app = express();

//leer archivos json
app.use(express.json());


dotenv.config();

conectarDB();


// Routes
app.use('/api/usuarios', usuarios);
app.use('/api/proyectos', proyectos);


// Localhost
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});