
import * as React from 'react';
import {useEffect, useState} from 'react'
import * as io from 'socket.io-client'
import Navbar from './Navbar';
import Form from'./Form';
import Chatbar from './Chatbar';
import Playlist from './Playlist';
import ReactPlayer from 'react-player';
import Cookies from 'universal-cookie';
import axios from 'axios';

// let socket = io.connect(`192.168.88.14:3001/movie`);



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
     {isLoading ? (<img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/28963/giphy%20(24).gif' alt="Loading..."/>) : 
    
    (
      <div>
        <header className="Header">
          <Form addToPlaylist={addToPlaylist}/>
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
            url={`https://www.youtube.com/watch?v=BzYnNdJhZQw${played}`}
            playing={true}
            controls={true}
            onProgress={(state) => playedFraction = state.played}
            onDuration={(totaltime) => duration = totaltime}
            onPlay={onPlay}
          /> 
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