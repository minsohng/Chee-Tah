import * as React from 'react';
const { useState, useEffect } = React;
import Movie from './Movie';
import Roompage from '../Room/Roompage';
import axios from 'axios';
import { Link } from "react-router-dom";



const Home = (props) => {

  const socket = props.socket;
  const [containerLabel, setContainerLabel] = useState('port about');


  return (

    <div className={containerLabel}>
      <Link className="nav-hover-on" to="/publicroom" style={{ textDecoration: "none", color: "white" }}>
        Join Public Rooms
      </Link>

      <Movie socket={socket} setContainerLabel={setContainerLabel}/>
  
    </div>
  )
}

export default Home;