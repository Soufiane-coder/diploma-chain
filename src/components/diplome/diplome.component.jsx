import React from "react";
import "./diplome.style.scss";

const Diplome = ({ diplomeNiveau, diplomeRef }) => {
    return (
        <fieldset className="diploma-field">
            <legend>{diplomeNiveau}</legend>
            <h1>Ref : {diplomeRef}</h1>
        </fieldset>
    )
}

export default Diplome;