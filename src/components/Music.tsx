import * as React from 'react';
import {Link} from 'react-router-dom';

const Music = props => { 
  const onMouseEnter = () => {
    props.setContainerLabel('port music')
  }
  return ( 
      <>
        <div className="tab">
          <div className="content">
          <h1 onMouseEnter={onMouseEnter}><Link to='/music'>Music</Link> </h1>
            <div className="box">
              <h2>Music</h2>
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
 
export default Music;