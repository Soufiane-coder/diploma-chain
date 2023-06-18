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
import { Fade } from 'react-reveal';
import { removeStudent } from '../../../redux/students-profile/students-profile.action';

const WorkbranchList = ({ selectCurrentUser, selectStudentList, deleteStudentLocal }) => {
    const navigate = useNavigate();

    const handleDelete = (event) => {
        if (!window.confirm("Est ce que vous voulez vraiment supprimer cet élement")) return;
        const { id: studentId } = event.target.closest('.workbranch-page__item');
        const fetchData = async () => {
            await deleteStudent(selectCurrentUser.user.uid, studentId);
            console.log(studentId);
            deleteStudentLocal(studentId);
        }
        fetchData();
    }

    const HandleEdit = (event) => {
        const { id } = event.target.closest('.workbranch-page__item');
        navigate('/profile-edit-mode/' + id);
    }

    return (<div className="workbranch-page__list">
        {
            selectStudentList.length === 0 ? <div>Il n y'a pas d'étudiant</div> :
                selectStudentList.map(student => {
                    return <Fade key={student.studentId} bottom>
                        <div className="workbranch-page__item" id={student.studentId}>
                            <p>{student.nom} {student.prénom}</p>
                            <p>{student.cin}</p>
                            <p>{student.cne}</p>
                            <p>{student.apogée}</p>
                            <div className="buttons">
                                <button className="button bg-edit-color" onClick={HandleEdit}><Edit /></button>
                                <button className="button bg-danger-color" onClick={handleDelete}><Delete /></button>
                            </div>
                        </div>
                    </Fade>
                })
        }
    </div>)
}

const mapStateToProps = createStructuredSelector({
    selectCurrentUser: selectCurrentUser,
    selectStudentList: selectStudentProfileList
})

const mapDispatchToProps = dispatch => ({
    deleteStudentLocal: studentId => dispatch(removeStudent(studentId))
})


export default withLoading(connect(mapStateToProps, mapDispatchToProps)(WorkbranchList))