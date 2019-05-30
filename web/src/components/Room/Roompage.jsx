import * as React from 'react';
const { useState, useEffect } = React;
import Publicroom from './Publicroom';
import axios from 'axios';
import "./room.scss";



const Roompage = (props) => {
  
  const socket = props.socket;
  const [containerLabel, setContainerLabel] = useState('port about');
  // const [muteToggles, setMuteToggles] = useState({});
  
  // const muteToggleAll =  () => {
  //   console.log('Click');
  // }

  // useEffect(() => {
  //   axios.get('http://localhost:3001/api/showRoom')
  //   .then(response => {
  //     console.log(response.data.list)
  //   })
  // },[])
  return (
    <div className={containerLabel}>
   
      <Publicroom socket={socket} setContainerLabel={setContainerLabel}/>
     
      
    </div>
  )
}

export default Roompage;