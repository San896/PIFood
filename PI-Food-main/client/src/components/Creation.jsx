import React from "react";
import{ Link, useHistory } from 'react-router-dom'
import  { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { postRecipe, getTypes } from "../actions";
import style from './Creation.module.css'
import fondo from '../imagenes/cooking.png'


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

console.log(input, 'inputttt')
console.log(error, 'errrrooorr')

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

    function handleSelect(e){
        setInput({
            ...input,
            types: [...input.types, e.target.value]
        })
    }
    function handleDelete(e){
        setInput({
            ...input,
            types: input.types.filter(el => el !== e)
        })
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
    <div className={style.create}>
        <Link to='/home'><button className={style.btnback}> Go Back </button></Link>
        <h1 className={style.title}> Create your own Recipe </h1>
        <form className={style.form} onSubmit={(e) => handleSubmit(e)}>
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
            <h3></h3>
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
            <h3></h3>
            <div>
                <label>Haelth Score: </label>
                <input 
                placeholder="Haelth Score"
                type="number" 
                value={input.healthScore} 
                name='healthScore' 
                onChange={(e)=>handleChange(e)}/>
            </div>
            <h3></h3>
            <div>
                <label>Step By Step: </label>
                <input 
                placeholder="Step By Step"
                type="text" 
                value={input.stepByStep} 
                name='stepByStep' 
                onChange={(e)=>handleChange(e)}/>
            </div>
            <h3></h3>
            <div>
                <label>Image: </label>
                <input 
                placeholder="Image"
                type="text" 
                value={input.img} 
                name='img' 
                onChange={(e)=>handleChange(e)}/>
            </div>
            <h3></h3>
            <label className={style.labeldiets}>Diets: </label>
            <select className={style.selectdiets} onChange={(e)=> handleSelect(e)}>
                {
                    diets1.map( d => (
                        <option value={d} require>{d}</option>
                        ) )                    
                    }
            </select>
            <h3></h3>
            <button className={style.btncreate} type="submit" > Create </button>
        </form>
        <div className={style.newimg}>
            <img src={fondo} height='400px' width='400px'/>
        </div>

        <div className={style.divs}>
                {input.types.map(e => 
                 <div>
                    <p>{e}</p>
                    <button onClick={() => handleDelete(e)}>X</button>
                 </div>
                )}
                </div>
    </div>
  )
}
