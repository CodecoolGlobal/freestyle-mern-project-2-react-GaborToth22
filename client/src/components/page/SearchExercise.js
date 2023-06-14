import { useEffect, useState } from "react";

const SearchExercises = ({search, setSearch, handleSearch}) => {






    return (
        <div id="searchDiv">
        <input type="text" placeholder="Search Exercise" value={search} onChange={(e)=> setSearch(e.target.value.toLowerCase())} id="searchInput"></input>
        <button onClick={() => handleSearch()} id="searchButton">Submit</button>
        </div>
    )
}

export default SearchExercises