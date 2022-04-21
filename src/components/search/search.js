import React from "react";
import './search.css'

function Search({val,change}) {
    return (
        <>
        <input
        className="search-input"
        type="text"
        placeholder="Пошук"
        value={val}
        onChange={change}/>
        </>
    )
}
export default Search