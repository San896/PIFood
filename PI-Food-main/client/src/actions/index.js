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