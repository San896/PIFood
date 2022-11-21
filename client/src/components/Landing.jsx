import React from "react";
import {Link} from "react-router-dom";
import style from './Landing.module.css'
export default function LandingPage(){
    return(
        <div className={style.general}>
            <div className={style.contenedor}>

                <h1 className={style.header}> Welcome ! </h1>

            </div>

            <div className={style.contBtn}>
                    <Link to='/home'>
                        <button className={style.btn}> Click to Enter... </button>
                    </Link>

            </div>
        </div>

    )
}