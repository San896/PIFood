import React from "react";

export default function Card({ name, img, types, id }) {
    return (
        <div>
            <h3>{ name }</h3>
            <h5>{ types }</h5>
            <h5>{ id }</h5>
            <img src={img} alt="img failed" />
        </div>
    )
};