import { useState, useEffect } from 'react'
import './App.css'
import Headers from './Headers/Headers.jsx'
import HomePage from './Contents/HomePage.jsx'
import Certifications from './Contents/Certifications.jsx'
import ITskills from './Contents/ITskills.jsx'
import ScrollHandler from './more-stuff/ScrollHandler.jsx'
import ITProjects from './Contents/ITProjects.jsx'
function App() {
  const [currentPage, setCurrentPage] = useState('Home')
  const [checkScrolledStart, setCheckScrolledStart] = useState(1);

  return (
    <div>
      <ScrollHandler setCheckScrolledStart={setCheckScrolledStart} />
      <Headers currentPage={currentPage} />
      <HomePage back checkScrolledStart={checkScrolledStart} />
      <div id='all-main-section-parent'>
        <Certifications />
        <ITskills />
        <ITProjects />
      </div>
    </div>
  )
}

export default App
