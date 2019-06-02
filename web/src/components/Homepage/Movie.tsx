
import * as React from 'react';
const { useState, useEffect } = React;
import { Link } from 'react-router-dom';
import Home from '../../interfaces/Home.interface';
import {useAudio} from '../../hooks/audio'
import axios from 'axios';
import {getCircularReplacer} from '../helpers/helper';
import Cookies from 'universal-cookie';
const soundFile = require('../../assets/movie.mp3');
import "./home.scss";

const openInNewTab = (url) => {
  var win = window.open(url, '_blank');
  win.focus();
}

const Movie: React.FunctionComponent<Home> = props => { 
  const socket = props.socket;

    const handleClick = (type) => {
      
      axios.post(process.env.URL + `/api/createRoom`, {
        socket: JSON.stringify(socket, getCircularReplacer()),
        type
      })
      .then(response => {
        openInNewTab(`/movie/${response.data.url}`)
        // window.location.replace(`/movie/${response.data.url}`);
        const cookies = new Cookies();
        cookies.set('adminId', socket.id, { path: '/' });
        cookies.set('roomId', response.data.url, {path: '/' });
      })
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
              <div className="contenth pointer" >
                <h2>Cheetah </h2>
                <p><a  style={{color:'#00ffe9'}} target="_blank">Welcome to Cheetah a fast way to sync and watch videos with others. Click here to create a room</a></p>
                <button className="button" onClick={()=> handleClick("public")}>Create Public Room</button>
                
                <button className="button" onClick={()=> handleClick("private")}>Create Private Room</button>
              
              </div>
              
            </div>
 
          </div> 
        </div>
        </section>
      </>
    );
}
 
export default Movie;