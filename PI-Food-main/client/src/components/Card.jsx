import React from "react";
import { Link } from 'react-router-dom';
import style from './Card.module.css'

export default function Card({ name, img, types, id }) {
    
    return (
        <div className={style.card}>
            <h3>{ name }</h3>
            <h5>Diets: { types }</h5>
            <h5>id: { id }</h5>
            <Link to={'/detail/'+id} > <button> +info </button></Link>
            <img src={img} alt="img failed" width='220px' height='220px'/>
        </div>
    )
};