
const initialState = {
    recipes :[],
    filtRecipes: [],
    diets: [],
    detail: [],
}

//state y action-- tiene type y payload
function reducer(state= initialState, { type, payload }){
    switch(type) {
        case 'GET_RECIPES':
            return {
                //...state,
                ...JSON.parse(JSON.stringify(state)),
                recipes: payload,
                filtRecipes: payload
            }
        case 'GET_DIETS':
            return {
                //...state,
                ...JSON.parse(JSON.stringify(state)),
                diets: payload
            }
        case 'GET_DETAIL':
            return{
                ...state,
                detail: payload
            }
        case 'SEARCH_BY_NAME':
            return {
                ...state,
                recipes: payload
            }
        case 'ORDER_BY_NAME':
            const allR = state.filtRecipes
         const sortAll = payload === 'asc' ? allR.sort(function(a,b) {
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1
        }
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1
        }
        return 0      
      }) : 
         allR.sort(function(a,b) {
           if (a.name.toLowerCase() < b.name.toLowerCase()) {
              return 1
           }
           if (a.name.toLowerCase() > b.name.toLowerCase()) {
           return -1
           }
            return 0      
  })
            return{
                //...state,
                ...JSON.parse(JSON.stringify(state)),
                recipes: sortAll
            }
        case 'ORDER_BY_HS':
            const allHs = state.recipes
            const sortHs = payload === 'High'? allHs.sort(function(a,b){
                if(a.healthScore > b.healthScore){
                    return 1
                }
                if(a.healthScore < b.healthScore){
                    return -1
                }
                return 0
            }) :
            allHs.sort(function(a,b){
                if(a.healthScore < b.healthScore){
                    return 1
                }
                if(a.healthScore > b.healthScore){
                    return -1
                }
                return 0
            }) 
            return{
                ...JSON.parse(JSON.stringify(state)),
                recipes: sortHs
            }    
        case 'FILTER_CREATED':
            const filtAllR = payload === 'created'? state.filtRecipes.filter(r => r.createdInDb) : state.filtRecipes.filter(r => !r.createdInDb)
            const filCreated = payload === 'all'? state.filtRecipes : filtAllR
        return{
            ...JSON.parse(JSON.stringify(state)),
            recipes: filCreated
        }
        case 'POST_RECIPE':
            return{
                ...state,
            }
        case 'FILTER_DIETS':
            const recipesGet = state.filtRecipes
            const aaa =  recipesGet.filter(e=> e.diets )
            const filtR = aaa.filter(e => e.diets.includes(payload))
            console.log(filtR, 'eeeeeeeeeeeee')
            const response = payload === 'all'? state.filtRecipes : filtR

        return{
            ...state,
            recipes: response
        }
 
        case 'DELETE_RECIPE':
            return{
                ...state,
                recipes: state.recipes.filter(e => e.id !== payload),
                filtRecipes: state.filtRecipes.filter(e => e.id !== payload)
            }


            default: 
            return state;        
    }
}
 export default reducer;