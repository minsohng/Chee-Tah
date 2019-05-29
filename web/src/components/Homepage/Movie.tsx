
import * as React from 'react';
const { useState, useEffect } = React;
import { Link } from 'react-router-dom';
import Home from '../../interfaces/Home.interface';
import {useAudio} from '../../hooks/audio'
import axios from 'axios';
import {getCircularReplacer} from '../helpers/helper';
import Cookies from 'universal-cookie';
const soundFile = require('../../assets/movie.mp3');


const Movie: React.FunctionComponent<Home> = props => { 
  const socket = props.socket;
  const [playing, toggle, destroy] = useAudio(soundFile);
  
    const handleClick = () => {
      
      axios.post(`http://localhost:3001/api/createRoom`, {
        socket: JSON.stringify(socket, getCircularReplacer())
      })
      .then(response => {
        window.location.replace(`/movie/${response.data.url}`);
        const cookies = new Cookies();
        cookies.set('adminId', socket.id, { path: '/' });
        cookies.set('roomId', response.data.url, {path: '/' });
      })
    }


  const onMouseEnter = () => {
    if(!playing) {
      toggle();
    }
    props.setContainerLabel('port movie')
  }
  const onMouseExit = () => {
    if(playing) {
      toggle();
    }
  }

  const onClick = () => {
    if(playing) {
      destroy();
    }
  }

  return ( 
      <>
        <section>
        <div className="containerh">
          <div className="background-imgh">
            <div className="boxh">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <div className="contenth pointer" onClick={handleClick}>
                <h2>Cheetah </h2>
                <p><a  style={{color:'#00ffe9'}} target="_blank">Welcome to Cheetah a fast way to sync and watch videos with others. Click here to create a room</a></p>
              </div>
              
            </div>
          </div>
        </div>
</section>
      </>
    );
}
 
export default Movie;