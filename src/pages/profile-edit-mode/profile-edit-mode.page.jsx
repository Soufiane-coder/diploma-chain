import React, { useEffect } from 'react';
import "./profile-edit-mode.style.scss";
import SemesterContainer from '../../components/semester-container/semester-container.component';
import { ReactComponent as Check } from '../../asset/check.svg';
import { ReactComponent as Close } from '../../asset/close.svg';
import { ReactComponent as Add } from '../../asset/add.svg';
import User from '../../image/user.png';
import { useParams } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { selectStudentProfileList } from '../../redux/students-profile/students-profile.selectors';
import { connect } from 'react-redux';
import { addSemesterToStudentProfileList } from '../../redux/students-profile/students-profile.action';
import { selectSemesters } from '../../redux/students-profile/students-profile.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectStudent } from '../../redux/students-profile/students-profile.selectors';
import { changeAttribut } from '../../redux/students-profile/students-profile.action';

const ProfileEditMode = ({ selectStudentProfileList, addSemesterToStudentProfileList, selectSemesters, selectCurrentUser, selectStudent, changeAttribut }) => {
    const params = useParams();
    useEffect(() => {
        // addSemesterToStudentProfileList(params.studentId);
        // console.log("semester", selectStudentProfileList.find(item => item.studentId === params.studentId));

    }, []);


    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log("semesters", selectStudentProfileList.find(item => item.studentId === params.studentId).semesters);
        // console.log(selectStudentProfileList);
        // console.log(event)
    }

    const handleAddingSemester = () => {
        addSemesterToStudentProfileList(params.studentId);
        // console.log(semester);
    }

    const handleChange = (event) => {
        const { name: attributeName, value: newAttributeValue } = event.target;
        changeAttribut(params.studentId, attributeName, newAttributeValue);
    }

    return (
        <form className="profile-edit-mode" onSubmit={handleSubmit}>
            <div className="button-section">
                <button className='button-section__confirme btn-background'><Check />Confirmer</button>
                <button className='button-section__cancel btn-background'><Close />Annuler</button>
            </div>
            <div className="profile">
                <div className="profile__header">
                    <div className="img-section">
                        <img src={User} />
                        <label className="upload-button btn-background" htmlFor="upload-image">Upload File</label>
                        <input id="upload-image" type="file" />
                    </div>
                    <div className="description-personel">
                        <h1 className='description-personel__titre'>Informations Personel</h1>
                        <div className="informations">
                            <div className="description-personel__labels">
                                <label htmlFor="last-name">Nom:</label>
                                <label htmlFor="first-name">Prénom:</label>
                                <label htmlFor="cin">CIN:</label>
                                <label htmlFor="cne">CNE:</label>
                                <label htmlFor="apogée">Apogée:</label>
                                <label htmlFor="genre">Genre:</label>
                                <label htmlFor="genre">Genre:</label>
                            </div>
                            <div className="description-personel__inputs">
                                <input id="last-name" name="nom" type="text" className='forme-input-text' value={selectStudent(params.studentId).nom} onChange={handleChange} />
                                <input id="first-name" type="text" className='forme-input-text' />
                                <input id="cin" type="text" className='forme-input-text' />
                                <input id="cne" type="text" className='forme-input-text' />
                                <input id="apogée" type="text" className='forme-input-text' />
                                <div className="radio-container">
                                    <div className="radio-wrapper">
                                        <label className="radio-button">
                                            <input type="radio" name="radio-group" id="option1" />
                                            <span className="radio-checkmark"></span>
                                            <span className="radio-label">Homme</span>
                                        </label>
                                    </div>

                                    <div className="radio-wrapper">
                                        <label className="radio-button">
                                            <input type="radio" name="radio-group" id="option2" />
                                            <span className="radio-checkmark"></span>
                                            <span className="radio-label">Femme</span>
                                        </label>
                                    </div>
                                </div>
                                <input id="apogée" type="text" className='forme-input-text' />
                            </div>
                        </div>

                    </div>
                </div>
                <div className="profile__notes">
                    {
                        selectSemesters(params.studentId)?.map(item => (
                            <SemesterContainer studentId={params.studentId} key={item.semester} semesterNum={item.semester} />
                        ))
                    }
                    <button type="button" className="add-semester btn-background" onClick={handleAddingSemester}>
                        <Add />Ajouter semestre
                    </button>
                </div>
            </div>
            <div className="button-section">
                <button className='button-section__confirme btn-background'><Check />Confirmer</button>
                <button className='button-section__cancel btn-background'><Close />Annuler</button>
            </div>
        </form>
    )
}

const mapStateToProps = createStructuredSelector({
    selectStudentProfileList: selectStudentProfileList,
    selectSemesters: selectSemesters,
    selectCurrentUser: selectCurrentUser,
    selectStudent: selectStudent
})

const mapDispatchToProps = dispatch => ({
    // addStudentToList: students => dispatch(addStudentToList(students)),
    addSemesterToStudentProfileList: student => dispatch(addSemesterToStudentProfileList(student)),
    changeAttribut: (studentId, attributeName, newAttributeValue) => dispatch(changeAttribut(studentId, attributeName, newAttributeValue))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEditMode);