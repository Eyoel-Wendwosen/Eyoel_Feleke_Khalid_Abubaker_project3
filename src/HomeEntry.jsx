import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

export default function HomeEntry(props) {

    const [home, setHome] = useState(undefined);
    const params = useParams();

    useEffect(() => {
        Axios.get('/api/home/' + params.homeId)
            .then(function (response) {
                setHome(response.data);
            })
    }, []);

    if (!home) {
        return (<div>
            Home loading...
        </div>)
    }

    return (
        <div>
            <h1>
                Address: {home.address}
            </h1>
            <h2>
                Build Date: {home.builtDate}
            </h2>
        </div>
    )
}