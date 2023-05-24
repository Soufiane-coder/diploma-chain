import React from "react";
import "./workbranch.style.scss";
import { ReactComponent as Add } from "../../asset/add.svg";
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
            </div>
            <div className="workbranch-page__list">
                <div className="workbranch-page__item">
                    f
                </div>
                <div className="workbranch-page__item">
                    f
                </div>
                <div className="workbranch-page__item">
                    f
                </div>
            </div>
        </div>
    )
}

export default WorkbranchPage;