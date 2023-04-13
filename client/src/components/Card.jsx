import React from "react";
import { Link } from 'react-router-dom';
import style from './Card.module.css'
import imagen2 from '../imagenes/fondo 2.2 mediano.jpg'
import { BsInfoCircle } from 'react-icons/bs';

export default function Card({ name, img, types, id }) {
    


    return (
        <div className={style.card} >
            <Link to={'/detail/'+id} className={style.img}>
            <img className={style.img} src={img || imagen2} alt='imagen failed' />
            </Link>

            <h3 className={style.name}>{ name }
            
            <Link to={'/detail/'+id} className={style.link}> <button className={style.btninfo}> <BsInfoCircle className={style.icon}/> </button></Link>
            </h3>
            
        </div>
    )
};

