import React from "react";
import { useNavigate } from "react-router-dom";
import "./search-bar.style.scss";

const SearchBar = ({ searchField, setSearchField, doSearch, setIsLoading }) => {
    const navigate = useNavigate();
    const handleChange = (event) => {
        const { value } = event.target;
        setSearchField(value);
    }
    const handleClick = () => {
        if (!searchField) {
            alert("Ne laisser pas le champ vide, ressayer à nouveau...");
            return;
        }
        if (doSearch) {
            setIsLoading(true);
            doSearch();
            setIsLoading(false);
        }
        navigate(`/profiles/${searchField}`);

    }
    return (
        <div className="search-bar">
            <input className="search__field" placeholder="Taper le nom prenom ou CIN" type="search" name="" id="" onChange={handleChange} value={searchField} />
            <button onClick={handleClick} className="search__button">Chercher</button>
        </div>
    )
}

export default SearchBar;