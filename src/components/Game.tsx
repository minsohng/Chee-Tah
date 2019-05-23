import * as React from 'react';

const Game = props => { 
  const onMouseEnter = () => {
    props.setContainerLabel('container game')
  }
  return ( 
      <>
        <div className="column">
          <div className="content">
            <h1 onMouseEnter= {onMouseEnter}>Games</h1>
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