import React from "react";
import { ReactComponent as FlagMorocco } from "../../../asset/flag-morocco.svg";
import "./morocco-section.style.scss";

const MoroccoSection = () => {
    return (
        <div className="morocco-section">
            <h1 className="morocco-section__diploma-chain"><span className="primary-color">DIPLOMA </span><span className="secondery-color1">CHAIN</span></h1>
            <div className="morocco-team">
                <h1 className="morocco-section__moroccan-developed"><span style={{ color: "#C1272D" }}>MOROCCAN </span><span style={{ color: "#006233" }}>DEVELOPED</span></h1>
                <FlagMorocco className="morocco-section__flag-morocco" />
            </div>
        </div>
    )
}

export default MoroccoSection;