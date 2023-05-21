import React from "react";
import { ReactComponent as University } from "../../../asset/university.svg";
import "./university-section.style.scss";

const UniversitySection = () => {
    return (
        <div className="university-section">
            <University className="university-section__illustration" />
            <div className="university-section__description">
                <h1 className="university-section__header">Universités</h1>
                <p className="university-section__paragraphe">Chaque université dispose de son propre administrateur dédié. Ces administrateurs sont responsables de gérer les processus liés à la création des profiles des étudiants, l’entrée des notes et de garantir l'intégrité des informations sur la plateforme</p>
            </div>
        </div>
    )
}

export default UniversitySection;