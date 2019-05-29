
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
  
  const handleClick = (type: string) => {
    axios.post(`http://192.168.88.14:3001/api/createRoom`, {
      socket: JSON.stringify(socket, getCircularReplacer()),
      type
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
        <div className="tab">
          <div className="content">
            <h1 onMouseEnter={onMouseEnter} onMouseLeave={onMouseExit}><Link onClick={onClick} to='/movie'>Movie</Link> </h1>
            <div className="box">
              <h2>Movie</h2>
              <p className="testing">
                Et occaecat et ad occaecat cillum et officia cillum est aute
                deserunt incididunt. Incididunt nostrud laborum eiusmod eu
                quis ad mollit consectetur dolor do veniam. Fugiat laborum
              </p>
            </div>
          </div>
        </div>
        <button className='button clearfix' onClick={() => handleClick("public")}>Create Public Room</button>
        <button className='button clearfix' onClick={() => handleClick("private")}>Create Private Room</button>
      </>
    );
}
 
export default Movie;