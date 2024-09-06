import './NavBar.css'

import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

import logo from './../../../images/logo.png'
import accLogo from './../../../images/user.png'

const NavBar = () => {
    const defaultButton = 'nav-btn'
    const activebtn = 'nav-btn nav-btn-active'

    const [btnAcc, setBtnAcc] = useState(0)

    function isAuth() {
        if (localStorage.getItem('usertoken')) {
            setBtnAcc(1)
        }
        else {
            setBtnAcc(0)
        }
    }

    useEffect(() => {
        isAuth()
    }, [])

    return (<div className="nav">
        <div className="logo-block">
            <NavLink to='/' className="logo">
                <img className='logo-img' src={logo}></img>
                <h3>FastClean</h3>
            </NavLink>
        </div>
        <div className="navigation">
            <ul>
                <NavLink to='/' className={({ isActive }) => isActive ? activebtn : defaultButton}>Главная</NavLink>
                <NavLink to='/sales' href="#" className={({ isActive }) => isActive ? activebtn : defaultButton}>Акции</NavLink>
                {/* <a href="#" className="nav-btn">О нас</a> */}
                <a href="#" className="nav-btn">Контакты</a>
            </ul>
        </div>
        <div className="account">
            <NavLink to={btnAcc == 1 ? '/profile' : '/login'}><img className='acc-logo' src={accLogo}></img></NavLink>
        </div>
    </div>);
}

export default NavBar;