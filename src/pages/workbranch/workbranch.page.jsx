import React from "react";
import "./workbranch.style.scss";
import { ReactComponent as Add } from "../../asset/add.svg";
import WorkbranchList from "../../layout/workbranch/workbranch-list/workbranch-list.layout";
const WorkbranchPage = () => {

    return (
        <div className="workbranch-page">
            <div className="workbranch-page__header">
                <button className="workbranch-page__button btn-background"><Add />Ajouter étudiant</button>
            </div>
            <div className="workbranch-page__labels">
                <label>Nom & Prénom</label>
                <label>CIN</label>
                <label>CNE</label>
                <label>Apogée</label>
                <label></label>
            </div>
            <WorkbranchList />
        </div>
    )
}


export default WorkbranchPage;