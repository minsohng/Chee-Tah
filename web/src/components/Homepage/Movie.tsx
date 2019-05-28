import * as React from 'react';
const { useState, useEffect } = React;
import { Link } from 'react-router-dom';
import Home from '../../interfaces/Home.interface';
import {useAudio} from '../../hooks/audio'
import axios from 'axios';
const soundFile = require('../../assets/movie.mp3');


const Movie: React.FunctionComponent<Home> = props => { 
  const [playing, toggle, destroy] = useAudio(soundFile);

  const handleClick = () => {
    axios.post('http://localhost:3001/rooms')
    .then(response => {
      console.log(response)
      window.location.replace(`/movie/${response.data.url}`);
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
        <button className='button clearfix' onClick={handleClick}>Create Room</button>
      </>
    );
}
 
export default Movie;