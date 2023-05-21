import React from "react";
import logoDiplomaChain from '../../image/logo-diploma-chain.png';
import SignInPopup from "../sign-in-popup/sign-in-popup.components";
import { Link } from "react-router-dom";
import "./navigation.style.scss";
import { useState } from "react";
const Navigation = ({ showSignInPopup, setShowSignInPopup }) => {
    const [form, setForm] = useState({
        identifiant: "",
        password: ""
    });
    return (
        <nav className="nav__bar">
            <Link to="/" className="nav__bar--logo"><img src={logoDiplomaChain} alt="diploma chain" className="nav__bar--logo" /></Link>
            <ul className="nav__bar--list" style={{ position: "relative" }}>
                <li className="nav__bar--item">
                    <Link to="/" >home</Link>
                </li>
                <li className="nav__bar--item" onClick={() => { setShowSignInPopup(!showSignInPopup) }}>
                    sign in
                </li>
                {
                    showSignInPopup ? <SignInPopup form={form} setForm={setForm} /> : null
                }
                <li className="nav__bar--item">contact us</li>
                <li className="nav__bar--item">about us</li>
            </ul>
        </nav>
    )
}

export default Navigation;