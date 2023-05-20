import React from "react";
import "./sign-in-popup.style.scss";

const SignInPopup = () => {
    return (
        <div className="sign-in-popup">
            <h1 className="sign-in-popup__title">Se connecter</h1>
            <label htmlFor="identifiant">Identifiant</label>
            <input type="text" name="identifiant" id="identifiant" />
            <label htmlFor="mot-de-passe">Mot de passe</label>
            <input type="text" name="mot-de-passe" id="mot-de-passe" />
            <input type="submit" value="Se connecter" />
            <div className="sign-in-popup__message">
                this message  not be displayed
            </div>
            <div className="sign-in-popup__warning">
                <span className="sign-in-popup__warning--danger">*</span>
                cet inscription est concerné les administrateurs de cette plate forme
                <span className="sign-in-popup__warning--danger">*</span>
            </div>
        </div>
    )
}

export default SignInPopup;