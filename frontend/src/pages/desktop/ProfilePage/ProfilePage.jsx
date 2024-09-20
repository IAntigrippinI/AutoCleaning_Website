import { useEffect, useState } from 'react';
import './ProfilePage.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminPanel from '../../../components/desktop/AdminPanel/AdminPanel';
import UserPanel from '../../../components/desktop/UserPanel/UserPanel';
import { base_url } from '../../../config';

const ProfilePage = () => {
    const navigate = useNavigate()
    const [userId, setUserId] = useState('')
    const [name, setName] = useState('Load')
    const [phone, setPhone] = useState('Load')
    const [washes, setWashes] = useState('Load')
    const [sales, setSales] = useState('Load')
    const [token, setToken] = useState(localStorage.getItem('usertoken'))
    const [superuser, setSuperuser] = useState(0)

    function getProfile() {
        axios.post(`${base_url}/get_profile`, {
            token: token
        }).then((resp) => {
            setUserId(resp.data.userid)
            setName(resp.data.name)
            setPhone(resp.data.phone)
            setWashes(resp.data.washes)
            setSales(resp.data.sales)
            setSuperuser(resp.data.issuperuser)
            localStorage.setItem('userid', userId)
        })
    }

    useEffect(() => {
        getProfile()
    }, [<UserPanel />])


    function OnClickLeave() {
        localStorage.removeItem('usertoken')
        localStorage.removeItem('userid')
        navigate('/')
        location.reload()
    }

    return (
        <div className="profile-page">
            <div className="user-info">
                <div className="profile-row">
                    <strong>{name}</strong>
                </div>
                <div className="profile-row">
                    <strong>{phone}</strong>
                </div>
                <div className="profile-row">
                    <strong>количество моек: {washes}</strong>
                </div>
                <div className="profile-row">
                    <strong>Размер скидки: {sales * 100}%</strong>
                </div>
                <button onClick={OnClickLeave}>Выйти</button>
            </div>
            <div className="user-history">
                <p>Last wahes</p>
                {superuser ? <AdminPanel /> : <UserPanel />}
            </div>
        </div>
    );
}

export default ProfilePage;