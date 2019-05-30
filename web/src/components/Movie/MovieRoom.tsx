
import * as React from 'react';
import {useEffect, useState, useRef} from 'react'
import * as io from 'socket.io-client'
import Navbar from './Navbar';
import Form from'./Form';
import Chatbar from './Chatbar'
import "./movie.scss";
import Playlist from './Playlist';
import ReactPlayer from 'react-player';
import Cookies from 'universal-cookie';
import axios from 'axios';



const MovieRoom = (props) => {
  const socket = props.socket;
  const [played, setPlayed] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [playlist, setPlaylist] = useState([{
    "publishedAt": "2018-10-10T09:00:06.000Z",
    "channelId": "UCweOkPb1wVVH0Q0Tlj4a5Pw",
    "title": "[MV] IU(아이유) _ BBIBBI(삐삐)",
    "description": "[MV] IU(아이유) _ BBIBBI(삐삐) *English subtitles are now available. :D (Please click on 'CC' button or activate 'Interactive Transcript' function) [Notice] 1theK ...",
    "thumbnails": {
      "default": {
        "url": "https://i.ytimg.com/vi/nM0xDI5R50E/default.jpg",
        "width": 120,
        "height": 90
        },
      "medium": {
        "url": "https://i.ytimg.com/vi/nM0xDI5R50E/mqdefault.jpg",
        "width": 320,
        "height": 180
        },
      "high": {
        "url": "https://i.ytimg.com/vi/nM0xDI5R50E/hqdefault.jpg",
        "width": 480,
        "height": 360
        }
    },
    "channelTitle": "1theK (원더케이)",
    "liveBroadcastContent": "none"
    }]);

  const ref = player => {
    this.player = player
  }

  
  
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

  const addToPlaylist = (videoData) => {
    setPlaylist([...playlist, videoData]);
  }
  
  const sendMessage = (data, id) => {
    let message = {
      socketId: socket.id,
      roomId,
      ...data,
      id
    }
    console.log(message);
    socket.emit('add to playlist', message)
  }
  
  useEffect(() => {

    axios.post(process.env.URL + `/api/getRoom`, {

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
    

    socket.on('is admin', (adminInfo) => {
      setIsAdmin(true);
    })
  }, [])

  socket.on('sync video timestamp', (timestamp: number) => {
    this.player.seekTo(timestamp);
    
  })



  // <Form addToPlaylist={addToPlaylist}/>
  const dog =
    "https://pbs.twimg.com/profile_images/1046968391389589507/_0r5bQLl_400x400.jpg";
  const catTwo =
    "https://www.thebeaverton.com/wp-content/uploads/2019/03/cat-800x600.jpg";
  const kanye =
    "https://www.billboard.com/files/media/kanye-west-top-five-premiere-2014-billboard-1548.jpg";
  const catThree =
    "https://www.healthypawspetinsurance.com/Images/V3/CatAndKittenInsurance/Cat-kitten-insurance-for-your-cat_CTA_desktop.jpg";
  const cat =
    "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzEwNC84MTkvb3JpZ2luYWwvY3V0ZS1raXR0ZW4uanBn";

  return (
    
     <>
     {isLoading ? (<img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/28963/giphy%20(24).gif' alt="Loading..."/>) : 
    
    (
      <div>
        <header className="Header">

          <Form addToPlaylist={addToPlaylist} sendMessage={sendMessage}/>

          <h1>{ isAdmin ? 'Admin Mode' : ''}</h1>
          

        </header>
        
        <div
          id="hero"
          className="Hero"
          style={{
            backgroundImage:
              "url(http://4.bp.blogspot.com/-6P26BXYKrr0/XJfw2gPg7EI/AAAAAAAAD74/jjQiFA4KowgVXBqgEHXA7nzyK38ULMqUQCK4BGAYYCw/s1600/EndgameWallpaper.png)"
          }}
        >
          <div className="content">

    <ReactPlayer 
      ref={ref}
      url={`https://www.youtube.com/watch?v=SCwcJsBYL3o`}
      playing={true}
      controls={true}
      onProgress={(state) => playedFraction = state.played}
      onDuration={(totaltime) => duration = totaltime}
      onPlay={onPlay}
    /> 
    <button className="button" onClick={handleClick}>GET NUM CLIENTS</button>
          <Chatbar socket={socket} roomId={roomId}/>

            {/* <img className="logo" src="http://www.returndates.com/backgrounds/narcos.logo.png" alt="" /> */}
            {/* <h2>something here</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Doloremque id quam sapiente unde voluptatum alias vero debitis,
              magnam quis quod.
            </p> */}
          </div>
          <div className="overlay" />
        </div>
        <Playlist playlist={playlist}/>
          {/* testing purposes */}
      </div>

)
  }
</>
      
    
  )
    
    
  
}
              
                
    
    

export default MovieRoom;