import React, { useEffect, useState } from 'react';
import "./profile.style.scss";
import User from "../../image/user.png";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectProfile } from "../../redux/all-profiles/all-profiles.selectors";
import { useParams } from 'react-router-dom';
import Diplome from '../../components/diplome/diplome.component';
import useEth from "../../contexts/EthContext/useEth";
import LoadingSpin from '../../components/loading-spin/loading-spin';
import { getStorage, getDownloadURL, ref } from 'firebase/storage';

const Profile = ({ selectProfile }) => {
    const params = useParams();
    const thisStudent = selectProfile(params.studentId);
    const { state: { contract, accounts } } = useEth();

    const [diplomas, setDiplomas] = useState([]);

    const storage = getStorage();
    const [imageURL, setImageURL] = useState();
    useEffect(() => {
        const getImage = async () => {
            const storageRef = ref(storage, 'images/' + params.studentId);
            setImageURL(await getDownloadURL(storageRef));
        }
        getImage();
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            if (contract) {
                const diplomasLocal = await getDiplomesBelongToStudent(thisStudent.cin);
                const diplomasLocalReduced = diplomasLocal?.reduce((result, item) => {
                    result[item.niveau] = item;
                    return result;
                }, {});
                if (Object.values(diplomasLocalReduced).length === 0) {
                    setDiplomas("noDiplome");
                } else
                    setDiplomas(Object.values(diplomasLocalReduced));
            }
        }
        fetchData()
    }, [contract])

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

    return (
        <div className='profile-view'>
            <div className="profile-view__information-perso">
                <div className="profile-view_image"><img src={imageURL !== "" ? imageURL : User} alt="" /></div>
                <h1><b>{thisStudent.nom}</b> {thisStudent.prénom}</h1>
                <ul className='profile-view__information-list'>
                    <li><b>CIN</b> : {thisStudent.cin}</li>
                    <li><b>CNE</b> : {thisStudent.cne}</li>
                    <li><b>Apogée</b> : {thisStudent.apogée}</li>
                </ul>
            </div>
            <div className='education-infromations'>
                <h1 className='title'>Parcours</h1>
                <div className="diplomas-section">
                    {
                        diplomas !== "noDiplome" ? diplomas.length !== 0 ? diplomas.map((diploma, key) => (
                            <Diplome key={key} diplomeNiveau={diploma.niveau} diplomeRef={diploma.ref} />
                        )) : <LoadingSpin /> : <h1>Aucun diplôme</h1>
                    }
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    selectProfile: selectProfile
})

export default connect(mapStateToProps)(Profile);