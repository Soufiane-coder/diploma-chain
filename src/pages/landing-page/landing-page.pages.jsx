import React from "react";
import "./landing-page.style.scss";
import Header from "../../layout/landing-page/header/header.layout";
import CardSection from "../../layout/landing-page/cards-section/cards-section.layout";
const LandingPage = () => {
    return (
        <main className="landing-page">
            <Header />
            <CardSection />
        </main>
    )
}
export default LandingPage;