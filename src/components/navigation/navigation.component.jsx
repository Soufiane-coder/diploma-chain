import React from "react";
import logoDiplomaChain from '../../image/logo-diploma-chain.png';
import "./navigation.style.scss";
const Navigation = () => {
    return (
        <nav className="nav__bar">
            <img src={logoDiplomaChain} alt="diploma chain" className="nav__bar--logo" />
            <ul className="nav__bar--list">
                <li className="nav__bar--item">home</li>
                <li className="nav__bar--item">sign in</li>
                <li className="nav__bar--item">contact us</li>
                <li className="nav__bar--item">about us</li>
            </ul>
        </nav>
    )
}

export default Navigation;