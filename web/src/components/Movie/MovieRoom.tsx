
import * as React from 'react';
import {useEffect, useState, useRef} from 'react'
import Form from'./Form';
import Chatbar from './Chatbar'
import "./movie.scss";
import Playlist from './Playlist';
import ReactPlayer from 'react-player';
import Cookies from 'universal-cookie';
import axios from 'axios';


let playedFraction: number;
let duration: number;

const MovieRoom = (props) => {
  const socket = props.socket;

  const roomId = props.match.params.id;

  const [currentPlaying, setCurrentPlaying] = useState(undefined);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isRoom, setIsRoom] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const [username, setUsername] = useState('');

  const ref = player => {
    this.player = player
  }

  const handleClick = () => {
    socket.emit('get number of clients', roomId)
  }

  const onPlay = () => {
    setTimeout(() => {
      let timestamp = Math.floor(playedFraction * duration)
      socket.emit('share video timestamp', timestamp+1)
    },1000)
  
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

  const playVideo = (videoId) => {
    setCurrentPlaying(videoId);
    const videoObj = {
      videoId,
      roomId
    }
    socket.emit("play video", videoObj)
  }
  
  
  useEffect(() => {

    axios.post(process.env.URL + `/api/getRoom`, {
      params: roomId
    })
    .then(response => {
      console.log(response.data.response)
      if (response.data.response === true) {
        setIsLoading(false);
        setIsRoom(true);
        setUsername(response.data.username);
      } else {
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

    socket.on('sync playlist', (data) => {
      console.log(data);
      setPlaylist(data)
    })

    socket.on('sync video timestamp', (timestamp: number) => {
      
      this.player.seekTo(timestamp);
      console.log("timestamp", timestamp)
    
     
    })

    socket.on('play video', (videoId) => {
      setCurrentPlaying(videoId);
    })
  }, [])


  const renderPage = () => {
    if(!isLoading && isRoom) {
      return (
        <div>
          <header className="Header">
            <Form addToPlaylist={addToPlaylist} sendMessage={sendMessage} playVideo={playVideo}/>
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
            url={`https://www.youtube.com/watch?v=${currentPlaying}`}
            playing={true}
            controls={true}
            onProgress={(state) => playedFraction = state.played}
            onDuration={(totaltime) => duration = totaltime}
            onPlay={onPlay}
          /> 
          <button className="button" onClick={handleClick}>GET NUM CLIENTS</button>
          <Chatbar username={username} socket={socket} roomId={roomId}/>
    
          </div>
          <div className="overlay" />
            </div>
            <Playlist playlist={playlist}/>
              {/* testing purposes */}
          </div>
      )
    } else if(!isLoading && !isRoom) {
      return <div>Unable to find page</div>
    } else if(isLoading) {
      return <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/28963/giphy%20(24).gif' alt="Loading..."/> 
    }
  }

  return (
    
    <>
      {renderPage()}
    </>
  )
  
}
              
                
    
    

export default MovieRoom;