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

export function getDetail(id){
    return async function(dispatch){
        try {
            let axiosId = await axios('http://localhost:3005/recipes/'+id)
            return dispatch({
                type: 'GET_DETAIL',
                payload: axiosId.data
            })
        } catch (e) {
            console.log(e)
        }
    }
}

export function postRecipe(payload){
    return async function(dispatch){
        const axiosPost = await axios.post('http://localhost:3005/recipes',payload)
        return axiosPost
    }
}

export function searchByName(name){
    return async function(dispatch){
        try {
            let searchAxios = await axios('http://localhost:3005/recipes?name=' + name);
                return dispatch({
                    type: 'SEARCH_BY_NAME',
                    payload: searchAxios.data
                })
        } catch (e) {
            console.log(e)
        }
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

export function deleteRecipe(id){
    return async function(dispatch){
        console.log(id, 'wwwewewewewewew')
        try {
            let deleteAxios = await axios.delete('http://localhost:3005/recipes/?id='+id);
            return dispatch({
                type: 'DELETE_RECIPE',
                payload: deleteAxios.data
            })
        } catch (err) {
            console.log(err)
        }
    }
}