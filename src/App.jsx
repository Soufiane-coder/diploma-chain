import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.scss';
import Navigation from './components/navigation/navigation.component';
import Footer from './components/footer/footer.component';
import LandingPage from './pages/landing-page/landing-page.pages';
function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
