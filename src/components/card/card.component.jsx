import React from "react";
import { useNavigate } from "react-router-dom";
import User from "../../image/user.png";
import "./card.style.scss";

const Card = ({ student }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/profile/${student.studentId}`);
    }
    return (
        <div className="profil-card">
            <img src={User} alt="profile-img" className="profil-card__profile-img" />
            <h2 className="profil-card__name"><b>{student.nom}</b> {student.prénom}</h2>
            <p>CIN: {student?.cin}</p>
            <p>Apogée: {student?.apogée}</p>
            <p>CNE: {student?.cne}</p>
            {/* <p>CNE:</p> */}
            <button onClick={handleClick}>Voir profile</button>
        </div>
    )
}

export default Card;