import * as React from 'react';
import {useEffect, useState} from 'react'
import * as io from 'socket.io-client'
// import Navbar from './Navbar';
import Chatbar from './Chatbar';
import Chathooks from './Chathooks';

import Playlist from './Playlist';
// import Video  from './Video';
import { Socket } from 'net';
import Form from './Form';
import ReactPlayer from 'react-player';

let socket = io.connect(`http://localhost:3001/movie`);


const MovieRoom = (props) => {
  const [played, setPlayed] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  
  let queryString;
  let playedFraction;
  let duration;
  
  const roomId = props.match.params.id;
  

  const handleClick = () => {
    socket.emit('get number of clients', roomId)
  }

  const onPlay = () => {
    let timestamp = Math.floor(playedFraction * duration)
    socket.emit('share video timestamp', timestamp)
  }



  useEffect(() => {
    
    socket.emit('joinRoom', roomId)

    socket.on('sync video timestamp', (timestamp: number) => {
      const query = `?t=${timestamp}`
      queryString = query
      setPlayed(query)
    })

    socket.on('is admin', (adminInfo) => {
      setIsAdmin(true);
    })
  }, [])
  



  return (
    <>
    {/* <button className='button' onClick={handleClick}> Get number of clients here </button> */}
    
    {/* <Navbar/>
 
    <Form/>
    <Video/> */}
    {/* <Navbar /> */}
    <h1>{ isAdmin ? 'you are admin' : ''}</h1>
    <ReactPlayer 
      className="react-player-video"
      url={`https://www.youtube.com/watch?v=SCwcJsBYL3o${played}`}
      playing={true}
      controls={true}
      onProgress={(state) => playedFraction = state.played}
      onDuration={(totaltime) => duration = totaltime}
      onPlay={onPlay}


    />
    <Playlist/>
    <Chatbar socket={socket} roomId={roomId}/>
    {/* <Chathooks socket={socket} roomId={roomId}/> */}
 
   
  
    </>
  )
}

export default MovieRoom;