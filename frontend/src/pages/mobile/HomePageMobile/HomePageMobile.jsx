import { useState } from 'react';
import './HomePageMobile.css'

const HomePageMobile = () => {

    function OnClickMobile() {
        setAlert('Hihihihihihihihiohihih')
    }

    const [alert, setAlert] = useState('')
    return (
        <div className="home-page-mobile">
            <strong>Не просто мойка,<br></br> а <strong className="blue-text-mobile">полный уход</strong> <br></br>за вашим авто!</strong>
            <button onClick={OnClickMobile}>Click ME!!!</button>
            <div>{alert}</div>
        </div>
    );
}

export default HomePageMobile;