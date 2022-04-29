import Axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router';

export default function NavBar(props) {

    const [username, setUsername] = useState(null);

    const navigate = useNavigate();

    useEffect(function() {
        Axios.get('/api/user/isLoggedIn')
            .then(response => setUsername(response.data.username))
            .catch(error => console.log("User is not logged in"));
    }, [])

    function logout() {
        Axios.post('/api/user/logout')
        .then(response => {
            navigate('/')
        })
        .catch(error => console.log("Error logging out"));
    }

    if (username) {
        return (<h1>
            {username} is logged in
            <button onClick={logout}>Logout</button>
        </h1>)
    }

    return (<a href='/login'><h1>Click here to login</h1></a>)

}