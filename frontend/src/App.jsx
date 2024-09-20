import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/desktop/NavBar/NavBar'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import HomePage from './pages/desktop/HomePage/HomePage'
import SalesPage from './pages/desktop/SalesPage/SalesPage'
import RegistrationPage from './pages/desktop/RegistrationPage/RegistrationPage'
import ProfilePage from './pages/desktop/ProfilePage/ProfilePage'
import LoginPage from './pages/desktop/LoginPage/LoginPage'
import useDeviceDetect from './components/useDeviceDetect'
import LoginPageMobile from './pages/mobile/LoginPageMobile'
import HomePageMobile from './pages/mobile/HomePageMobile/HomePageMobile'

function App() {
  const [count, setCount] = useState(0)

  const { isMobile } = useDeviceDetect();
  const { isTablet } = useDeviceDetect();

  return (
    <>
      {isMobile ? <div className="mobile">
        <Router>
          <div className="container">

          </div>
          <Routes>
            <Route path='/' element={<div className='container'><HomePageMobile /></div>} />
            <Route path='/sales' element={<SalesPage />} />
            <Route path='/registration' element={<div className='container'><RegistrationPage /></div>} />
            <Route path='/profile' element={<div className='container'><ProfilePage /></div>} />
            <Route path='/login' element={<div className='container'><LoginPageMobile /></div>} />
          </Routes>
        </Router>
      </div>

        : <div className="App">
          <Router>
            <div className="container">
              <NavBar />
            </div>
            <Routes>
              <Route path='/' element={<div className='container'><HomePage /></div>} />
              <Route path='/sales' element={<SalesPage />} />
              <Route path='/registration' element={<div className='container'><RegistrationPage /></div>} />
              <Route path='/profile' element={<div className='container'><ProfilePage /></div>} />
              <Route path='/login' element={<div className='container'><LoginPage /></div>} />
            </Routes>
          </Router>
        </div>}
    </>
  )
}

export default App
