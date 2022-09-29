import React from "react";
import{ Link, useHistory } from 'react-router-dom'
import  { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { postRecipe, getTypes } from "../actions";


export default function Creation(){

    const dispatch = useDispatch()

    const history = useHistory()

    const diets1 = useSelector((state) => state.diets)

    const [ input, setInput ] = useState({
        name: '',
        resume: '',
        healthScore:'',
        stepByStep:'',
        types:[], 
        img:'', 
    })

    useEffect(() => {
        dispatch(getTypes())
    },[])


    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    function handleCheckBox(e){
        if(e.target.checked){
            setInput({
                ...input,
                types: [...input.types, e.target.value]
            })
        }
    }

     function handleSubmit(e){
        e.preventDefault();
        dispatch(postRecipe(input))
        alert('Created Succesfully!')
        setInput({
            name: '',
            resume: '',
            healthScore:'',
            stepByStep:'',
            types:[], 
            img:'', 
        })
     }

  return(
    <div>
        <Link to='/home'><button> Go Back </button></Link>
        <h1> Create your own Recipe</h1>
        <form >
            <div>
                <label>Name: </label>
                <input type="text" value={input.name} name='name' onChange={handleChange}/>
            </div>
            <div>
                <label>Resume: </label>
                <input type="text" value={input.resume} name='resume' onChange={handleChange}/>
            </div>
            <div>
                <label>Health Score: </label>
                <input type="number" value={input.healthScore} name='healthScore' onChange={handleChange}/>
            </div>
            <div>
                <label>Step By Step: </label>
                <input type="text" value={input.stepByStep} name='stepByStep' onChange={handleChange}/>
            </div>
            <div>
                <label>Image: </label>
                <input type="text" value={input.img} name='img' onChange={handleChange}/>
            </div>
            <label>Diets: </label>
            <div>
                {
                    diets1.map( d => (
                        <label> {d} <input type="checkbox" name={d} value={d} onChange={(e)=>handleCheckBox(e)}/></label>
                    ) )                    
                }
            </div>
            <button type="submit" > Create </button>
        </form>
    </div>
  )
}
