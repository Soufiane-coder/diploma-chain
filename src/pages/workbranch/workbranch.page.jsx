import React, { useEffect } from "react";
import "./workbranch.style.scss";
import { ReactComponent as Add } from "../../asset/add.svg";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { getStudents } from "../../firebase/firebase.utils";
import { connect } from "react-redux";
import { ReactComponent as Delete } from '../../asset/delete.svg';
import { ReactComponent as Checked } from '../../asset/check.svg';
import { setStudentList } from '../../redux/students/students.actions';
import { selectStudentList } from '../../redux/students/students.selectors';

const WorkbranchPage = ({ currentUser, setStudentList, selectStudentList }) => {
    useEffect(() => {
        const studentInformations = async () => {
            const students = await getStudents(currentUser.user.uid);
            setStudentList(students);
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
                {
                    !selectStudentList ? <h1>Loading</h1> :
                        selectStudentList.length === 0 ? <div>Il n y'a pas d'étudiant</div> :
                            selectStudentList.map(student => {
                                return <div className="workbranch-page__item" key={student.id}>
                                    <p>{student.nom} {student.prenom}</p>
                                    <p>{student.cin}</p>
                                    <p>{student.cne}</p>
                                    <p>{student.apogée}</p>
                                    <div className="buttons">
                                        <button className="button bg-edit-color"><Checked /></button>
                                        <button className="button bg-danger-color"><Delete /></button>
                                    </div>
                                </div>
                            })
                }
            </div>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    selectStudentList: selectStudentList
})

const mapDispatchToProps = dispatch => ({
    setStudentList: students => dispatch(setStudentList(students))
})


export default connect(mapStateToProps, mapDispatchToProps)(WorkbranchPage);