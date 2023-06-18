import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import LoadingSpin from "../../components/loading-spin/loading-spin";
import SearchBar from "../../components/search-bar/search-bar.component";
import { getStudents, getUsersId } from "../../firebase/firebase.utils";
import CardList from "../../layout/profiles/card-list.layout";
import { setAllProfiles } from "../../redux/all-profiles/all-profiles.action";
import { getStorage, getDownloadURL, ref } from 'firebase/storage';
import "./profiles.style.scss";

const ProfilePage = ({ setShowSignInPopup, searchField, setSearchField, setAllProfiles }) => {
    const params = useParams();
    const [allStudents, setAllStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchedStudents, setSearchedStudents] = useState([]);

    const detectSearching = () => {
        if (/^[0-9]+$/.test(params.search)) {
            return "apogée";
        }
        // Check if the params.search starts with characters and ends with numbers
        if (/^[A-Za-z]+[0-9]+$/.test(params.search)) {
            return "cin";
        }
        // If none of the above conditions are met, assume it contains only characters
        return "nom";
    }

    const typeOfSearch = detectSearching();

    const getImage = async (studentId) => {
        const storageRef = ref(getStorage(), 'images/' + studentId);
        try {
            return await getDownloadURL(storageRef);
        } catch (err) { return undefined }
    }


    const doSearch = async () => {
        if (typeOfSearch === "nom") {
            setSearchedStudents([...allStudents.filter((student) =>
                student.nom === params.search
            ), ...allStudents.filter(student => student.prénom === params.search)]);


        } else {
            setSearchedStudents(allStudents.filter(student => student[typeOfSearch] === params.search));
        }

    }

    useEffect(() => {
        const addingImageAtt = async () => {
            for (let student of searchedStudents) {
                student.imageURL = await getImage(student.studentId);
            }
            setSearchedStudents(old => [...old]);
        }
        if (searchedStudents.length !== 0 && !searchedStudents[0].hasOwnProperty('imageURL')) {
            addingImageAtt();
        }
    }, [searchedStudents])

    useEffect(() => {
        if (!isLoading) {
            setAllProfiles(allStudents);
            doSearch();
        }
    }, [allStudents]);

    useEffect(() => {
        const fetchData = async () => {
            const usersId = await getUsersId();
            for (const userId of usersId) {
                const students = await getStudents(userId);
                setAllStudents(old => [...old, ...students]);
            }
            setIsLoading(false);
        }
        fetchData();
    }, []);

    return (
        <div className="profile-page" onClick={() => setShowSignInPopup(false)}>
            <SearchBar searchField={searchField} setSearchField={setSearchField} setIsLoading={setIsLoading} doSearch={doSearch} />
            {
                isLoading ? <LoadingSpin /> : <CardList searchedStudents={searchedStudents} />
            }
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    setAllProfiles: allStudents => dispatch(setAllProfiles(allStudents))
})

export default connect(null, mapDispatchToProps)(ProfilePage);