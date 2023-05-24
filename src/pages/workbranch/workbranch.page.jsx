import React, { useCallback, useEffect } from "react";
import "./workbranch.style.scss";
import { ReactComponent as Add } from "../../asset/add.svg";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { getStudents } from "../../firebase/firebase.utils";
import { connect } from "react-redux";
import { ReactComponent as Delete } from '../../asset/delete.svg';
import { ReactComponent as Checked } from '../../asset/check.svg';


const WorkbranchPage = ({ currentUser }) => {
    useEffect(() => {
        const studentInformations = async () => {
            const students = await getStudents(currentUser.user.uid);
            console.log(students);
        }
        studentInformations();
    }, []);
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
            <div className="workbranch-page__list">
                <div className="workbranch-page__item">
                    <p>amimi soufiane</p>
                    <p>D582495</p>
                    <p>20010345</p>
                    <p>M13001519</p>
                    <div className="buttons">
                        <button className="button bg-edit-color"><Checked /></button>
                        <button className="button bg-danger-color"><Delete /></button>
                    </div>
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

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
})


export default connect(mapStateToProps)(WorkbranchPage);