const { Router } = require('express');
const { Recipe, Type } = require('../db');
const axios = require('axios')
const router = Router();
const { API_KEY } = process.env

// [ ] GET /diets:
// Obtener todos los tipos de dieta posibles
// En una primera instancia, cuando no exista ninguno, deberán precargar la base de datos con los tipos de datos indicados por spoonacular acá
router.get('/', async (req, res) =>{
    const allTypes = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
    const mapTypes = await allTypes.data.results.map(e => e.diets)
    const findCreate = await mapTypes.map(  (e) => {
        e.forEach(async (el) => {
            return await Type.findOrCreate({
                where: {name: el}
            })
        });
    })
    if(findCreate){
        const findAllTypes = await Type.findAll()
        return res.status(202).json(findAllTypes)
    }
})

module.exports =  router ;