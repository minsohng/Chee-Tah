import * as React from 'react';
const { useState, useEffect } = React;
import About from './About';
import Movie from './Movie';
import Music from './Music';
import Game from './Game';


const Home = () => {
  const [containerLabel, setContainerLabel] = useState('port about');
  const [muteToggles, setMuteToggles] = useState({});
  
  const muteToggleAll =  () => {
    console.log('Click');
  } 
  return (
    <div className={containerLabel}>
      <button className='button' onClick={muteToggleAll}><i className='fa-volume-mute'></i></button>
      <About setContainerLabel={setContainerLabel}/>
      <Movie setContainerLabel={setContainerLabel} muteToggles={muteToggles} setMuteToggles={setMuteToggles}/>
      <Music setContainerLabel={setContainerLabel} muteToggles={muteToggles} setMuteToggles={setMuteToggles}/>
      <Game setContainerLabel={setContainerLabel} muteToggles={muteToggles} setMuteToggles={setMuteToggles}/>
    </div>
  )
}

export default Home;