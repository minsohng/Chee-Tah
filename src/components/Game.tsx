import * as React from 'react';
import {Link} from 'react-router-dom';
import Home from '../interfaces/Home.interface';
import {useAudio} from '../hooks/audio'
const soundFile = require('../assets/game.mp3');


const Game: React.FunctionComponent<Home> = props => { 
  const [playing, toggle] = useAudio(soundFile);
  const onMouseEnter = () => {
    if(!playing) {
      toggle();
    }
    props.setContainerLabel('port game')
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
          <h1 onMouseEnter={onMouseEnter} onMouseLeave={onMouseExit}><Link onClick={onMouseExit} to='/games'>Game</Link> </h1>
            <div className="box">
              <h2>Games</h2>
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
 
export default Game;