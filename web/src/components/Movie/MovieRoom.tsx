import * as React from 'react';
import Navbar from './Navbar';
import Chatbar from './Chatbar';
import Playlist from './Playlist';
import Video  from './Video';

const MovieRoom = () => {
  return (
    <>
    <Navbar/>
    <Video/>
    <Playlist/>
    <Chatbar/>
    
    </>
  )
}

export default MovieRoom;