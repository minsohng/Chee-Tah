
import * as React from 'react';
import {useEffect, useState} from 'react'
import * as io from 'socket.io-client'
import Navbar from './Navbar';
import Form from'./Form';
import Chatbar from './Chatbar';
import Playlist from './Playlist';
import { Socket } from 'net';
import ReactPlayer from 'react-player';
import Cookies from 'universal-cookie';
import axios from 'axios';
require('./movie.scss')

// let socket = io.connect(`192.168.88.14:3001/movie`);



const MovieRoom = (props) => {
  const socket = props.socket;
  const [played, setPlayed] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  
  let playedFraction: number;
  let duration: number;
  
  const roomId = props.match.params.id;
  

  const handleClick = () => {
    socket.emit('get number of clients', roomId)
  }

  const onPlay = () => {
    let timestamp = Math.floor(playedFraction * duration)
    socket.emit('share video timestamp', timestamp)
  }



  useEffect(() => {

    axios.post(`http://localhost:3001/api/getRoom`, {
      params: roomId
    })
    .then( response => {
      console.log(response.data.response)
      if (response.data.response === true) {
        setIsLoading(false);
      }
    })



    const cookies = new Cookies();
    const roomIdCookie = cookies.get('roomId');
    const adminIdCookie = cookies.get('adminId');

    const roomObject = {
      roomId,
      roomIdCookie,
      adminIdCookie
    }

    
    socket.emit('joinRoom', roomObject)
    

    socket.on('sync video timestamp', (timestamp: number) => {
      const query = `?t=${timestamp}`
      setPlayed(query)
    })
    
    socket.on('is admin', (adminInfo) => {
      setIsAdmin(true);
    })


  }, [])
  



  return (
    <>
      {/* {isLoading ? (<img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/28963/giphy%20(24).gif' alt="Loading..."/>) : 
    (
      <>
        <Playlist/> */}
{/* 
        <div className="container chat-container">
        <div className="block">
          <div className="columns">
            <div className="column">
            <h1>{ isAdmin ? 'you are admin' : ''}</h1>
      
        <button className='button' onClick={handleClick}> Get number of clients here </button>
        <div>{ isAdmin ? 'you are admin' : ''}</div>
        
     */}
        <Form/>
      
        {/* <ReactPlayer 
          url={`https://www.youtube.com/watch?v=SCwcJsBYL3o${played}`}
          playing={true}
          controls={true}
          onProgress={(state) => playedFraction = state.played}
          onDuration={(totaltime) => duration = totaltime}
          onPlay={onPlay}
        /> 
            </div>
            <div className="column">
              <p className="notification">second</p>
            </div>
            <div className="column">
              <p className=""></p>
            </div>
            <div className="column is-one-third">
            <Chatbar socket={socket} roomId={roomId} />
            </div>
          </div>
        </div>
        </div>
        </>
        )
        } */}
    </>
  )
}
              
                
    
    

export default MovieRoom;