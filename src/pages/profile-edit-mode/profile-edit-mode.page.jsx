import React, { useEffect, useState } from 'react';
import "./profile-edit-mode.style.scss";
import SemesterContainer from '../../components/semester-container/semester-container.component';
import { ReactComponent as Check } from '../../asset/check.svg';
import { ReactComponent as Close } from '../../asset/close.svg';
import { ReactComponent as Add } from '../../asset/add.svg';
import User from '../../image/user.png';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
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
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const ProfileEditMode = ({ selectStudentProfileList, selectStudent, setStudentList, selectCurrentUser, addStudentToList }) => {
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();


    const { state: { contract, accounts } } = useEth(); // concern the blockchain

    const isAddingPage = location.pathname === '/add-profile';

    const initialStudent = isAddingPage ? { studentId: "", cin: "", cne: "", apogée: "", nom: "", prénom: "", semesters: [{ modules: [{ id: 1, moduleName: "", note: "" }], semester: 1 }] } : _.cloneDeep(selectStudent(params.studentId));



    const [studentProfile, setStudentProfile] = useState(initialStudent);

    const [levelsOfDiploma, setLevelsOfDiploma] = useState([]);

    const [inputRef, setInputRef] = useState({ deug: "", licence: "", master: "" });

    const storage = getStorage();

    const [imageURL, setImageURL] = useState("");

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
        if (!initialStudent && !isAddingPage) {
            navigate('/student not found');
            return;
        }
        if (contract) {
            const fetchData = async () => {
                const res = await getDiplomesBelongToStudent(studentProfile.cin);

                res?.forEach(item => {
                    setInputRef(prevState => ({ ...prevState, [item.niveau]: item.ref }));
                })
            }
            fetchData();
        }
    }, [contract]);



    useEffect(() => {
        if (!initialStudent && !isAddingPage) {
            return;
        }
        const getImage = async () => {
            try {
                const storageRef = ref(storage, 'images/' + params.studentId);
                setImageURL(await getDownloadURL(storageRef));
            }
            catch (err) {
                console.error(err);
            }
        }
        getImage();
        setTimeout(() => {
            setStudentProfile(initialStudent);
            updateLevelsDiploma();
            // console.log(levelsOfDiploma);
        }, 1000); // this has to change
    }, [])

    useEffect(() => {
        if (!initialStudent && !isAddingPage) {
            return;
        }
        if (studentProfile?.semesters?.length === 0) {
            studentProfile.semesters.push({ semester: 1, modules: [] })
            setStudentProfile({ ...studentProfile });
        }
    }, [studentProfile]);


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!isAllInputsFilled()) {
            alert("Fill all field");
            return;
        }
        const index = selectStudentProfileList.indexOf(selectStudent(params.studentId));
        selectStudentProfileList[index] = { ...studentProfile }
        setStudentList([...selectStudentProfileList]);

        if (isAddingPage) {
            studentProfile.studentId = await addProfile(selectCurrentUser.user.uid, studentProfile);
            addStudentToList(studentProfile);
        }
        else {
            await updatingName(selectCurrentUser.user.uid, studentProfile.studentId, studentProfile);
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
        const { name } = event.target;
        try {
            await contract.methods.addDiplome(studentProfile.cin, name + "|" + inputRef[name]).send({ from: accounts[0] });
        } catch (err) {
            console.error(err);
        }
    }

    const handleInputRef = (event) => {
        const { name, value } = event.target;
        setInputRef({ ...inputRef, [name]: value });
    }

    const isAllInputsFilled = () => {
        const allInputs = [...window.document.querySelectorAll('.description-personel input[type="text"]')];
        const searchedInput = allInputs.find(input => input.value === "");
        if (!searchedInput) {
            return true;
        }
        searchedInput.style.borderColor = "red";
        return false;
    }

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        // Create a storage reference
        const storageRef = ref(storage, 'images/' + params.studentId);

        // Upload the image file to the storage reference
        await uploadBytes(storageRef, file);

        // Get the download URL of the uploaded image
        const downloadURL = await getDownloadURL(storageRef);

        setImageURL(downloadURL);
    };



    return (
        <form className="profile-edit-mode" onSubmit={handleSubmit}>
            <div className="button-section">
                <button className='button-section__confirme btn-background'><Check />Confirmer</button>
                <button className='button-section__cancel btn-background' onClick={handleCancel}><Close />Annuler</button>
            </div>
            <div className="profile">
                <div className="profile__header">
                    <div className="img-section">
                        {isAddingPage ? "" : <><img src={imageURL !== "" ? imageURL : User} />
                            <label className="upload-button btn-background" htmlFor="upload-image">Upload File</label>
                            <input id="upload-image" type="file" accept="image/png" onChange={handleImageUpload} /></>}
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