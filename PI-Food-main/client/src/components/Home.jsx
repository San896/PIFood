import React from "react";
import  { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes, getTypes, orderByName, orderHs, filterCreated, filterDiets } from "../actions";
import { Link } from 'react-router-dom';
import Card from './Card';
import Paginado from "./Paginado";



export default function Home() {

  const dispatch = useDispatch()
  const allRecipes = useSelector ( (state) => state.recipes)
  const allDiets = useSelector ( (state) => state.diets)

  const [order, setOrder] = useState('')

  const [ currentP, setCurrentP ] = useState(1)
  const [ rPerPage, setRperPage ] = useState(9)
  const lastRecipe = currentP * rPerPage
  const firstRecipe = lastRecipe - rPerPage
  const recipesPerPage =  allRecipes.slice(firstRecipe, lastRecipe)

  const paginado = (pageNumber) => {
    setCurrentP(pageNumber)
  }

  useEffect(() =>{
    dispatch(getRecipes())
  },[dispatch])

  // useEffect(() =>{
  //   dispatch(getTypes())
  // },[dispatch])
  


  function handleClick(e){
    e.preventDefault();
    dispatch(getRecipes())
  }
  function handleOrder(e){
    e.preventDefault();
    dispatch(orderByName(e.target.value))
    setCurrentP(1)
    setOrder(`ordenando ${e.target.value}`)
  }
  function handleHs(e){
    e.preventDefault();
    dispatch(orderHs(e.target.value))
    setCurrentP(1)
    setOrder(`ordenando ${e.target.value}`)
  }
  function handleCreated(e){
    e.preventDefault();
    dispatch(filterCreated(e.target.value))
  }
  function handleDiets(e){
    e.preventDefault();
    dispatch(filterDiets(e.target.value))
  }

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
            <option value="asc"> A - Z </option>
            <option value="desc"> Z - A </option>
          </select>
        </div>
        <div>
         <div>Order By HealthScore:</div>
          <select onChange={e => handleHs(e)} >
            <option value="High"> Higher Hs</option>
            <option value="Low"> Lower Hs</option>
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
          <div>Filter By Diet: </div>
          <select onChange={e => handleDiets(e)}>
            <option value="all"> All </option>
            {
              allDiets?.map( e => {
                return <option value={e} key={e.id}>{e}</option>
              })
            }
          </select>
        </div>
        <div >
        <Paginado 
          rPerPage= {rPerPage}
          allRecipes = {allRecipes.length}
          paginado = {paginado}
          />
        </div>
          { 
          recipesPerPage? recipesPerPage.map( r => {
              return(
              <Card id={r.id} name={r.name} img={r.img} types={r.types} key={r.id} />
          )}) : 
          <div>
              <p >Loading Recipes...</p>
          </div>         
       }
        </div>
    )
}