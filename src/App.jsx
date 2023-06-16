import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import './App.scss';
import Navigation from './components/navigation/navigation.component';
import Footer from './components/footer/footer.component';
import LandingPage from './pages/landing-page/landing-page.pages';
import { useEffect, useState } from 'react';
import ProfilePage from './pages/profiles/profiles.page';
import "./firebase/firebase.utils";
import WorkbranchPage from './pages/workbranch/workbranch.page';
import { selectCurrentUser } from './redux/user/user.selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ProfileEditMode from './pages/profile-edit-mode/profile-edit-mode.page';
import { getStudents } from './firebase/firebase.utils';
import { setStudentList } from './redux/students-profile/students-profile.action';
import { EthProvider } from "./contexts/EthContext";
import ContractBtns from './components/test-blockchain/ContractBtns';

function App({ selectCurrentUser, setStudentList }) {

  useEffect(() => {
    const studentInformations = async () => {
      const students = await getStudents(selectCurrentUser.user.uid);
      setStudentList(students);
    }
    studentInformations();
  }, []);

  document.addEventListener('scroll', () => {
    setNavChanged(!window.pageYOffset)
  })

  const [navChanged, setNavChanged] = useState(true);
  const [showSignInPopup, setShowSignInPopup] = useState(false);
  const [searchField, setSearchField] = useState("");
  return (
    <BrowserRouter>
      <Navigation navChanged={navChanged} showSignInPopup={showSignInPopup} setShowSignInPopup={setShowSignInPopup} />
      <Routes >
        <Route path="/" element={<LandingPage
          setShowSignInPopup={setShowSignInPopup}
          searchField={searchField}
          setSearchField={setSearchField}
        />} />

        <Route path="/profiles" element={<ProfilePage
          setShowSignInPopup={setShowSignInPopup}
          searchField={searchField}
          setSearchField={setSearchField}
        />} />

        <Route path="/workbranch" element={selectCurrentUser ? <WorkbranchPage /> : <Navigate to="/" replace />} />

        <Route path="/profile-edit-mode/:studentId" element={selectCurrentUser ? <EthProvider><ProfileEditMode /></EthProvider> : <Navigate to="/" replace />} />

        <Route path='/add-profile' element={selectCurrentUser ? <EthProvider><ProfileEditMode /></EthProvider> : <Navigate to="/" replace />} />

        <Route path="/test-blockchain" element={<ContractBtns />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

const mapStateToProps = createStructuredSelector({
  selectCurrentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setStudentList: students => dispatch(setStudentList(students))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
