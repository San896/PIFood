import React from "react";
import  { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes} from "../actions";
import { Link } from 'react-router-dom';
import Card from './Card';


export default function Home() {

  const dispatch = useDispatch()
  const allRecipes = useSelector ( (state) => state.recipes)

  
  useEffect(() =>{
    dispatch(getRecipes())
  },[dispatch])
  
  const recipes1 = allRecipes


    return(
        <div>
          <div>
           <Link to='/' > Ir a Home </Link>
          </div>
          { 
          allRecipes? allRecipes.map( r => {
              return(
              <Card id={r.id} name={r.name} img={r.img} types={r.types} key={r.id} />
          )}) : 
          <div>
              <p >Loading Pokemons...</p>
          </div>         
       }
        </div>
    )
}