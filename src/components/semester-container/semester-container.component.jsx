import React, { useEffect, useState } from "react"
import "./semester-container.style.scss";
import { ReactComponent as Add } from '../../asset/add.svg';
import { createStructuredSelector } from "reselect";
import { selectModules } from "../../redux/students-profile/students-profile.selectors";
import { connect } from "react-redux";

const SemesterContainer = ({ semesterNum, selectModules, studentId, studentProfile, setStudentProfile }) => {

    const [moduleCollection, setModuleCollection] = useState(studentProfile.semesters[+semesterNum - 1].modules)

    const addModuleToSemester = () => {
        // const semesters = 
        //     setStudentProfile({})
    }

    useEffect(() => {
        if (moduleCollection?.length === 0) {
            setModuleCollection([{ id: 1, moduleName: "", note: "" }])
        }
    }, []);

    useEffect(() => {
        studentProfile.semesters[+semesterNum - 1].modules = moduleCollection;
    }, [moduleCollection])

    const handleChange = (event) => {
        const { name, value } = event.target;
        const { id } = event.target.closest('.module-container');

        const searchedModule = moduleCollection.find((item) => item.id === +id.split("_")[1]);
        if (searchedModule) {
            searchedModule[name] = value;
            setModuleCollection([...moduleCollection])
        }

        if (name === "moduleName") { // highlight with red if there is rodendence
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
        setModuleCollection([...moduleCollection, { id: moduleCollection.length + 1, moduleName: "", note: "" }])
    }

    return (
        <fieldset>
            <legend><h1>Semestre {semesterNum}</h1></legend>
            {
                moduleCollection?.map(module => ( // the name has ba unique
                    <div className="module-container" key={module.id} id={"module_" + module.id}>
                        <input type="text" placeholder='Le nom du module' className='forme-input-text' name="moduleName"
                            value={module.moduleName} onChange={handleChange} />
                        <input type="number" min="0" max="20" placeholder='La note du module / 20' className='forme-input-text' name="note"
                            value={module.note} onChange={handleChange} />
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



export default connect(mapStateToProps)(SemesterContainer);
