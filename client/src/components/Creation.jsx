import React from "react";
import{ Link, useHistory } from 'react-router-dom'
import  { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { postRecipe, getTypes } from "../actions";
import style from './Creation.module.css'
//import fondo from '../imagenes/cooking.png'


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

// console.log(input, 'inputttt')
// console.log(error, 'errrrooorr')

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
        <div className={style.containtitle}>
            <Link to='/home'><button className={style.btnback}> Go Back </button></Link>
            <h1 className={style.title}> Create Recipe </h1>
        </div>


        <form className={style.form} onSubmit={(e) => handleSubmit(e)}>
            <div>
                <label className={style.labelsform}>Name: </label>
                <div>
                <input 
                className={style.inputsform}
                placeholder="Name..."
                type="text" 
                value={input.name} 
                name='name' 
                required
                onChange={(e)=>handleChange(e)}/>
                {error.name && ( <p className={style.p}>{error.name}</p>)}  
                </div>
            </div>
            
            <div>
                <label className={style.labelsform}>Resume: </label>
                <div>
                <input 
                className={style.inputsform}
                placeholder="Resume..."
                type="text" 
                value={input.resume} 
                name='resume' 
                required
                onChange={(e)=>handleChange(e)}/>
                {error.resume && ( <p>{error.resume}</p>)} 
                </div>
            </div>
            
            <div>
                <label className={style.labelsform}>Haelth Score: </label>
                <div>
                <input 
                className={style.inputsform}
                placeholder="Haelth Score..."
                type="number" 
                value={input.healthScore} 
                name='healthScore' 
                onChange={(e)=>handleChange(e)}/>
                </div>
            </div>
            
            <div>
                <label className={style.labelsform}>Step By Step: </label>
                <div>
                <input 
                className={style.inputsform}
                placeholder="Step By Step..."
                type="text" 
                value={input.stepByStep} 
                name='stepByStep' 
                onChange={(e)=>handleChange(e)}/>
                </div>
            </div>
           
            <div>
                <label className={style.labelsform}>Image: </label>
                <div>
                <input 
                className={style.inputsform}
                placeholder="Image..."
                type="text" 
                value={input.img} 
                name='img' 
                onChange={(e)=>handleChange(e)}/>
                </div>
            </div>
            <hr></hr>

            <label className={style.labeldiets}>Diets: </label>
            <select className={style.selectdiets} onChange={(e)=> handleSelect(e)}>
                {
                    diets1.map( d => (
                        <option value={d} require>{d}</option>
                        ) )                    
                    }
            </select>

            <hr></hr>

            <button className={style.btncreate} type="submit" > Create </button>
        </form>


                    { input.name ? 
        <div className={style.divs}>
                    
                <h1>{input.name}</h1>
                <h2>{input.resume}</h2>
                <h2> {input.healthScore}</h2>
                <h4>{input.stepByStep}</h4>
                {/* <img src={input.img} alt=""/> */}
                {  input.img? <img src={input.img} alt=""/> : ''  }
                
                        
                        <div className={style.eldiv}>
                {input.types.map(e => 
                 <div className={style.divsdivs}>
                    <button className={style.btndiets} onClick={() => handleDelete(e)}>X</button>
                    <p className={style.pdiets}>{e}</p>
                 </div>

                )}
                </div>

                </div> : '' }

    </div>
  )
}
