import * as React from 'react';
const { useState, useEffect } = React;
import Movie from './Movie';



const Home = (props) => {
  
  const socket = props.socket;
  const [containerLabel, setContainerLabel] = useState('port about');
  const [muteToggles, setMuteToggles] = useState({});
  
  const muteToggleAll =  () => {
    console.log('Click');
  } 
  return (
    <div className={containerLabel}>
   
      <Movie socket={socket} setContainerLabel={setContainerLabel}/>
     
      
    </div>
  )
}

export default Home;