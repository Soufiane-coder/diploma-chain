import React from "react";
import { ReactComponent as HeaderIllustration } from '../../../asset/header-illustration.svg';
import SearchBar from "../../../components/search-bar/search-bar.component";
import "./header.style.scss";

const Header = (props) => {
    return (
        <header className="header">
            <div className="header__description-general">
                <h1 className="header__big-title">
                    Consulter <span className="header__big-title--primary-color">Diplômes</span> Sur La <span className="header__big-title--secondery-color">Chaîne</span>
                    <div className="header__bar" />
                </h1>

                <SearchBar {...props} />
            </div>
            <div className="header__illustration">
                <HeaderIllustration />
            </div>
        </header>
    )
}

export default Header;