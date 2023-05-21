import React from "react";
import User from "../../image/user.png";
import "./card.style.scss";

const Card = () => {
    return (
        <div className="profil-card">
            <img src={User} alt="profile-img" className="profil-card__profile-img" />
            <h2 className="profil-card__name">Nom & Prénom</h2>
            <p>CIN:</p>
            <p>Apogée:</p>
            <p>CNE:</p>
            <p>CNE:</p>
            <button>Voir profile</button>
        </div>
    )
}

export default Card;