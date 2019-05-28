import * as React from 'react';
import {useEffect, useState} from 'react'
import * as io from 'socket.io-client'
import Navbar from './Navbar';
import Form from'./Form';
import Chatbar from './Chatbar';
import Playlist from './Playlist';
// import Video  from './Video';
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
  <div className="hero-head">
    {/* <nav className="navbar">
      <div className="container">
        <div className="navbar-brand">
          <a className="navbar-item">
            <img src="https://bulma.io/images/bulma-type-white.png" alt="Logo"/>
          </a>
          <span className="navbar-burger burger" data-target="navbarMenuHeroB">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
        <div id="navbarMenuHeroB" className="navbar-menu">
          <div className="navbar-end">
            <a className="navbar-item is-active">
              Home
            </a>
            <span className="navbar-item">
              <a className="button is-info is-inverted">
                <span className="icon">
                  <i className="fab fa-github"></i>
                </span>
                <span>Download</span>
              </a>
            </span>
          </div>
        </div>
      </div>
    </nav> */}
      <div className='container'>
        <Form/>

      </div>
  </div>

  <div className="hero-body">
  <ReactPlayer 
      url={`https://www.youtube.com/watch?v=SCwcJsBYL3o${played}`}
      playing={true}
      controls={true}
      onProgress={(state) => playedFraction = state.played}
      onDuration={(totaltime) => duration = totaltime}
      onPlay={onPlay}
    /> 
    <div className="container has-text-centered">
      <p className="title">
        Title
      </p>
      <p className="subtitle">
        Subtitle
      </p>
    </div>
  </div>

  <div className="hero-foot">
    <nav className="tabs is-boxed is-fullwidth">
      <div className="container">
        <ul>
          <li className="is-active">
            <a>Overview</a>
          </li>
          <li>
            <a>Modifiers</a>
          </li>
          <li>
            <a>Grid</a>
          </li>
          <li>
            <a>Elements</a>
          </li>
          <li>
            <a>Components</a>
          </li>
          <li>
            <a>Layout</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
   
    {/* <button className='button' onClick={handleClick}> Get number of clients here </button> */}
    
    {/* <Navbar /> */}
  
    {/* is-fixed-top */}
{/*    
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
     */}
     
    </>
  )
}
              
                
    
    

export default MovieRoom;