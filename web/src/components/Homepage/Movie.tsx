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
    const promise1 = axios.get('https://api.datamuse.com/words?ml=fast');
    const promise2 = axios.get('https://api.datamuse.com/words?ml=cheetah');

    Promise.all([promise1, promise2]).then(function(response) {
    const randomNum = Math.floor(Math.random() * 100)
    const data1 = response[0].data[randomNum].word
    const data2 = response[1].data[randomNum].word
    window.location.replace(`/movie/${data1}-${data2}`);
  });
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