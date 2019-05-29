import * as React from 'react';
const { useState, useEffect } = React;
import About from './About';
import Movie from './Movie';
import Music from './Music';
import Game from './Game';
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
      <button className='button clearfix' onClick={muteToggleAll}><span className='icon'><i className='fas fa-volume-mute'></i></span></button>
      <About socket={socket} setContainerLabel={setContainerLabel}/>
      <Movie 
        socket={socket}
        setContainerLabel={setContainerLabel} 
        muteToggles={muteToggles} 
        setMuteToggles={setMuteToggles}
      />
      <Music socket={socket} setContainerLabel={setContainerLabel} muteToggles={muteToggles} setMuteToggles={setMuteToggles}/>
      <Game socket={socket} setContainerLabel={setContainerLabel} muteToggles={muteToggles} setMuteToggles={setMuteToggles}/>
    </div>
  )
}

export default Home;