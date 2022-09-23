import axios from 'axios';


export function getRecipes(){
    return async function(dispatch){
        let recipesAxios =  await axios('http://localhost:3005/recipes')
        return dispatch({
            type: 'GET_RECIPES',
            payload: recipesAxios.data
        })
    }
}

export function getTypes(){
    return async function(dispatch){
        let axiosType =  await axios('http://localhost:3005/types')
        return dispatch({
            type: 'GET_DIETS',
            payload: axiosType.data
        })
    }
}

export function orderByName(payload){
    return ({
        type: 'ORDER_BY_NAME',
        payload
    })
}
export function orderHs(payload){
    return ({
        type: 'ORDER_BY_HS',
        payload
    })
}
export function filterCreated(payload){
    return ({
        type: 'FILTER_CREATED',
        payload
    })
}
export function filterDiets(payload){
    return ({
        type: 'FILTER_DIETS',
        payload
    })
}