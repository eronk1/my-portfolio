import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import Headers from './Headers/Headers.jsx'
import HomePage from './Contents/HomePage.jsx'
import Certifications from './Contents/Certifications.jsx'
import ITskills from './Contents/ITskills.jsx'
import ScrollHandler from './more-stuff/ScrollHandler.jsx'
import ITProjects from './Contents/ITProjects.jsx'
import ParentProjectPages from './Contents/ProjectPages/ParentProjectPages/ParentProjectPages.jsx'
import Footers from './Footers/Footers.jsx'
import WebSkills from './Contents/WebSkills.jsx'
import WebProjects from './Contents/WebProjects.jsx'

function App() {
  const [currentPage, setCurrentPage] = useState('Home')
  const [checkScrolledStart, setCheckScrolledStart] = useState(1);
  
  return (
    <Router>
      {checkScrolledStart!=2 &&
        <ScrollHandler setCheckScrolledStart={setCheckScrolledStart} />
      }
      <Headers currentPage={currentPage} />
      <Routes>
        <Route exact path='/home' element={ <HomeLayout checkScrolledStart={checkScrolledStart} setCheckScrolledStart={setCheckScrolledStart}/> } />
        <Route exact path='/project/:projectName' element={<ParentProjectPages />} />
        <Route exact path='*' element={<Navigate to='/home' />} />
      </Routes>
      <Footers />
    </Router>
  )
}

const HomeLayout = ({ checkScrolledStart, setCheckScrolledStart }) => {

  return (
    <>
      <HomePage checkScrolledStart={checkScrolledStart} setCheckScrolledStart={setCheckScrolledStart}/>
      <div id='all-main-section-parent'>
        <Certifications />
        <ITskills />
        <ITProjects />
        <WebSkills />
        <WebProjects />
      </div>
    </>
  );
};

export default App
