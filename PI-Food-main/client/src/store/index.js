import { createStore, applyMiddleware, compose } from "redux";
//import { composerWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import  reducer  from "../reducer"


//export const store = createStore(reducer, composerWithDevTools(applyMiddleware(thunk))) 


const composeEnhacers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
    reducer,
    composeEnhacers(applyMiddleware(thunk))
)