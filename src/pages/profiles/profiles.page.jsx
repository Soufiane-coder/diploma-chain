import React from "react";
import SearchBar from "../../components/search-bar/search-bar.component";
import CardList from "../../layout/profiles/card-list.layout";
import "./profiles.style.scss";

const ProfilePage = ({ setShowSignInPopup, ...otherProps }) => {
    return (
        <div className="profile-page" onClick={() => setShowSignInPopup(false)}>
            <SearchBar {...otherProps} />
            <CardList />
        </div>
    )
}

export default ProfilePage;