import { NavLink } from 'react-router-dom';
import './HomePage.css'
import { useEffect } from 'react';

const HomePage = () => {

    function isCookies() {
        if (document.cookies) {

        }
        else {
            setCookies()
        }
    }

    function setCookies() {
        document.cookie = 'usertoken=DDDDD'
    }

    const getCookies = () => {
        let cookies = document.cookie
        console.log(cookies)
    }

    useEffect(() => {
        isCookies();
        getCookies()
    }, [])

    return (
        <div className="home-block">
            <div className="words">
                <strong>Не просто мойка,<br></br> а <strong className="blue-text">полный уход</strong> <br></br>за вашим авто!</strong>
            </div>
            <div className="btn-to-sales">
                <NavLink to='/sales' className='btn-home'>Посмотреть акции</NavLink>
            </div>
        </div>
    );
}

export default HomePage;