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

  useEffect(() =>{
    dispatch(getTypes())
  },[dispatch])
  


    return(
        <div>
          <div>
           <Link to='/' > Ir a Home </Link>
          </div>
          <button  onClick={e => handleClick(e)}>
          Volver a cargar
        </button>
        <div>
        <div>Order By Name: </div>
          <select onChange={e => handleOrder(e)} >
            <option value="asc"> A--Z </option>
            <option value="desc"> Z--A </option>
          </select>
        </div>
        <div>
         <div>Order By HealthScore:</div>
          <select onChange={e => handleAttack(e)} >
            <option value="Hattack"> Higher Attack</option>
            <option value="Lattack"> Lower Attack</option>
         </select>
        </div>
        <div>
        <div>Filter Existent or Created </div>
          <select onChange={e => handleCreated(e)} >
            <option value="all">Todos</option>
            <option value="created">Creados</option>
            <option value="existent">Existentes</option>
          </select>
        </div> 
        <div>
          <div>Filter By Type: </div>
          <select onChange={e => handleTypes(e)}>
            <option value="all"> All </option>
            {
              allTypes?.map( e => {
                return <option value={e} key={e.id}>{e}</option>
              })
            }
          </select>
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