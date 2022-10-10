import React from "react";
import style from './Paginado.module.css'

export default function Pagiando({rPerPage, allRecipes, paginado}){
    const pageNumbers = []
    for(let i=0; i <= Math.ceil(allRecipes/rPerPage); i++ ){
        pageNumbers.push(i+1)
    }
    return(
        <div className={style.pag}> 
            <ul className={style.pagul} >
                { pageNumbers && pageNumbers.map(number =>(
                    <h3 key={number}>
                      <button className={style.pagbtn} onClick={() => paginado(number)}>{number}</button>
                    </h3>
                ))}
            </ul>
        </div>
    )
}
