import React from "react";
import { Link } from 'react-router-dom';

export default function Card({ name, img, types, id }) {
    
    return (
        <div>
            <h3>{ name }</h3>
            <h5>{ types }</h5>
            <h5>{ id }</h5>
            <img src={img} alt="img failed" />
            <Link to={'/detail/'+id} > <button> +info </button></Link>
        </div>
    )
};