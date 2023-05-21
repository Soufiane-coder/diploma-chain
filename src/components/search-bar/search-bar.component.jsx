import React from "react";
import { Link } from "react-router-dom";
import "./search-bar.style.scss";

const SearchBar = ({ searchField, setSearchField }) => {
    const handleChange = (event) => {
        const { value } = event.target;
        setSearchField(value);
    }
    return (
        <div className="search-bar">
            <input className="search__field" placeholder="Taper le nom prenom ou CIN" type="search" name="" id="" onChange={handleChange} value={searchField} />
            <Link to="/profiles"><button className="search__button">Chercher</button></Link>
        </div>
    )
}

export default SearchBar;