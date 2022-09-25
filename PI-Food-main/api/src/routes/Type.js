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

    const findCreate = await mapTypes.map(  async (arr) => {
        arr.forEach(async (el) => {
             await Type.findOrCreate({
                where: {name: el}
            })
        });
    })
    if(findCreate){
        res.status(202).send(findCreate)
        }else{
            res.status(404).send('failed types')
        }
        

        
        // const findAllTypes = await Type.findAll()
        // const mapFind = findAllTypes.map(e => e.dataValues.name)

        // if(!mapFind.length){
        //     return res.status(404).send('error diets not found')
        // }

        // return res.status(202).json(mapFind)
})

module.exports =  router ;