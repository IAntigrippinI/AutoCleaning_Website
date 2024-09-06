import { useEffect, useState } from 'react';
import './AdminPanel.css'
import axios from 'axios';

const AdminPanel = () => {

    const [phone, setPhone] = useState('')
    const [car, setCar] = useState('')
    const [service, setService] = useState('')
    const [body, setBody] = useState('')
    const [score, setScore] = useState(0)
    const [enteredText, setEnteredText] = useState('')

    function onChangePhone(e) {
        setPhone(e.target.value)
        setEnteredText(e.target.value)
    }

    function onChangeCar(e) {
        setCar(e.target.value)
    }

    function onChangeService(e) {
        setService(e.target.value)
    }

    function onChangeBody(e) {
        setBody(e.target.value)
    }

    useEffect(() => {

    }, [body])


    function onClickCount() {
        axios.post(`http://localhost:8000/get_price`, {
            phone: phone,
            car: car,
            service_name: service,
            body_name: body
        }).then((resp) => {
            setScore(resp.data.price)
        })
    }

    function onClickSave() {
        axios.post(`http://localhost:8000/add_record`, {
            phone: phone,
            car: car,
            service_name: service,
            body_name: body
        }).then((resp) => {
            console.log('Succes')
        })
    }

    function onClickClear() {
        setBody('')
        setCar('')
        setPhone('')
        setService('')
    }

    return (
        <div className="adm-pan">
            <div className="row-add">
                <p>Телефон</p>
                <input onChange={onChangePhone} value={phone} className='input-order'></input>
            </div>
            <div className="row-add">
                <p>Авто</p>
                <input onChange={onChangeCar} value={car} className='input-order'></input>
            </div>
            <div className="row-add">
                <p>Услуга</p>
                <input onChange={onChangeService} value={service} className='input-order'></input>
            </div>
            <div className="row-add">
                <p>Кузов</p>
                <input onChange={onChangeBody} value={body} className='input-order'></input>
            </div>
            <div className="price">Стоимость: {score} руб.</div>
            <div className="btn-adm-block">
                <button onClick={onClickCount} className='btn-adm'>Расчитать</button>
                <button onClick={onClickSave} className='btn-adm'>Сохранить</button>
            </div>
            <div className="btn-adm-block">
                <button onClick={onClickClear} className='btn-adm'>Очистить</button>
            </div>

        </div>
    );
}

export default AdminPanel;