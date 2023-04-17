import React from "react";
import{ Link, useHistory } from 'react-router-dom'
import { useParams } from "react-router-dom";
import  {  useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getDetail, deleteRecipe } from "../actions";
import style from './Detail.module.css'
import imagen2 from '../imagenes/fondo 2.2 mediano.jpg'


export default function Detail(){

    const dispatch = useDispatch();

    const history = useHistory()

    const paramId = useParams()

    
    useEffect(() => {
        console.log(paramId.id, 'porrrrrrrpspspss')
        dispatch(getDetail(paramId.id))
},[dispatch, paramId.id])

const theRecipe = useSelector( state => state.detail)



function handleDeleteRecipe(){
    // if(window.confirm(`Are you sure you want to delete the ${theRecipe.name} recipe?`)){
    // }

        dispatch(deleteRecipe(paramId.id));
    history.push('/home')       
}

    return(
        <div className={style.detail}>


            <Link to='/home'><button className={style.goback}>Go Back</button></Link>

            { 
             paramId.id.length > 9? (<div>

                <div className={style.divclose}>
                    <button className={style.btndelete} onClick={ handleDeleteRecipe}>Delete X</button>
                </div>

                <div className={style.containtitle}>
                    <h1 className={style.title}>{theRecipe.name}</h1>
                </div>

         <div className={style.headers}>  
                <h3> ID: {theRecipe.id}</h3>
                <h3>Health Score: {theRecipe.healthScore? theRecipe.healthScore: 'no HS'}</h3>
                <h3>Types of Diets: {theRecipe.types? theRecipe.types: 'failed'}</h3>
        </div>    
                <div className={style.imgresume}>
                    <img className={style.img} src={theRecipe.img || imagen2} alt="Img failed" width='220px' height='220px'/>
                    <h3 >Resume: {theRecipe.resume? theRecipe.resume : 'no resume'}</h3>
                </div>

                    <div className={style.steps}>
                        <h3 className={style.step3}>Step By Step: {theRecipe.stepByStep? theRecipe.stepByStep : 'no steps'}</h3>
                    </div>

                </div>):
             ( 
             <div >

                <div className={style.containtitle}>
                    <h1 className={style.title}>{theRecipe.name}</h1>
                </div>

                <div className={style.headers}>
                    <h5> Health Score: {theRecipe.healthScore}</h5>
                    <h5> ID: {theRecipe.id}</h5>
                    <h5> Plate Type: {theRecipe.plateType+''}</h5>
                    <h5> Type of Diets: {theRecipe.diets+''}</h5>
                </div>
                <div className={style.imgresume}>
                    <img className={style.img} src={theRecipe.img} alt=" img failed" width='220px' height='220px'/>
                    <p className={style.resume} dangerouslySetInnerHTML={{__html: theRecipe.resume,}}></p>
                </div>
                <div className={style.steps}>
                    <div className={style.stepstep}> Step By Step: {!theRecipe.stepByStep? 'no steps' : theRecipe.stepByStep.map( el => (
                        <div>
                        <li> Step{el.number}: {el.step}</li>
                        <li className={style.ingred}>Ingredients Step{el.number}: ''{el.ingredients.map(e=> (<h5>{e.name +';'}</h5>))} ''</li>
                    </div>
                 ))}
                  </div>
                </div>

              </div>)
    
            }
            
            

        </div>
    )
}


