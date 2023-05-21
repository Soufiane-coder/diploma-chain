import React from "react";
import "./landing-page.style.scss";
import Header from "../../layout/landing-page/header/header.layout";
import CardSection from "../../layout/landing-page/cards-section/cards-section.layout";
import UniversitySection from "../../layout/landing-page/university-section/university-section.layout";
import MoroccoSection from "../../layout/landing-page/morocco-section/morocco-section.layout";
const LandingPage = () => {
    return (
        <main className="landing-page">
            <Header />
            <CardSection />
            <UniversitySection />
            <MoroccoSection />
        </main>
    )
}
export default LandingPage;