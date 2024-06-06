import { useState } from 'react'
import './App.css'
import Headers from './Headers/Headers.jsx'
import HomePage from './Contents/HomePage.jsx'
function App() {
  const [currentPage, setCurrentPage] = useState('Home')

  return (
    <div>
      <Headers currentPage={currentPage} />
      <HomePage />
    </div>
  )
}

export default App
