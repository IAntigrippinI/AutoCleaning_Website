import { NavLink, useNavigate } from 'react-router-dom'
import './LoginPage.css'
import { useEffect, useState } from 'react'
import axios from 'axios'

const LoginPage = () => {
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

    function onClickLogin() {
        axios.post('http://localhost:8000/login', {
            phone: phone,
            password: password
        }).then((resp) => {
            if (resp.data.log_status == 'OK') {
                localStorage.setItem('usertoken', resp.data.message);
                navigate('/profile')
                location.reload()
            }
            else {
                setAlert(resp.data.message)
                setIsAlert(1)
            }
        })
    }

    function onChangePhone(e) {
        setPhone(e.target.value)
    }

    function onChangePassword(e) {
        setPassword(e.target.value)
    }

    return (<div className="login-block">
        <h2>Вход</h2>
        <div className="content">
            <div className="alert-place">
                {isAlert ? <p className='red-text'>{alert}</p> : <></>}
            </div>
            <div className="row">
                <p>Телефон</p>
                <input onChange={onChangePhone} className="input-line"></input>
            </div>
            <div className="row">
                <p>Пароль</p>
                <input onChange={onChangePassword} type='password' className="input-line"></input>
            </div>


        </div>
        <div className="btn-block-log">
            <button className='reg-btn' onClick={onClickLogin}>Войти</button>

        </div>
        <div className="to-reg">
            <NavLink to='/registration'>Регистрация</NavLink>
        </div>
    </div>);
}

export default LoginPage;