import React from "react";
import "./sign-in-popup.style.scss";
import "../../firebase/firebase.utils";
import { connect } from "react-redux";
import { signInWithEmailAndPasswordAuthed } from "../../firebase/firebase.utils";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { setCurrentUser } from "../../redux/user/user.actions";
import { createStructuredSelector } from "reselect";

const SignInPopup = ({ form, setForm, currentUser, setCurrentUser }) => {

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
        console.log(form);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        signInWithEmailAndPasswordAuthed(form.identifiant, form.password)
            .then((cred) => setCurrentUser(cred))
            .catch((err) => console.log(err.message));
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

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});


export default connect(mapStateToProps, mapDispatchToProps)(SignInPopup);