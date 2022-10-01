import React from "react";
import{ Link, useHistory } from 'react-router-dom'
import  { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { postRecipe, getTypes } from "../actions";

function validate(input){
    let obj = {};
    if(!input.name){
        obj.name = 'Name is required'
    } else if(!input.resume){
        obj.resume = 'Resume is required'
    } else if(input.types.length === 0){
        obj.types = 'Type of Diet is required'
    }
    return obj;
}

export default function Creation(){

    const dispatch = useDispatch()

    const history = useHistory()

    const diets1 = useSelector((state) => state.diets)

    const [ error, setError ] = useState({})

    const [ input, setInput ] = useState({
        name: '',
        resume: '',
        healthScore:'',
        stepByStep:'',
        types:[], 
        img:'', 
    })

console.log(error)

    useEffect(() => {
        dispatch(getTypes())
    },[dispatch])


    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setError(validate({
            ...input,
            [e.target.name]: e.target.value,
        }))
    }

    function handleCheckBox(e){
        if(e.target.checked){
            setInput({
                ...input,
                types: [...input.types, e.target.value]
            })
        } else if(e.target.indeterminate) {
            setError(validate({
                ...input,
                [e.target.name]: e.target.value,
            }))
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
        history.push('/home')
     }


  return (
    <div>
        <Link to='/home'><button> Go Back </button></Link>
        <h1> Create your own Recipe </h1>
        <form onSubmit={(e) => handleSubmit(e)}>
            <div>
                <label>Name: </label>
                <input 
                placeholder="Name"
                type="text" 
                value={input.name} 
                name='name' 
                required
                onChange={(e)=>handleChange(e)}/>
                {error.name && ( <p>{error.name}</p>)}  
            </div>
            <div>
                <label>Resume: </label>
                <input 
                placeholder="Resume"
                type="text" 
                value={input.resume} 
                name='resume' 
                required
                onChange={(e)=>handleChange(e)}/>
                {error.resume && ( <p>{error.resume}</p>)} 
            </div>
            <div>
                <label>Haelth Score: </label>
                <input 
                placeholder="Haelth Score"
                type="number" 
                value={input.healthScore} 
                name='healthScore' 
                onChange={(e)=>handleChange(e)}/>
            </div>
            <div>
                <label>Step By Step: </label>
                <input 
                placeholder="Step By Step"
                type="text" 
                value={input.stepByStep} 
                name='stepByStep' 
                onChange={(e)=>handleChange(e)}/>
            </div>
            <div>
                <label>Image: </label>
                <input 
                placeholder="Image"
                type="text" 
                value={input.img} 
                name='img' 
                onChange={(e)=>handleChange(e)}/>
            </div>
            <label>Diets: </label>
            <div>
                {
                    diets1.map( d => (
                        <label> {d} <input type="checkbox" name={d} value={input.types} required onChange={(e)=>handleCheckBox(e)}/></label>
                        ) )                    
                    }
            </div>
                    {
                        error.types && (<p>{error.types}</p>)
                    }
            <button type="submit" > Create </button>
        </form>
    </div>
  )
}
