import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation
} from 'react-router-dom';
import './App.css';
import Headers from './Headers/Headers.jsx';
import HomePage from './Contents/HomePage.jsx';
import Certifications from './Contents/Certifications.jsx';
import ITskills from './Contents/ITskills.jsx';
import ScrollHandler from './more-stuff/ScrollHandler.jsx';
import ITProjects from './Contents/ITProjects.jsx';
import ParentProjectPages from './Contents/ProjectPages/ParentProjectPages/ParentProjectPages.jsx';
import Footers from './Footers/Footers.jsx';
import WebSkills from './Contents/WebSkills.jsx';
import WebProjects from './Contents/WebProjects.jsx';
import About from './other-stuff-in-headers/About.jsx';

function App() {
  const [checkScrolledStart, setCheckScrolledStart] = useState(1);

  return (
    <Router>
      {/* If you have your own scroll restoration logic, you can uncomment below */}
      {/* <UseScrollRestoration /> */}
      <ScrollHandler
        checkScrolledStart={checkScrolledStart}
        setCheckScrolledStart={setCheckScrolledStart}
      />
      <Headers />
      <Routes>
        <Route
          exact
          path="/home"
          element={
            <HomeLayout
              checkScrolledStart={checkScrolledStart}
              setCheckScrolledStart={setCheckScrolledStart}
            />
          }
        />
        <Route exact path="/about" element={<About />} />
        {/* This one route covers both normal (static) projects AND dynamic blogs */}
        <Route exact path="/project/:projectName" element={<ParentProjectPages />} />
        <Route exact path="/" element={<Navigate to="/home" />} />
        <Route exact path="*" element={<NotFound />} />
      </Routes>
      <Footers />
    </Router>
  );
}

const HomeLayout = ({ checkScrolledStart, setCheckScrolledStart }) => {
  return (
    <>
      <HomePage
        checkScrolledStart={checkScrolledStart}
        setCheckScrolledStart={setCheckScrolledStart}
      />
      <div id="all-main-section-parent">
        <Certifications />
        <ITskills />
        <ITProjects />
        <WebSkills />
        <WebProjects />
      </div>
    </>
  );
};

function NotFound() {
  const pageNotFoundStyle = {
    height: '100vh',
    width: '100vw',
    display: 'grid',
    placeContent: 'center',
    color: 'var(--secondary-color)'
  };
  return (
    <div style={pageNotFoundStyle}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
}

/** Optional scroll-restoration logic. If you use it, uncomment in <App>. */
const UseScrollRestoration = () => {
  const location = useLocation();
  if (location.pathname !== '/home') {
    return;
  }
  useEffect(() => {
    const savedPositions = JSON.parse(sessionStorage.getItem('scrollPositions')) || {};
    const currentPath = location.pathname;

    if (savedPositions[currentPath]) {
      window.scrollTo(0, savedPositions[currentPath]);
    }

    const handleScroll = () => {
      savedPositions[currentPath] = window.scrollY;
      sessionStorage.setItem('scrollPositions', JSON.stringify(savedPositions));
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location]);
};

export default App;
