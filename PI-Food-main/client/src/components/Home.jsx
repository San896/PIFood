import React from "react";
import  { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes, getTypes, orderByName, orderHs, filterCreated, filterDiets } from "../actions";
import { Link } from 'react-router-dom';
import Card from './Card';
import Paginado from "./Paginado";
import SearchBar from './SearchBar';
import style from './Home.module.css';
import { FaHome } from 'react-icons/fa';
import { IoReload } from 'react-icons/io5';

 
export default function Home() {

  const dispatch = useDispatch()
  const allRecipes = useSelector ( (state) => state.recipes)
  const allDiets = useSelector ( (state) => state.diets)
  const [order, setOrder] = useState('')
  // ver bien el estado order para que es
  const [ currentP, setCurrentP ] = useState(1)
  const [ rPerPage, setRperPage ] = useState(10)
  const lastRecipe = currentP * rPerPage
  const firstRecipe = lastRecipe - rPerPage
  const recipesPerPage =  allRecipes.slice(firstRecipe, lastRecipe) //0 a 9 el slice deja fuera el ultimo
  
  const paginado = (pageNumber) => {
    setCurrentP(pageNumber)
  }
  
  useEffect(() =>{
    dispatch(getRecipes())
  },[dispatch])
  
  useEffect(() =>{
    dispatch(getTypes())
  },[dispatch])
  
  console.log(allRecipes,'aaaaaaaa')


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
      <div className={style.gralcontainer}>

      <div className={style.home}>

        <div className={style.recargar}>

             <Link to='/' > <button className={style.btnahome}> <FaHome/> </button> </Link>
             <button className={style.btnrecargar} onClick={e => handleClick(e)}>
              <IoReload/>
             </button> 

            <div className={style.containcreatbtn}>
             <Link to='/createRecipe' > <button className={style.createBtn} > Create Recipe </button></Link>
              </div>
                  
            <div className={style.filters}>

              <div>
                  <select className={style.selects} onChange={e => handleOrder(e)} >
                   <option> Order </option>
                   <option value="asc"> A - Z </option>
                   <option value="desc"> Z - A </option>
                  </select>
              </div>

              <div>
                <select className={style.selects} onChange={e => handleHs(e)} >
                  <option> HealthScore </option>
                  <option value="High"> Higher Hs</option>
                  <option value="Low"> Lower Hs</option>
                </select>
              </div>
        
              <div>
                  <select className={style.selects} onChange={e => handleCreated(e)} >
                    <option value="all">All</option>
                    <option value="created">Created</option>
                    <option value="existent">Existent</option>
                  </select>
              </div> 
        
              <div>
                <select className={style.selects} onChange={e => handleDiets(e)}>
                  <option value="all"> Diets </option>
                    {
                    allDiets?.map( e => {
                      return <option value={e} key={e.id}>{e}</option>
                    })
                    }
                </select>
              </div>

              </div>

        </div>


          <div className={style.search}>         
             <SearchBar/> 
             </div>

        <div className={style.pag}>
        <Paginado 
          rPerPage= {rPerPage}
          allRecipes = {allRecipes.length}
          paginado = {paginado}
          />
          </div>
          
      </div>



        <div className={style.cards}>
          { 
          recipesPerPage? recipesPerPage.map( r => {
            return(
              <Card id={r.id} name={r.name} img={r.img} types={r.diets || r.types} />
              )}) : 
              <div>
              <p >Loading Recipes...</p>
          </div>         
       }
       </div>   


      </div> 
        
    )
}