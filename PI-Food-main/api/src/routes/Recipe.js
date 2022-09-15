const { Router } = require('express');
const { Recipe, Type } = require('../db');
const axios = require('axios');
const router = Router();
const { API_KEY } = process.env
require("dotenv").config(); // ver para que eera
const { Op } = require("sequelize");


// GET https://api.spoonacular.com/recipes/complexSearch
// Para obtener mayor información sobre las recetas, como por ejemplo el tipo de dieta deben agregar el flag &addRecipeInformation=true a este endpoint
// Para los tipos de dieta deben tener en cuenta las propiedades vegetarian, vegan, glutenFree por un lado y también analizar las que se incluyan dentro de la propiedad diets
// GET https://api.spoonacular.com/recipes/{id}/information


// [ ] GET /recipes?name="...":
// Obtener un listado de las recetas que contengan la palabra ingresada como query parameter
// Si no existe ninguna receta mostrar un mensaje adecuado

const searchName = async (name) => { 
       const getApi = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=30`)
       const filtResults = getApi.data.results.filter(e => e.title.toLowerCase().includes(name.toLowerCase()))
       const e = filtResults[0]
       if(filtResults.length === 0){
           return new Error('name does not exist in api')
    }
    const filtObj = [{
        id: e.id,
        name: e.title,
        img: e.image,
        plateType: e.dishTypes,
        diets: e.diets,
        resume: e.summary,
        healthScore: e.healthScore,
        stepByStep: e.analyzedInstructions[0]?.steps.map(el => el),
    }]
  
    return filtObj
}

const searchNameDb = async (name) => {
    const getDb = await Recipe.findAll({
        where: { name: {[Op.iLike]: `%${name}%`} }, include: [{model: Type }] 
    });
    if(getDb.length > 0) {
        const filtDb = getDb.map(el=> el.dataValues)
        
        return filtDb
    }
}

const searchNameAll = async (name) => {
    try {      
    const api =  await searchName(name)   
    const db =  await searchNameDb(name)  
    const all = await Promise.all([api, db])

        return all

    } catch (e) {
        return e 
    }
    
}
// cambiar cantidad a 100 para presentar !!
const allFromApi = async () => { 
    const getAllApi = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=30`)

    const aux =  getAllApi.data.results
    const mapAux = await aux.map(e => {
        const obj = {
            id: e.id,
            name: e.title,
            img: e.image,
            plateType: e.dishTypes,
            diets: e.diets,
            resume: e.summary,
            healthScore: e.healthScore,
            stepByStep: e.analyzedInstructions[0]?.steps.map(el => el),
        }
        return obj
})

    if(mapAux){
        
        return mapAux
    }
    throw new Error('error en allfromapi')
}


const allFromDb = async () => {
    const allDb = await Recipe.findAll({
        include: Type,
    })
    if(allDb){
        return allDb
    }
    throw new Error('error en allfromdb')
}

const allFromAll = async () => {
    const apiAll = await allFromApi()
    const dbAll = await allFromDb()
    const joinAll = await apiAll.concat(dbAll)
    if(joinAll){
        return joinAll
    }
    throw new Error('error en allfromall')
}


router.get('/', async (req, res) =>{
    const { name } = req.query
    try {
        if(name){
            const tryAll = await searchNameAll(name)
            return res.status(202).json(tryAll)
        }
        const allAll = await allFromAll()
        return res.json(allAll)
    } catch (e) {
        res.status(404).send(e)
    }
})


// [ ] GET /recipes/{idReceta}:
// Obtener el detalle de una receta en particular
// Debe traer solo los datos pedidos en la ruta de detalle de receta
// Incluir los tipos de dieta asociados
const getIdApi = async (id) =>{
    const axiosApi = await axios(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
    const e = await axiosApi.data
    
    const object = {
            id: e.id,
            name: e.title,
            img: e.image,
            plateType: e.dishTypes,
            dietType: e.diets,
            resume: e.summary,
            healthScore: e.healthScore,
            stepByStep: e.analyzedInstructions[0]?.steps.map(el => el),
    }

    if(object){
        return object
    }
    throw new Error(`${id} no encontrado `)
    // const findApi = await allFromApi
    // const findId = await findApi.find(e => e.id === id)
    // if(findId){
    //     return findId
    // }
}

const getIdDb = async (id) =>{
    const findDbId = await Recipe.findByPk(id)
    console.log(findDbId)
    if(findDbId){
        return findDbId
    }
    throw new Error(`${id} no encontrado `)
}


// const searchAllById = async (id) =>{
//     const fromApi = await getIdApi(id)
//     const fromDb = await getIdDb(id)
//     const idAll = await Promise.all([fromApi, fromDb])
//     console.log(idAll,'oioioioioioio')
//     return idAll
// }

router.get('/:idReceta', async (req, res) =>{
    try {
     const  id  = req.params.idReceta
     if(id.length > 8 ){
        const findDb = await getIdDb(id)
        return res.status(202).json(findDb)
    }
    const findApi = await getIdApi(id)
    return res.status(202).json(findApi)
        
    } catch (error) {
        res.status(404).send(error)
    }
})

// [ ] POST /recipes:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
// Crea una receta en la base de datos relacionada con sus tipos de dietas.
//Nombre
// Resumen del plato
// Nivel de "comida saludable" (health score)
// Paso a paso
// [ ] Posibilidad de seleccionar/agregar uno o más tipos de dietas


router.post('/', async (req, res) =>{
    const { name, resume, healthScore, stepByStep, types, img } = req.body
    try {
        const createR = await Recipe.create({
            name,
            resume,
            healthScore,
            stepByStep,
            types, 
            img, 
        }) 
        const findTypes = await Type.findAll({
            where: {name: types}
        })
        
        await createR.addType(findTypes)
        return res.status(200).send('created succesfully')

    } catch (e) {
        res.status(405).send(e)
        //return res.status(404).send('failed creating recipe')
    }

})

// [ ] GET /diets:
// Obtener todos los tipos de dieta posibles
// En una primera instancia, cuando no exista ninguno, deberán precargar la base de datos con los tipos de datos indicados por spoonacular acá

module.exports =  router ;