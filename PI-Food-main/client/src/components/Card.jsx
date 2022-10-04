import React from "react";
import { Link } from 'react-router-dom';
import style from './Card.module.css'



export default function Card({ name, img, types, id }) {
    


    return (
        <div className={style.card}>
            <h3 className={style.name}>{ name }</h3>
            <h5 className={style.diets}>Diets: { types }</h5>
            <img className={style.img} src={img} alt="img failed" width='170px' height='170px'/>
            <Link to={'/detail/'+id} > <button> +info </button></Link>
            <h5 className={style.id}>id: { id }</h5>
        </div>
    )
};