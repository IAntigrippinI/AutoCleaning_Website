import './RegistrationPage.css'

import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useEffect, useState } from 'react';
const RegistrationPage = () => {

    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [alert, setAlert] = useState('')
    const [alertPassword, setAlertPassword] = useState(0)


    useEffect(() => {

    }, [setAlertPassword])

    function onClickRegistr() {
        if (password == repeatPassword && name.length != 0 && phone.length != 0 && password.length != 0) {
            axios.post('http://localhost:8000/register', {
                name: name,
                phone: phone,
                password: password,
            }).then((resp) => {
                if (resp.data.message == 'incorrect password') {
                    setAlert(resp.data.message)
                }
                else {
                    localStorage.setItem('usertoken', resp.data.message)
                    navigate('/profile')
                    location.reload()
                }
            })

        }
        else {
            if (name.length != 0 && phone.length != 0 && password.length != 0) {
                setAlert('Заполните все поля')
            }
            setAlertPassword(1)
        }
    }

    function onChangeName(e) {
        setName(e.target.value)
    }

    function onChangePhone(e) {
        setPhone(e.target.value)
    }

    function onChangePassword(e) {
        setPassword(e.target.value)
    }

    function onChangeRepPassword(e) {
        setRepeatPassword(e.target.value)
        if (password != repeatPassword) {
            setAlertPassword(1)
        }
        else {
            setAlertPassword(0)
        }
    }

    return (
        <div className="register-block">
            <h2>Регистрация</h2>
            <div className="content">
                <div className="row">
                    <p>Имя</p>
                    <input onChange={onChangeName} className="input-line"></input>
                </div>
                <div className="row">
                    <p>Телефон</p>
                    <input onChange={onChangePhone} className="input-line"></input>
                </div>
                <div className="row">
                    <p>Пароль</p>
                    <input onChange={onChangePassword} type='password' className="input-line"></input>
                </div>
                <div className="row">
                    <p>Повторите пароль</p>
                    <input onChange={onChangeRepPassword} type='password' className="input-line"></input>
                    {alertPassword ? <p className='red-alert'>Пароли не совпадают</p> : <></>}
                </div>

            </div>
            <div className="btn-block">
                <button className='reg-btn' onClick={onClickRegistr}>Зарегистрироваться</button>
            </div>
        </div>

    );
}

export default RegistrationPage;