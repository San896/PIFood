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
        case 'GET_DIETS':
            return {
                //...state,
                ...JSON.parse(JSON.stringify(state)),
                diets: payload
            }
        case 'ORDER_BY_NAME':
            const allR = state.filtRecipes
         const sortAll = payload === 'asc' ? allR.sort(function(a,b) {
        if (a.name > b.name) {
          return 1
        }
        if (a.name < b.name) {
          return -1
        }
        return 0      
      }) : 
         allR.sort(function(a,b) {
           if (a.name < b.name) {
              return 1
           }
           if (a.name > b.name) {
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
        // case 'FILTER_DIETS':
        //     const recipesGet = state.filtRecipes
        //     const filtIt = recipesGet.map(e => e.diets)
        //    // const filt2 = filtIt.filter(el => el.includes(payload))
        //    // console.log(filt2, 'qqqqqqqqq')
        // return{
        //     ...state,
        //     recipes: filtIt
        // }

            default: 
            return state;        
    }
}
 export default reducer;