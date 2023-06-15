import React from 'react';
import "./workbranch-list.style.scss";
import { useNavigate } from "react-router-dom";
import withLoading from "../../../components/with-loading/with-loading";
import { ReactComponent as Delete } from '../../../asset/delete.svg';
import { ReactComponent as Edit } from '../../../asset/edit.svg';
import { deleteStudent } from "../../../firebase/firebase.utils";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../../redux/user/user.selectors";

import { connect } from "react-redux";

import { selectStudentProfileList } from '../../../redux/students-profile/students-profile.selectors';

const WorkbranchList = ({ selectCurrentUser, selectStudentList }) => {
    const navigate = useNavigate();
    const handleDelete = (event) => {
        if (!window.confirm("Est ce que vous voulez vraiment supprimer cet élement")) return;
        const { id: studentId } = event.target.closest('.workbranch-page__item');
        deleteStudent(selectCurrentUser.user.uid, studentId);
    }

    const HandleEdit = (event) => {
        const { id } = event.target.closest('.workbranch-page__item');
        navigate('/profile-edit-mode/' + id);
    }

    return (<div className="workbranch-page__list">
        {
            selectStudentList.length === 0 ? <div>Il n y'a pas d'étudiant</div> :
                selectStudentList.map(student => {
                    return <div className="workbranch-page__item" key={student.studentId} id={student.studentId}>
                        <p>{student.nom} {student.prénom}</p>
                        <p>{student.cin}</p>
                        <p>{student.cne}</p>
                        <p>{student.apogée}</p>
                        <div className="buttons">
                            <button className="button bg-edit-color" onClick={HandleEdit}><Edit /></button>
                            <button className="button bg-danger-color" onClick={handleDelete}><Delete /></button>
                        </div>
                    </div>
                })
        }
    </div>)
}

const mapStateToProps = createStructuredSelector({
    selectCurrentUser: selectCurrentUser,
    selectStudentList: selectStudentProfileList
})


export default withLoading(connect(mapStateToProps)(WorkbranchList))