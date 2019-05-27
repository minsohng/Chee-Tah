import * as React from 'react';
import Navbar from './Navbar';

import Playlist from './Playlist';
import Video  from './Video';
import Chatbar  from './Chatbar';
require('./movie.scss');

const MovieRoom = () => {
  return (
    <>

    <Navbar/>
 
 <Video/>
 
 <div className ="column is-half">

 <Chatbar/>
 </div>
    <Playlist/>
 
   
  
    </>
  )
}

export default MovieRoom;