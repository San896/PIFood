const initialState = {
    recipes :[],
    filtRecipes: [],
    diets: []
}

//state y action
function reducer(state= initialState, { type, payload }){
    switch(type) {
        case 'GET_RECIPES':
            return {
                //...state,
                ...JSON.parse(JSON.stringify(state)),
                recipes: payload,
                filtRecipes: payload
            }
            default: 
            return state;        
    }
}
 export default reducer;