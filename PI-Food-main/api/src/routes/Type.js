const { Router } = require('express');
const { Recipe, Type } = require('../db');
const axios = require('axios')
const router = Router();
const { API_KEY } = process.env


module.exports =  router ;