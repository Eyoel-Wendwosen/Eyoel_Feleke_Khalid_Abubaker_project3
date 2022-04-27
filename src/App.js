import React, { useEffect, useState } from 'react';

import Axios from 'axios';

function App() {

  const [homes, setHomes] = useState([]);
  const [newHomeInput, setNewHomeInput] = useState('');

  function getHomes() {
    Axios.get('/api/home')
      .then(function (response) {
        setHomes(response.data);
      })
  }

  function createNewHome() {
    if (!newHomeInput) return;

    Axios.post('/api/home', {
      address: newHomeInput,
    })
      .then(function (response) {
        setNewHomeInput('');
        getHomes();
      })
      .catch(function (error) {
        console.log(error);
      })

  }

  useEffect(getHomes, []);

  const homeComponent = [];
  for (let home of homes) {
    homeComponent.push(<div>
      <a href={'/home/' + home._id}><h1>{home.address}</h1></a>

      <h5>Room Count: {home.roomCount}</h5>
    </div>)

  }

  return (<div>
    {homeComponent}
    <input value={newHomeInput} onChange={e => setNewHomeInput(e.target.value)}>
    </input>
    <button onClick={createNewHome}>Add new home :)</button>
  </div>)
}

export default App;

