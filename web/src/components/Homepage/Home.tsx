import * as React from 'react';
const { useState, useEffect } = React;
import Movie from './Movie';
import axios from 'axios';



const Home = (props) => {
  
  const socket = props.socket;
  const [containerLabel, setContainerLabel] = useState('port about');
  const [muteToggles, setMuteToggles] = useState({});
  
  const muteToggleAll =  () => {
    console.log('Click');
  }

  useEffect(() => {
    axios.get('http://localhost:3001/api/showRoom')
    .then(response => {
      console.log(response.data.list)
    })
  },[])
  return (
    <div className={containerLabel}>
   
      <Movie socket={socket} setContainerLabel={setContainerLabel}/>
     
      
    </div>
  )
}

export default Home;