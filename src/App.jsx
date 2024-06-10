import { useState } from 'react'
import './App.css'
import Headers from './Headers/Headers.jsx'
import HomePage from './Contents/HomePage.jsx'
import Certifications from './Contents/Certifications.jsx'
import ITskills from './Contents/ITskills.jsx'
function App() {
  const [currentPage, setCurrentPage] = useState('Home')

  return (
    <div>
      <Headers currentPage={currentPage} />
      <HomePage />
      <div id='all-main-section-parent' style={{ transform: `translateY(-${scrollY}px)`}}>
        <Certifications />
        <ITskills />
      </div>
    </div>
  )
}

export default App
