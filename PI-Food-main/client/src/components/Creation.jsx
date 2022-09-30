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
        types:'', 
        img:'', 
    })

console.log(input)

    useEffect(() => {
        dispatch(getTypes())
    },[dispatch])


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
            types:'', 
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
                onChange={(e)=>handleChange(e)}/>
            </div>
            <div>
                <label>Resume: </label>
                <input 
                placeholder="Resume"
                type="text" 
                value={input.resume} 
                name='resume' 
                onChange={(e)=>handleChange(e)}/>
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
                        <label> {d} <input type="checkbox" name={d} value={d} onChange={(e)=>handleCheckBox(e)}/></label>
                    ) )                    
                }
            </div>
            <button type="submit" > Create </button>
        </form>
    </div>
  )
}
