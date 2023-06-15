import React, { useEffect, useState } from 'react';
import "./profile-edit-mode.style.scss";
import SemesterContainer from '../../components/semester-container/semester-container.component';
import { ReactComponent as Check } from '../../asset/check.svg';
import { ReactComponent as Close } from '../../asset/close.svg';
import { ReactComponent as Add } from '../../asset/add.svg';
import User from '../../image/user.png';
import { useNavigate, useParams } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { selectStudentProfileList } from '../../redux/students-profile/students-profile.selectors';
import { connect } from 'react-redux';
import { setStudentList } from '../../redux/students-profile/students-profile.action';
import { selectSemesters } from '../../redux/students-profile/students-profile.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectStudent } from '../../redux/students-profile/students-profile.selectors';
import withLoading from '../../components/with-loading/with-loading';
import _ from 'lodash';

const ProfileEditMode = ({ selectStudentProfileList, selectStudent, setStudentList }) => {
    const params = useParams();
    const navigate = useNavigate();

    const [studentProfile, setStudentProfile] = useState(_.cloneDeep(selectStudent(params.studentId)));

    useEffect(() => {
        setTimeout(() => {
            setStudentProfile(_.cloneDeep(selectStudent(params.studentId)))
        }, 1000); // this has to change
    }, [])

    useEffect(() => {

        if (studentProfile?.semesters?.length === 0) {
            studentProfile.semesters.push({ semester: 1, modules: [] })
            setStudentProfile({ ...studentProfile });
        }
    }, [studentProfile]);


    const handleSubmit = (event) => {
        event.preventDefault();
        const index = selectStudentProfileList.indexOf(selectStudent(params.studentId));
        selectStudentProfileList[index] = { ...studentProfile }
        setStudentList([...selectStudentProfileList]);
        navigate('/workbranch');
        alert("succés");

    }

    const handleAddingSemester = () => {

    }

    const handleChange = (event) => {
        const { name: attributeName, value: newAttributeValue } = event.target;
        setStudentProfile({ ...studentProfile, [attributeName]: newAttributeValue });
    }
    const handleCancel = (event) => {
        event.preventDefault();
        if (!window.confirm("voutre informations de ce profile va être pérdu, tu veux continuer l'annulation")) return
        navigate('/workbranch');
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
                                <label htmlFor="extra">Extra:</label>
                            </div>
                            <div className="description-personel__inputs">
                                <input id="last-name" name="nom" type="text" className='forme-input-text' value={studentProfile.nom} onChange={handleChange} />
                                <input id="first-name" type="text" className='forme-input-text' name="prénom"
                                    value={studentProfile.prénom} onChange={handleChange} />
                                <input id="cin" type="text" className='forme-input-text' name="cin"
                                    value={studentProfile.cin} onChange={handleChange} />
                                <input id="cne" type="text" className='forme-input-text' name="cne" value={studentProfile.cne} onChange={handleChange} />
                                <input id="apogée" type="text" className='forme-input-text' name="apogée"
                                    value={studentProfile.apogée} onChange={handleChange} />
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
                                <input id="extra" type="text" name="extra" className='forme-input-text' onChange={handleChange} />
                            </div>
                        </div>

                    </div>
                </div>
                <div className="profile__notes">
                    {
                        studentProfile?.semesters?.map(item => (
                            <SemesterContainer
                                {...{
                                    studentId: params.studentId,
                                    key: item.semester,
                                    semesterNum: item.semester,
                                    studentProfile,
                                    setStudentProfile,
                                    semesterId: item.semester
                                }}
                            />
                        ))
                    }
                    <button type="button" className="add-semester btn-background" onClick={handleAddingSemester}>
                        <Add />Ajouter semestre
                    </button>
                </div>
            </div>
            <div className="button-section">
                <button className='button-section__confirme btn-background'><Check />Confirmer</button>
                <button className='button-section__cancel btn-background' onClick={handleCancel}><Close />Annuler</button>
            </div>
        </form>
    )
}

const mapStateToProps = createStructuredSelector({
    selectStudentProfileList: selectStudentProfileList,
    selectSemesters: selectSemesters,
    selectCurrentUser: selectCurrentUser,
    selectStudent: selectStudent,
    semesters: selectSemesters
})

const mapDispatchToProps = dispatch => ({
    setStudentList: studentList => dispatch(setStudentList(studentList))
})

export default withLoading(connect(mapStateToProps, mapDispatchToProps)(ProfileEditMode));