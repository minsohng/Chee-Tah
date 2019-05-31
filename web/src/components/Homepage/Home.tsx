import * as React from 'react';
const { useState, useEffect } = React;
import Movie from './Movie';
import Roompage from '../Room/Roompage';
import axios from 'axios';



const Home = (props) => {
  
  const socket = props.socket;
  const [containerLabel, setContainerLabel] = useState('port about');


  return (
    <div className={containerLabel}>

      <Movie socket={socket} setContainerLabel={setContainerLabel}/>
  
    </div>
  )
}

export default Home;