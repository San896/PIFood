const { Router } = require('express');
const { Type } = require('../db');
const axios = require('axios')
const router = Router();
const { API_KEY } = process.env


// [ ] GET /diets:


// Obtener todos los tipos de dieta posibles
// En una primera instancia, cuando no exista ninguno, deberán precargar la base de datos con los tipos de datos indicados por spoonacular acá

router.get('/', async (req, res) =>{
    const allTypes = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
    const mapTypes = await allTypes.data.results.map(e => e.diets)

    const findCreate = mapTypes.map(  async (arr) => {
        arr.forEach(async (el) => {
            await Type.findOrCreate({
                where: {name: el}
            })
        });
    })

    const findAllDb = await Type.findAll()
    const mapAll = findAllDb.map( e => e.name)
    

    if(mapAll){
        res.status(202).send(mapAll)
        }else{
            res.status(404).send('failed types')
        }
        
})

module.exports =  router ;