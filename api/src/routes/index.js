const { Router } = require('express');
const recipeRoutes = require('./Recipe');
const typeRoutes = require('./Type')
const express = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = express.Router();

router.use(express.json());

router.use('/recipes', recipeRoutes);
router.use('/types', typeRoutes);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports =  router ;
