import React from "react";
import { Link } from 'react-router-dom';
import style from './Card.module.css'
import imagen2 from '../imagenes/fondo 2.2 mediano.jpg'


export default function Card({ name, img, types, id }) {
    


    return (
        <div className={style.card} >
            <img className={style.img} src={img || imagen2} alt='imagen failed' />

            <h3 className={style.name}>{ name }
            <Link to={'/detail/'+id} > <button className={style.btninfo}> +Info </button></Link>
            </h3>
        
        </div>
    )
};