import React from "react";
import "./home-card.component.scss";

const HomeCard = ({ logo, description }) => {
    return (
        <div className="card">
            <img src={logo} alt="icon" className="icon" />
            <div className="bar" />
            <div className="description">
                {description}
            </div>
        </div>
    )
}

export default HomeCard;