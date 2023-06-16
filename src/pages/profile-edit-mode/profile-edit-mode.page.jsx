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
import { addStudentToList, setStudentList } from '../../redux/students-profile/students-profile.action';
import { selectSemesters } from '../../redux/students-profile/students-profile.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectStudent } from '../../redux/students-profile/students-profile.selectors';
import withLoading from '../../components/with-loading/with-loading';
import _ from 'lodash';
import { addProfile, getUniversity, updatingName } from '../../firebase/firebase.utils';
import { ReactComponent as Ethereum } from '../../asset/ethereum.svg';
import useEth from "../../contexts/EthContext/useEth";

const ProfileEditMode = ({ selectStudentProfileList, selectStudent, setStudentList, selectCurrentUser, addStudentToList }) => {
    const params = useParams();
    const navigate = useNavigate();

    const { state: { contract, accounts } } = useEth(); // concern the blockchain

    const isAddingPage = Object.keys(params).length === 0;

    const initialStudent = isAddingPage ? { studentId: "", cin: "", cne: "", apogée: "", nom: "", prénom: "", semesters: [{ modules: [{ id: 1, moduleName: "", note: "" }], semester: 1 }] } : _.cloneDeep(selectStudent(params.studentId));

    const [studentProfile, setStudentProfile] = useState(initialStudent);

    const [levelsOfDiploma, setLevelsOfDiploma] = useState([]);

    const [inputRef, setInputRef] = useState({ deug: "", licence: "", master: "" });

    const updateLevelsDiploma = () => {
        if (studentProfile.semesters.length >= 4) {
            if (studentProfile.semesters.some(semester => semester.modules.some(module => +module.note >= 10))) {
                levelsOfDiploma[0] = "deug";
                setLevelsOfDiploma([...levelsOfDiploma]);
            }
            else {
                setLevelsOfDiploma([]);
                return;
            }
            if (studentProfile.semesters.length >= 6) {
                if (studentProfile.semesters.some(semester => semester.modules.some(module => +module.note >= 10))) {
                    levelsOfDiploma[1] = "licence";
                    setLevelsOfDiploma([...levelsOfDiploma]);
                }
                else {
                    setLevelsOfDiploma(["deug"]);
                    return;
                }

                if (studentProfile.semesters.length >= 10) {
                    if (studentProfile.semesters.some(semester => semester.modules.some(module => +module.note >= 10))) {
                        levelsOfDiploma[2] = "master";
                        setLevelsOfDiploma([...levelsOfDiploma]);
                    }
                    else {
                        setLevelsOfDiploma(["deug", "licence"]);
                        return;
                    }
                }
            }
        }
    }



    useEffect(() => {
        console.log(inputRef);
    }, [inputRef]); //

    useEffect(() => {
        setTimeout(() => {
            setStudentProfile(initialStudent);
            updateLevelsDiploma();
            console.log(levelsOfDiploma);
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

        if (isAddingPage) {
            addProfile(selectCurrentUser.user.uid, studentProfile);
            addStudentToList(studentProfile);
        }
        else {
            updatingName(selectCurrentUser.user.uid, studentProfile.studentId, studentProfile);
        }
        navigate('/workbranch');
        alert("succés");
    }

    const handleAddingSemester = () => {
        setStudentProfile({ ...studentProfile, semesters: [...studentProfile.semesters, { semester: studentProfile.semesters.length + 1, modules: [] }] });
    }

    const handleChange = (event) => {
        const { name: attributeName, value: newAttributeValue } = event.target;
        setStudentProfile({ ...studentProfile, [attributeName]: newAttributeValue });
    }

    const handleCancel = (event) => {
        event.preventDefault();
        if (!window.confirm("votre informations de ce profile va être pérdu, tu veux continuer l'annulation")) return;
        navigate('/workbranch');
    }

    const getDiplomesBelongToStudent = async (studentCin) => {
        let diplomes = [];
        const diplomesCount = parseInt(await contract.methods.diplomeCount().call({ from: accounts[0] }), 10);
        for (let i = 0; i < diplomesCount; i++) {
            const diplome = await contract.methods.diplomes(i).call({ from: accounts[0] });
            if (diplome.cin === studentCin) {
                const [niveau, ref] = diplome.niveauRef.split('|');
                diplomes.push({ cin: diplome.cin, niveau, ref });
            }
        }
        return diplomes;
    }

    const handlePushBlockchain = async (event) => {
        event.preventDefault();
        const { level } = event.target;
        const university = await getUniversity(selectCurrentUser.user.uid);
        try {
            // await contract.methods.addDiplome("vD45", `${level}|${inputRef[level]}`).send({ from: accounts[0] });
            // the second argument sould be niveau|ref
            await contract.methods.addDiplome("vD45", "qdlqjf|flqdj").send({ from: accounts[0] });
            const res = await getDiplomesBelongToStudent("vc");
            console.log(res);
        } catch (err) {
            console.error(err);
        }
    }

    const handleInputRef = (event) => {
        const { name, value } = event.target;
        setInputRef({ ...inputRef, [name]: value });
    }


    return (
        <form className="profile-edit-mode" onSubmit={handleSubmit}>
            <div className="button-section">
                <button className='button-section__confirme btn-background'><Check />Confirmer</button>
                <button className='button-section__cancel btn-background' onClick={handleCancel}><Close />Annuler</button>
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
                                    studentProfile,
                                    setStudentProfile,
                                    semesterNum: item.semester
                                }}
                            />
                        ))
                    }
                    <button type="button" className="add-semester btn-background" onClick={handleAddingSemester}>
                        <Add />Ajouter semestre
                    </button>
                </div>
            </div>
            <div className='blockchain-buttons'>
                {
                    levelsOfDiploma.map((level) => (
                        <div className='container' key={`level_${level}`} placeholder="hel">
                            <input type="text" className='forme-input-text' placeholder={`${level} ref`} name={level} value={inputRef[level]} onChange={handleInputRef} />
                            <button className='push-blockchain-btn btn-background' name={level} onClick={handlePushBlockchain}><Ethereum /> Push to Blockchain</button>
                        </div>
                    ))
                }
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
    setStudentList: studentList => dispatch(setStudentList(studentList)),
    addStudentToList: student => dispatch(addStudentToList(student))
})

export default withLoading(connect(mapStateToProps, mapDispatchToProps)(ProfileEditMode));