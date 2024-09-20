import { NavLink, useNavigate } from 'react-router-dom'
import './LoginPageMobile.css'
import { useEffect, useState } from 'react'
import axios from 'axios'

const LoginPageMobile = () => {
    const navigate = useNavigate()

    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [alert, setAlert] = useState('')
    const [isAlert, setIsAlert] = useState(0)

    function isAuth() {
        if (localStorage.getItem('usertoken')) {
            navigate('/profile')
        }
    }

    useEffect(() => {
        isAuth()
    }, [])


    function OnClickLoginPhone() {
        // setAlert('Hihihihihih')
        axios.get('http://127.0.0.1:8432/status').then((resp) => {
            setAlert('OK')
        })
        // setAlert('AfterReq')
    }
    return (

        <div className="login-mobile">
            <div className="row-log-mob">
                <p>Телефон</p>
                <input></input>
            </div>
            <div className="row-log-mob">
                <p>Пароль</p>
                <input></input>
            </div>
            <a className='btn-log-mob' onClick={OnClickLoginPhone}>Click Me</a>
            <p>{alert}</p>
        </div>
    )
}

export default LoginPageMobile;