import React from "react";
import logoDiplomaChain from '../../image/logo-diploma-chain.png';
import SignInPopup from "../sign-in-popup/sign-in-popup.components";
import { useState } from "react";
import "./navigation.style.scss";
const Navigation = () => {
    const [showSignInPopup, setShowSignInPopup] = useState(false);
    return (
        <nav className="nav__bar">
            <img src={logoDiplomaChain} alt="diploma chain" className="nav__bar--logo" />
            <ul className="nav__bar--list" style={{ position: "relative" }}>
                <li className="nav__bar--item">home</li>
                <li className="nav__bar--item" onClick={() => { setShowSignInPopup(!showSignInPopup) }}>
                    sign in
                </li>
                {
                    showSignInPopup ? <SignInPopup /> : null
                }
                <li className="nav__bar--item">contact us</li>
                <li className="nav__bar--item">about us</li>
            </ul>
        </nav>
    )
}

export default Navigation;