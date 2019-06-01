import * as React from 'react';
import Publicroom from './Publicroom';
import {useState} from 'react';
import "./room.scss";



const Roompage = (props) => {

  const socket = props.socket;
  const [containerLabel, setContainerLabel] = useState('port about');
  return (
    <div className={containerLabel}>
   
      <Publicroom socket={socket} setContainerLabel={setContainerLabel} roomList={props.roomList}/>
     
      
    </div>
  )
}

export default Roompage;