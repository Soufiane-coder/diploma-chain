import React, { useState } from "react"
import "./semester-container.style.scss";
import { ReactComponent as Add } from '../../asset/add.svg';

const SemesterContainer = () => {
    const [module, setModule] = useState(null);
    const [moduleCollection, setModuleCollection] = useState([]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setModule({ ...module, [name]: value })
    }

    const handleAddingModule = () => {
        setModuleCollection(moduleCollection.concat(module));
        console.log(moduleCollection);
    }

    return (
        <fieldset>
            <legend><h1>Semestre X</h1></legend>
            <div className="module-container">
                <input type="text" placeholder='Le nom du module' className='forme-input-text' name="name" onChange={handleChange} />
                <input type="number" min="0" max="20" placeholder='La note du module / 20' className='forme-input-text' name="note" onChange={handleChange} />
                <button type="button" onClick={handleAddingModule}>{<Add />}</button>
            </div>
        </fieldset>
    )
}

export default SemesterContainer;
