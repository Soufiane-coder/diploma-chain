import React from "react";
import HomeCard from "../../../components/home-card/home-card.component";
import Security from '../../../image/cyber-security.png';
import Chain from '../../../image/link.png';
import Search from '../../../image/search.png';
import "./cards-section.style.scss";

const cardsInformations = [
    {
        key: 1,
        logo: Chain,
        description: "Révolutionnez la délivrance des diplômes universitaires grâce à la technologie blockchain !"
    },
    {
        key: 2,
        logo: Security,
        description: "Traçabilité complète des parcours académiques"
    },
    {
        key: 3,
        logo: Search,
        description: "Vérifiez facilement l'existence et l'authenticité des diplômes"
    }
]
const CardSection = () => {
    return (
        <div className="cards-section">
            {
                cardsInformations.map((card) => {
                    return <HomeCard {...card} />
                })
            }
        </div>
    )
}

export default CardSection;