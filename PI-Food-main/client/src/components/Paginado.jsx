import React from "react";


export default function Pagiando({rPerPage, allRecipes, paginado}){
    const pageNumbers = []
    for(let i=0; i <= Math.ceil(allRecipes/rPerPage); i++ ){
        pageNumbers.push(i+1)
    }
    return(
        <nav >
            <ul>
                { pageNumbers && pageNumbers.map(number =>(
                    <li key={number}>
                      <button onClick={() => paginado(number)}>{number}</button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
