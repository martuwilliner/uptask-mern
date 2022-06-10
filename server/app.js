/* const express = require('express'); */
import express from 'express';
import dotenv from "dotenv";
import conectarDB from './config/database.js';
import usuarios from './routes/usuarios.js';

const app = express();

dotenv.config();

conectarDB();


// Routes
app.use('/api/usuarios', usuarios);


// Localhost
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});