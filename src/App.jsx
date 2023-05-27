import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import './App.scss';
import Navigation from './components/navigation/navigation.component';
import Footer from './components/footer/footer.component';
import LandingPage from './pages/landing-page/landing-page.pages';
import { useState } from 'react';
import ProfilePage from './pages/profiles/profiles.page';
import "./firebase/firebase.utils";
import WorkbranchPage from './pages/workbranch/workbranch.page';
import { selectCurrentUser } from './redux/user/user.selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ProfileEditMode from './pages/profile-edit-mode/profile-edit-mode.page';

function App({ currentUser }) {
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
        <Route path="/workbranch" element={currentUser ? <WorkbranchPage /> : <Navigate to="/" replace />} />
        <Route path="/profile-edit-mode" element={<ProfileEditMode />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

export default connect(mapStateToProps)(App);
