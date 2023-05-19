import React from "react";
import { ReactComponent as HeaderIllustration } from '../../../asset/header-illustration.svg';
import "./header.style.scss";

const Header = () => {
    return (
        <header className="header">
            <div className="header__description-general">
                <h1 className="header__big-title">
                    Consulter <span className="header__big-title--primary-color">Diplômes</span> Sur La <span className="header__big-title--secondery-color">Chaîne</span>
                    <div className="header__bar" />
                </h1>

                <div className="search-bar">
                    <input className="search__field" placeholder="Taper le nom prenom ou CIN" type="search" name="" id="" />
                    <button className="search__button">Chercher</button>
                </div>
            </div>
            <div className="header__illustration">
                <HeaderIllustration />
            </div>
        </header>
    )
}

export default Header;