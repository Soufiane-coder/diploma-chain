import React, { useState } from "react";
import "./sign-in-popup.style.scss";
import "../../firebase/firebase.utils";
import { connect } from "react-redux";
import { signInWithEmailAndPasswordAuthed } from "../../firebase/firebase.utils";
import { setCurrentUser } from "../../redux/user/user.actions";

const SignInPopup = ({ form, setForm, setCurrentUser }) => {

    const [message, setMessage] = useState("");

    const handleChange = (event) => {
        setMessage("");
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
        console.log(form);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        signInWithEmailAndPasswordAuthed(form.identifiant, form.password)
            .then((cred) => { setCurrentUser(cred); window.location.href = '/workbranch'; })
            .catch((err) => setMessage("email/mot de passe incorrecte"));

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
                {message}
            </div>
            <div className="sign-in-popup__warning">
                <span className="sign-in-popup__warning--danger">*</span>
                cet inscription est concerné les administrateurs de cette plate forme
                <span className="sign-in-popup__warning--danger">*</span>
            </div>
        </form>
    )
}

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});


export default connect(null, mapDispatchToProps)(SignInPopup);