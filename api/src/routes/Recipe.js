const { Router } = require('express');
const { Recipe, Type } = require('../db');
const axios = require('axios');
const router = Router();
const { API_KEY } = process.env
require("dotenv").config(); // ver para que eera
const { Op } = require("sequelize");
const alrecipes = require('../100recipes.json')


// GET https://api.spoonacular.com/recipes/complexSearch
// Para obtener mayor información sobre las recetas, como por ejemplo el tipo de dieta deben agregar el flag &addRecipeInformation=true a este endpoint
// Para los tipos de dieta deben tener en cuenta las propiedades vegetarian, vegan, glutenFree por un lado y también analizar las que se incluyan dentro de la propiedad diets
// GET https://api.spoonacular.com/recipes/{id}/information


// [ ] GET /recipes?name="...":
// Obtener un listado de las recetas que contengan la palabra ingresada como query parameter
// Si no existe ninguna receta mostrar un mensaje adecuado


// CAMBIAR CANTIDAD A 100 !!!!!!!!


const allFromApi = async () => { 

    const getAllApi = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=30`)
    const aux =  getAllApi.data.results
   // cambiar a api ver si anda bien la api
    //const aux = alrecipes.results //archivo hardcodeado
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
        include: {
            model: Type,
            attributes: ['name'],
            through:{ 
                attributes: [],
            }
        }
    })  
    const mapDb = allDb.map( e => {
        const auxObj = {
            id: e.id,
            name: e.name,
            resume: e.resume,
            createdInDb: e.createdInDb,
            healthScore: e.healthScore,
            img: e.img,
            stepByStep: e.stepByStep,
            types: e.types.map(el => el.name),
        }
        return auxObj
    })
    console.log(mapDb, 'aaaaaa')
    if(allDb){
        return mapDb
    }
   
}

const allFromAll = async () => {
    const apiAll = await allFromApi()
    const dbAll = await allFromDb()
    const joinAll = await apiAll.concat(dbAll)

    if(joinAll){
        return joinAll
    }
}


router.get('/', async (req, res) =>{
    const { name } = req.query
    const tryAll = await allFromAll()
    try {
        if(name){
            const findName = await tryAll.filter(r => r.name.toLowerCase().includes(name.toLowerCase()) )
            if(findName){
                return res.status(202).json(findName)
            }
        }
        return res.json(tryAll)
    } catch (e) {
        res.send('name not found')
        //res.status(404).send(e)
    }
})


// [ ] GET /recipes/{idReceta}:
// Obtener el detalle de una receta en particular
// Debe traer solo los datos pedidos en la ruta de detalle de receta
// Incluir los tipos de dieta asociados
// GET https://api.spoonacular.com/recipes/{id}/information

async function getIdApi(id){
    const getById = await axios(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
    const e = await getById.data
        const objId = {
            id: e.id,
            name: e.title,
            img: e.image,
            plateType: e.dishTypes,
            diets: e.diets,
            resume: e.summary,
            healthScore: e.healthScore,
            stepByStep: e.analyzedInstructions[0]?.steps.map(el => el),
        }
        
        return objId || undefined
}

async function getIdDb(id){
    const idDb = await Recipe.findByPk(id,{
        include: {
            model: Type,
            attributes: ["name"],
            through: {
                attributes: []
            }
        }
    })
    const aux1 = idDb.dataValues.types.map(e => e.name)
   
    return {...idDb.dataValues, types:aux1} || undefined
}

router.get('/:idReceta', async (req, res) =>{
    const  id  = req.params.idReceta
    try {
        if( id.length > 9){
            const dbId = await getIdDb(id)
            
                return res.status(202).json(dbId)  
            }else {

                const apiId = await getIdApi(id)
                return res.status(200).json(apiId)
            }
            
           
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

router.delete('/', async (req, res) =>{
    const  { id } = req.query
        try {
            if(!id){
                throw new Error('Id missing')
            }
            if(!id.length > 9){
                throw new Error('Invalid Id')
            }

             Recipe.destroy({where: {id:id}}).then(response => {
                return res.status(200).send(id)
             })
        } catch (err) {
            console.log(err)
        }
})
// [ ] GET /diets:
// Obtener todos los tipos de dieta posibles
// En una primera instancia, cuando no exista ninguno, deberán precargar la base de datos con los tipos de datos indicados por spoonacular acá

module.exports =  router ;