import * as React from 'react';
import * as io from 'socket.io-client'
import Navbar from './Navbar';
import Chatbar from './Chatbar';
import Playlist from './Playlist';
import Video  from './Video';
import { Socket } from 'net';
import Form from './Form';

const MovieRoom = (props) => {



  // let socket = io.connect('http://localhost:3001/movie');
  
  const id = props.match.params.id;
  console.log(id)
  


  return (
    <>
    <Navbar/>
    <Form/>
    <Video/>
    <Playlist/>
    <Chatbar/>
    
    </>
  )
}

export default MovieRoom;