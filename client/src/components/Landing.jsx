import React from "react";
import {Link} from "react-router-dom";
import style from './Landing.module.css'
export default function LandingPage(){
    return(
        <div className={style.general}>

            <div className={style.contenedor}>

                <h4 className={style.header}> Welcome </h4>
                <h1 className={style.header1}> FoodApp </h1>

            </div>

            <div className={style.contBtn}>
                    <Link to='/home'>
                        <button className={style.btn}> Click to Enter </button>
                    </Link>

            </div>
        </div>

    )
}