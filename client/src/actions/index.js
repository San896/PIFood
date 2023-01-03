import axios from 'axios';


export function getRecipes(){
    return async function(dispatch){
        let recipesAxios =  await axios('/recipes')
        return dispatch({
            type: 'GET_RECIPES',
            payload: recipesAxios.data
        })
    }
}

export function getTypes(){
    return async function(dispatch){
        let axiosType =  await axios('/types')
        return dispatch({
            type: 'GET_DIETS',
            payload: axiosType.data
        })
    }

}


export function getDetail(id){
    return async function(dispatch){
        try {
            let axiosId = await axios('/recipes/'+id)
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
        const axiosPost = await axios.post('/recipes',payload)
        return axiosPost
    }
}

export function searchByName(name){
    return async function(dispatch){
        try {
            let searchAxios = await axios('/recipes?name=' + name);
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
        
        try {
            let deleteAxios = await axios.delete('/recipes/?id='+id);
            return dispatch({
                type: 'DELETE_RECIPE',
                payload: deleteAxios.data
            })
        } catch (err) {
            console.log(err)
        }
    }
}
