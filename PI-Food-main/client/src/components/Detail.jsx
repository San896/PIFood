import React from "react";
import{ Link } from 'react-router-dom'
import { useParams } from "react-router-dom";
import  { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";


  // usar useparams


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
            {
            <div>
             <h1>{theRecipe.name}</h1>
             <h3> Health Score: {theRecipe.healthScore}</h3>
             <h3> ID: {theRecipe.id}</h3>
             <h3> Type of Diets: {theRecipe.diets}</h3>
             <img src={theRecipe.img} alt="Image failed" />
            <div>
                <h3> Resume: {theRecipe.resume}</h3>
                <h3> Step By Step: {theRecipe.stepByStep.map( el => (<li>{el.ingredients.name} {el.number} {el.step}</li>))}</h3>
            </div>
            </div>
            }
            
            
        </div>
    )
}
