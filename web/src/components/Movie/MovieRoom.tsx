import * as React from 'react';
import {useEffect, useState} from 'react'
import * as io from 'socket.io-client'
import Navbar from './Navbar';
import Chathooks from './Chathooks';
import Playlist from './Playlist';
// import Video  from './Video';
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
<<<<<<< HEAD
      <div className="container chat-container">
        <div className="block">
          <div className="columns">
            <div className="column">
              <h1>{ isAdmin ? 'you are admin' : ''}</h1>
                <button className='button' onClick={handleClick}> Get number of clients here </button>
                <div>{ isAdmin ? 'you are admin' : ''}</div>
              <Form/>
              <ReactPlayer 
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
            <Chathooks socket={socket} roomId={roomId}/>
          </div>
        </div>
      </div>
    </div>
  </>
=======
   
    {/* <button className='button' onClick={handleClick}> Get number of clients here </button> */}
    
    {/* <Navbar /> */}
  
    {/* <Form/> */}
    {/* is-fixed-top */}
    <nav className="navbar i">
        <span className="navbar-toggle" id="js-navbar-toggle">
            <i className="fas fa-bars"></i>
        </span>
        <form id="search" className="Search">
            <input type="search" placeholder="Search for a title..." />
          </form>
        <a href="/" className="logo"><img style={{borderRadius:'50%'}} src="https://cmkt-image-prd.global.ssl.fastly.net/0.1.0/ps/5771736/600/400/m2/fpnw/wm0/logo76-.jpg?1548586051&s=9710bd94971f15cab62d0116acbebcb4" /></a>
        <ul className="main-nav" id="js-menu">
            <li>
                <a href="#" className="nav-links">Input</a>
            </li>
            <li>
                <a href="#" className="nav-links">Input</a>
            </li>
            <li>
                <a href="#" className="nav-links">About Us</a>
            </li>
            <li>
                <a href="#" className="nav-links">Input</a>
            </li>
            <li>
                <a href="#" className="nav-links">Input</a>
            </li>
        </ul>
    </nav>
    <h1 className="admin-title">{ isAdmin ? 'You are admin' : ''}</h1>
    <section>
  <div className="containera">

      <div className="boxa">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <div className="contenta">
          <h2>Playlist Box Two </h2>
          <p><a href="#" style={{color:'#00ffe9'}} target="_blank">mdd dkdka daedaed</a></p>
        
        
      </div>
    </div>
  </div>
</section>
    <Chatbar socket={socket} roomId={roomId}/>
    <div className="another-one">
    <ReactPlayer 
      url={`https://www.youtube.com/watch?v=SCwcJsBYL3o${played}`}
      playing={true}
      controls={true}
      onProgress={(state) => playedFraction = state.played}
      onDuration={(totaltime) => duration = totaltime}
      onPlay={onPlay}
    /> 
    </div>
			<div id="hero" className="Hero" >
				<div className="contentM">
					
					<h1 className="play-list" style={{color:'orange'}}>Playlist</h1>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque id quam sapiente unde voluptatum alias vero debitis, magnam quis quod.</p>
				
					
				</div>
			
			</div>
    
     
    </>
>>>>>>> c948854a5615823bcff6d382a3b7dcf010b8a402
  )
}
              
                
    
    

export default MovieRoom;