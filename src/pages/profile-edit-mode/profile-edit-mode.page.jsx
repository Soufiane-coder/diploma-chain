import React, { useState } from 'react';
import "./profile-edit-mode.style.scss";
import SemesterContainer from '../../components/semester-container/semester-container.component';
import { ReactComponent as Check } from '../../asset/check.svg';
import { ReactComponent as Close } from '../../asset/close.svg';
import { ReactComponent as Add } from '../../asset/add.svg';

import User from '../../image/user.png';
const ProfileEditMode = () => {
    const [profile, setProfile] = useState({ semester: [] });

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(event)
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
                                <input id="last-name" type="text" className='forme-input-text' />
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
                    <SemesterContainer />
                    <button type="button" className="add-semester btn-background">
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

export default ProfileEditMode;