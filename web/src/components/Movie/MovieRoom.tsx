
import * as React from 'react';
import {useEffect, useState} from 'react'
import * as io from 'socket.io-client'
import Navbar from './Navbar';
import Form from'./Form';
import Chatbar from './Chatbar';
import Public from './Public';
import Playlist from './Playlist';
import { Socket } from 'net';
import ReactPlayer from 'react-player';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import "./movie.scss";

// let socket = io.connect(`192.168.88.14:3001/movie`);



const MovieRoom = (props) => {
  const socket = props.socket;
  const [played, setPlayed] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [playlist, setPlaylist] = useState([]);
  
  
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

  const addToPlaylist = (thumbnail) => {
    setPlaylist([...playlist, thumbnail]);
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

         <Form addToPlaylist={addToPlaylist}/>
        
         <div id="navigation" className="Navigation">
				<nav>
          
					<ul>
         
						<li>
            <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>Browse</Link>
            </li>
						<li>
              
            </li>
						<li></li>
            <li>
            <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>Home</Link>
					</li>
					</ul>
				</nav>
			</div>
         
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
      url={`https://www.youtube.com/watch?v=SCwcJsBYL3o${played}`}
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
            <Playlist playlist={playlist}/>
          </div>
          <div className="overlay" />
         
        </div>

          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-ride="carousel"
          >
            <ol className="carousel-indicators ">
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="0"
                className="active"
              />
              <li data-target="#carouselExampleIndicators" data-slide-to="1" />
              <li data-target="#carouselExampleIndicators" data-slide-to="2" />
            </ol>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="d-inline-flex flex-row">
                <div
                  className="Item "
                  style={{ backgroundImage: "url(" + dog + ")" }}
                >
                  <div className="overlay ">
                    <div className="title">TITLE</div>

                    <div className="plot">
                      aowdhaow jdaiwojdoia jodiawj oawjdo jadwoija owidjoa
                    </div>
                  </div>
                </div>

                <div
                  className="Item "
                  style={{ backgroundImage: "url(" + cat + ")" }}
                >
                  <div className="overlay ">
                    <div className="title">TITLE</div>
                    
                    <div className="plot">
                      aowdhaow jdaiwojdoia jodiawj oawjdo jadwoija owidjoa
                    </div>
                  </div>
                </div>


                <div
                  className="Item "
                  style={{ backgroundImage: "url(" + catTwo + ")" }}
                >
                  <div className="overlay ">
                    <div className="title">TITLE</div>

                    <div className="plot">
                      aowdhaow jdaiwojdoia jodiawj oawjdo jadwoija owidjoa
                    </div>
                  </div>
                </div>




                <div
                  className="Item "
                  style={{ backgroundImage: "url(" + dog + ")" }}
                >
                  <div className="overlay ">
                    <div className="title">TITLE</div>

                    <div className="plot">
                      aowdhaow jdaiwojdoia jodiawj oawjdo jadwoija owidjoa
                    </div>
                  </div>
                </div>



                <div
                  className="Item "
                  style={{ backgroundImage: "url(" + kanye + ")" }}
                >
                  <div className="overlay ">
                    <div className="title">TITLE</div>

                    <div className="plot">
                      aowdhaow jdaiwojdoia jodiawj oawjdo jadwoija owidjoa
                    </div>
                  </div>
                </div>



                

                </div>
              </div>
              <div className="carousel-item">
                {/* <img className="d-block w-100" src={kanye} alt="Second slide" /> */}
              </div>
              <div className="carousel-item">
                {/* <img className="d-block w-100" src={catTwo} alt="Third slide" /> */}
              </div>
            </div>
            <a
              className="carousel-control-prev"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="sr-only">Next</span>
            </a>
          </div>

          {/* testing purposes */}
      </div>

)
  }
      {/* {isLoading ? (<img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/28963/giphy%20(24).gif' alt="Loading..."/>) : 
    
    ()
  } */}

{/* <ReactPlayer 
      url={`https://www.youtube.com/watch?v=SCwcJsBYL3o${played}`}
      playing={true}
      controls={true}
      onProgress={(state) => playedFraction = state.played}
      onDuration={(totaltime) => duration = totaltime}
      onPlay={onPlay}
    />  */}
     <h1>{ isAdmin ? 'you are admin' : ''}</h1>


</>
      
    
    
  )
    
    
  
}
              
                
    
    

export default MovieRoom;