import axios from "axios";
import { useEffect, useState } from "react";

const UserPanel = () => {

    const [userHistory, setUserHistory] = useState([])

    function getUserHistory() {
        axios.get(`http://localhost:8000/get_user_history?user_id=${localStorage.getItem('userid')}`).then((resp) => {
            setUserHistory(resp.data.res)
        })
    }

    useEffect(() => {
        getUserHistory()
    }, [])

    return (
        <div className="user-panel">
            {userHistory.map((order) => { return <p>{order.date}, {order.car}, {order.service}, {order.price}</p> })}
        </div>
    );
}

export default UserPanel;