import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/desktop/NavBar/NavBar'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import HomePage from './pages/desktop/HomePage/HomePage'
import SalesPage from './pages/desktop/SalesPage/SalesPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="App">
        <Router>
          <div className="container">
            <NavBar />
          </div>
          <Routes>
            <Route path='/' element={<div className='container'><HomePage /></div>} />
            <Route path='/sales' element={<SalesPage />} />
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
