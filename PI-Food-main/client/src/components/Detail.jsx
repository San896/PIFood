import React from "react";
import{ Link } from 'react-router-dom'
import { useParams } from "react-router-dom";
import  { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";




export default function Detail(){

    const dispatch = useDispatch();
    const paramId = useParams()
//console.log(props, 'porrrrrrrpspspss')

useEffect(() => {
    dispatch(getDetail(paramId.id))
},[dispatch])

const theRecipe = useSelector( state => state.detail)
console.log(theRecipe, 'recipeeee')


    return(
        <div>
            <Link to='/home'><button>Go Back</button></Link>
            { 
             paramId.id.length > 9? (<div>
                <h1>{theRecipe.name}</h1>
                <h3> ID: {theRecipe.id}</h3>
                <h3>Health Score: {theRecipe.healthScore? theRecipe.healthScore: 'no HS'}</h3>
                <h3>Types of Diets: {theRecipe.types? theRecipe.types: 'failed'}</h3>
                <img src={theRecipe.img} alt="Img failed" />
                <div>
                    <h3>Resume: {theRecipe.resume? theRecipe.resume : 'no resume'}</h3>
                    <h3>Step By Step: {theRecipe.stepByStep? theRecipe.stepByStep : 'no steps'}</h3>
                </div>
             </div>):
             ( <div>
              <h1>{theRecipe.name}</h1>
              <h3> Health Score: {theRecipe.healthScore}</h3>
              <h3> ID: {theRecipe.id}</h3>
              <h3> Plate Type: {theRecipe.plateType}</h3>
              <h3> Type of Diets: {theRecipe.diets}</h3>
              <img src={theRecipe.img} alt="Image failed" />
                 <p dangerouslySetInnerHTML={{__html: theRecipe.resume,}}></p>
              <div>
                 <h3> Step By Step: {!theRecipe.stepByStep? 'no steps' : theRecipe.stepByStep.map( el => (
              <div>
                 <li>Ingredients Step{el.number}: {el.ingredients.map(e=> (<h3>{e.name}</h3>))} </li>
                 <li> Step{el.number}: {el.step}</li>
              </div>
                 ))} </h3>
              </div>
              </div> )
    
            }
            
            
        </div>
    )
}


