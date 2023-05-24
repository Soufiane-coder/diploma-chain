import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.scss';
import Navigation from './components/navigation/navigation.component';
import Footer from './components/footer/footer.component';
import LandingPage from './pages/landing-page/landing-page.pages';
import { useState } from 'react';
import ProfilePage from './pages/profiles/profiles.page';
import "./firebase/firebase.utils";
import WorkbranchPage from './pages/workbranch/workbranch.page';

function App() {
  const [showSignInPopup, setShowSignInPopup] = useState(false);
  const [searchField, setSearchField] = useState("");
  return (
    <BrowserRouter>
      <Navigation showSignInPopup={showSignInPopup} setShowSignInPopup={setShowSignInPopup} />
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
        <Route path="/workbranch" element={<WorkbranchPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
