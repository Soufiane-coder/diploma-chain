import React from "react"
import "./semester-container.style.scss";
import { ReactComponent as Add } from '../../asset/add.svg';

const SemesterContainer = () => {
    return (
        <fieldset>
            <legend><h1>Semestre X</h1></legend>
            <div className="module-container">
                <input type="text" placeholder='Le nom du module' className='forme-input-text' />
                <input type="number" min="0" max="20" placeholder='La note du module / 20' className='forme-input-text' />
                <button type="button">{<Add />}</button>
            </div>
        </fieldset>
    )
}

export default SemesterContainer;
