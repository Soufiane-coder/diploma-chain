import React, { useEffect, useState } from "react"
import "./semester-container.style.scss";
import { ReactComponent as Add } from '../../asset/add.svg';
import { createStructuredSelector } from "reselect";
import { selectModules } from "../../redux/students-profile/students-profile.selectors";
import { connect } from "react-redux";
import { addModuleToSemester } from "../../redux/students-profile/students-profile.action";

const SemesterContainer = ({ semesterNum, selectModules, studentId, addModuleToSemester }) => {

    const [moduleCollection, setModuleCollection] = useState([{ id: 1, moduleName: "", note: "" }]);
    useEffect(() => {
        // addModuleToSemester({ studentId, semesterNum, moduleName: "", note: "", id: 1 })
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        const { id } = event.target.closest('.module-container');

        const searchedModule = moduleCollection.find((item) => item.id === +id.split("_")[1]);
        if (searchedModule) {
            searchedModule[name] = value;
        }

        if (name === "moduleName") {
            const occuranceNames = moduleCollection.find((item) => item.moduleName === value);
            if (occuranceNames && occuranceNames.id !== +id.split("_")[1]) {
                event.target.style.borderColor = "red";
                event.target.closest(".profile__notes").children[1].disabled = true;
            }
            else {
                event.target.style.borderColor = "black";
            }
        }
    }

    const handleAddingModule = () => {
        const { id, moduleName, note } = moduleCollection[moduleCollection.length - 1];
        addModuleToSemester({ studentId, semesterNum, moduleName, note, id })
        setModuleCollection(moduleCollection.concat(
            { id: moduleCollection.length + 1, moduleName: "", note: "" }
        ));
    }

    return (
        <fieldset>
            <legend><h1>Semestre {semesterNum}</h1></legend>
            {
                moduleCollection?.map(item => ( // the name has ba unique
                    <div className="module-container" key={item.id} id={"module_" + item.id}>
                        <input type="text" placeholder='Le nom du module' className='forme-input-text' name="moduleName" onChange={handleChange} />
                        <input type="number" min="0" max="20" placeholder='La note du module / 20' className='forme-input-text' name="note" onChange={handleChange} />
                    </div>
                ))
            }
            <button type="button" onClick={handleAddingModule}><Add /></button>
        </fieldset>
    )
}

const mapStateToProps = createStructuredSelector({
    selectModules: selectModules
})

const mapDispatchToProps = dispatch => ({
    addModuleToSemester: ({ studentId, semesterNum, moduleName, note, id }) => dispatch(addModuleToSemester(studentId, semesterNum, moduleName, note, id))
})


export default connect(mapStateToProps, mapDispatchToProps)(SemesterContainer);
