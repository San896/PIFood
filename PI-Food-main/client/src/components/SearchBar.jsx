import React from "react";
import { useState } from'react';
import { useDispatch } from "react-redux";
import { searchByName } from "../actions";
import style from './SearchBar.module.css'
import { ImSearch } from 'react-icons/im';

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
        <div className={style.container}>
            <input  type="text" placeholder="Search By Name.." onChange={(e)=> handleInputChange(e) } className={style.bar}/>
            <button className={style.btn} type="submit" onClick={ (e) => handleSubmitBtn(e) }> <ImSearch/> </button>
        </div>
    )
}