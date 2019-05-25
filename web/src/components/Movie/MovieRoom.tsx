import * as React from 'react';
import Navbar from './Navbar';
import Chatbar from './Chatbar';
import Playlist from './Playlist';
import Video  from './Video';
import Form from './Form';

const MovieRoom = () => {
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