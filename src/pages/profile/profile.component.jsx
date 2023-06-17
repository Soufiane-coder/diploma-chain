import React from 'react';
import "./profile.style.scss";
import User from "../../image/user.png";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectProfile } from "../../redux/all-profiles/all-profiles.selectors";
import { useParams } from 'react-router-dom';

const Profile = ({ selectProfile }) => {
    const params = useParams();
    const thisStudent = selectProfile(params.studentId);
    return (
        <div className='profile'>
            <div className="profile__information-perso">
                <img src={User} alt="" className='profile_image' />
                <h1><b>{thisStudent.nom}</b> {thisStudent.prénom}</h1>
            </div>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    selectProfile: selectProfile
})

export default connect(mapStateToProps)(Profile);