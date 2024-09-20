import axios from "axios";
import { useEffect, useState } from "react";
import { base_url } from "../../../config";

const UserPanel = () => {

    const [userHistory, setUserHistory] = useState([])

    function getUserHistory() {
        axios.get(`${base_url}/get_user_history?user_id=${localStorage.getItem('userid')}`).then((resp) => {
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