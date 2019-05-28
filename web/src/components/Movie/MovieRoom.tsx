import * as React from 'react';
import {useEffect, useState} from 'react'
import * as io from 'socket.io-client'
import Navbar from './Navbar';
import Chatbar from './Chatbar';
import Chathooks from './Chathooks';

import Playlist from './Playlist';
// import Video  from './Video';
import { Socket } from 'net';
import Form from './Form';
import ReactPlayer from 'react-player';
import Cookies from 'universal-cookie';
import './movie.scss'

let socket = io.connect(`http://localhost:3001/movie`);



const MovieRoom = (props) => {
  const [played, setPlayed] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  
  let queryString: string;
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
      queryString = query
      setPlayed(query)
    })

    socket.on('is admin', (adminInfo) => {
      setIsAdmin(true);
    })

    socket.on('save admin cookie', (data) => {

      cookies.set('adminId', data.id, { path: '/' });
      cookies.set('roomId', data.roomId, { path: '/' });
    })

  }, [])
  



  return (
    <>
   
    {/* <button className='button' onClick={handleClick}> Get number of clients here </button> */}
    <h1 className="admin-title">{ isAdmin ? 'You are admin' : ''}</h1>
    
    {/* <Navbar /> */}
  
    {/* <Form/> */}
    
    <Chatbar socket={socket} roomId={roomId}/>
    <ReactPlayer 
      url={`https://www.youtube.com/watch?v=SCwcJsBYL3o${played}`}
      playing={true}
      controls={true}
      onProgress={(state) => playedFraction = state.played}
      onDuration={(totaltime) => duration = totaltime}
      onPlay={onPlay}
    /> 
			<div id="hero" className="Hero" >
				<div className="content">
					
					<h2>Movie Room</h2>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque id quam sapiente unde voluptatum alias vero debitis, magnam quis quod.</p>
				
					
				</div>
				<div className="overlay"></div>
			</div>
    
   
    </>
  )
}

export default MovieRoom;