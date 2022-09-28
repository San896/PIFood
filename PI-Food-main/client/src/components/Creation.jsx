import React from "react";
import{ Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { postRecipe, getTypes } from "../actions";
import { useState } from "react";

export default function Creation(){

    const dispatch = useDispatch()

    const diets = useSelector((state) => state.diets)

    const [ input, setInput ] = useState({
        name: '',
        resume: '',
        healthScore:'',
        stepByStep:[],
        types:[], 
        img:'', 
    })

      // useEffect(() =>{
  //   dispatch(getTypes())
  // },[dispatch])

  return(
    <div>
        <Link to='/home'><button> Go Back </button></Link>
        <h1> Create your own Recipe</h1>
        <form >
            <div>
                <label>Name: </label>
                <input type="text" value={input.name} name='name' />
            </div>
            <div>
                <label>Resume: </label>
                <input type="text" value={input.resume} name='resume' />
            </div>
            <div>
                <label>Health Score: </label>
                <input type="text" value={input.healthScore} name='healthScore' />
            </div>
            <div>
                <label>Step By Step: </label>
                <input type="text" value={input.stepByStep} name='stepByStep' />
            </div>
            <div>
                <label>Types: </label>
                <input type="text" value={input.types} name='types' />
            </div>
            <div>
                <label>Image: </label>
                <input type="text" value={input.img} name='img' />
            </div>
        </form>
    </div>
  )
}
