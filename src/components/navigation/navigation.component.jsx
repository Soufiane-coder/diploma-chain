import React from "react";
import logoDiplomaChain from '../../image/logo-diploma-chain.png';
import SignInPopup from "../sign-in-popup/sign-in-popup.components";
import { Link } from "react-router-dom";
import "./navigation.style.scss";
import { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { signOutAuthed } from "../../firebase/firebase.utils";
import { setCurrentUser } from "../../redux/user/user.actions";

const Navigation = ({ showSignInPopup, setShowSignInPopup, currentUser, setCurrentUser }) => {
    const [form, setForm] = useState({
        identifiant: "",
        password: ""
    });

    const handleSignOut = () => {
        signOutAuthed()
            .then(() => {
                console.log(setCurrentUser(null));
            })
            .catch((err) => console.log(err.message));
    }
    return (
        <nav className="nav__bar">
            <Link to="/" className="nav__bar--logo"><img src={logoDiplomaChain} alt="diploma chain" className="nav__bar--logo" /></Link>
            <ul className="nav__bar--list" style={{ position: "relative" }}>
                <li className="nav__bar--item">
                    <Link to="/" >acceuil</Link>
                </li>
                {
                    currentUser ?
                        <>
                            <li className="nav__bar--item"><Link to="/workbranch" >branche de travaille</Link></li>
                            <li className="nav__bar--item" onClick={handleSignOut}>
                                se deconnecter
                            </li>
                        </> : <li className="nav__bar--item" onClick={() => { setShowSignInPopup(!showSignInPopup) }}>
                            se connecter
                        </li>
                }
                {
                    showSignInPopup && !currentUser ? <SignInPopup form={form} setForm={setForm} /> : null
                }

                <li className="nav__bar--item">contacte</li>
                <li className="nav__bar--item">à propos</li>
            </ul>
        </nav>
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);