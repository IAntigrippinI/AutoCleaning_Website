import { NavLink } from 'react-router-dom';
import './HomePage.css'

const HomePage = () => {
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