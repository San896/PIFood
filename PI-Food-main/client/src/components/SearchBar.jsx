import React from "react";
import { useState } from'react';
import { useDispatch } from "react-redux";
import { searchByName } from "../actions";

export default function SearchBar(){

    const dispatch = useDispatch()

    const[ name, setName ] = useState('')

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
       //console.log(namestate)
    }

    function handleSubmitBtn(e){
        e.preventDefault()
        dispatch(searchByName(name))
        setName('')
    }


    return (
        <div>
            <input type="text" placeholder="Search By Name.." onChange={(e)=> handleInputChange(e) } />
            <button type="submit" onClick={ (e) => handleSubmitBtn(e) }> Search </button>
        </div>
    )
}