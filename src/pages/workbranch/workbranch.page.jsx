import React, { useEffect } from "react";
import "./workbranch.style.scss";
import { ReactComponent as Add } from "../../asset/add.svg";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { getStudents, deleteStudent } from "../../firebase/firebase.utils";
import { connect } from "react-redux";
import { ReactComponent as Delete } from '../../asset/delete.svg';
import { ReactComponent as Checked } from '../../asset/check.svg';

import { setStudentList } from '../../redux/students-profile/students-profile.action';
import { selectStudentProfileList } from '../../redux/students-profile/students-profile.selectors';

import { useNavigate } from "react-router-dom";

const WorkbranchPage = ({ selectCurrentUser, setStudentList, selectStudentList }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const studentInformations = async () => {
            const students = await getStudents(selectCurrentUser.user.uid);
            setStudentList(students);
        }
        studentInformations();
    }, []);

    const handleDelete = (event) => {
        if (!window.confirm("Est ce que vous voulez vraiment supprimer cet élement")) return;
        const { id: studentId } = event.target.closest('.workbranch-page__item');
        deleteStudent(selectCurrentUser.user.uid, studentId);
    }

    const HandleEdit = (event) => {
        const { id } = event.target.closest('.workbranch-page__item');
        navigate('/profile-edit-mode/' + id);
    }

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
                                return <div className="workbranch-page__item" key={student.studentId} id={student.studentId}>
                                    <p>{student.nom} {student.prénom}</p>
                                    <p>{student.cin}</p>
                                    <p>{student.cne}</p>
                                    <p>{student.apogée}</p>
                                    <div className="buttons">
                                        <button className="button bg-edit-color" onClick={HandleEdit}><Checked /></button>
                                        <button className="button bg-danger-color" onClick={handleDelete}><Delete /></button>
                                    </div>
                                </div>
                            })
                }
            </div>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    selectCurrentUser: selectCurrentUser,
    selectStudentList: selectStudentProfileList
})

const mapDispatchToProps = dispatch => ({
    setStudentList: students => dispatch(setStudentList(students))
})


export default connect(mapStateToProps, mapDispatchToProps)(WorkbranchPage);