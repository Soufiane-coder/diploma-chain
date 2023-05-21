import React from "react";
import "./sign-in-popup.style.scss";

const SignInPopup = ({ form, setForm }) => {
    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
        console.log(form);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(event);
    }

    return (
        <form className="sign-in-popup" onSubmit={handleSubmit} >
            <h1 className="sign-in-popup__title">Se connecter</h1>
            <label htmlFor="identifiant">Identifiant</label>
            <input type="text" name="identifiant" id="identifiant" value={form.identifiant} onChange={handleChange} />
            <label htmlFor="password">Mot de passe</label>
            <input type="password" name="password" id="password" value={form.password} onChange={handleChange} />
            <input type="submit" value="Se connecter" />
            <div className="sign-in-popup__message">
                this message  not be displayed
            </div>
            <div className="sign-in-popup__warning">
                <span className="sign-in-popup__warning--danger">*</span>
                cet inscription est concerné les administrateurs de cette plate forme
                <span className="sign-in-popup__warning--danger">*</span>
            </div>
        </form>
    )
}

export default SignInPopup;