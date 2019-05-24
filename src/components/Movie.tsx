import * as React from 'react';
import { Link } from 'react-router-dom';
import Home from '../interfaces/Home.interface';


const Movie: React.FunctionComponent<Home> = props => { 
  const [playing, toggle] = props.useAudio('https://medea-music.com/wp-content/uploads/2018/05/The-Avengers-Theme-Song.mp3?_=2')
  const onMouseEnter = () => {
    if(!playing) {
      toggle();
    }
    props.setContainerLabel('port movie')
  }
  const onMouseExit = () => {
    if(playing) {
      toggle();
    }
  }

  return ( 
      <>
        <div className="tab">
          <div className="content">
            <h1 onMouseEnter={onMouseEnter} onMouseLeave={onMouseExit}><Link to='/movie'>Movie</Link> </h1>
            <div className="box">
              <h2>Movie</h2>
              <p className="testing">
                Et occaecat et ad occaecat cillum et officia cillum est aute
                deserunt incididunt. Incididunt nostrud laborum eiusmod eu
                quis ad mollit consectetur dolor do veniam. Fugiat laborum
              </p>
              <a href="#" className="myButton">Create Room</a>
            </div>
          </div>
        </div>
      </>
    );
}
 
export default Movie;