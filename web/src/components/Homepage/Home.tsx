import * as React from 'react';
const { useState, useEffect } = React;
import About from './About';



const Home = () => {
  const [containerLabel, setContainerLabel] = useState('port about');
  const [muteToggles, setMuteToggles] = useState({});
  
  const muteToggleAll =  () => {
    console.log('Click');
  } 
  return (
    <div className={containerLabel}>
   
      <About setContainerLabel={setContainerLabel}/>
     
      
    </div>
  )
}

export default Home;