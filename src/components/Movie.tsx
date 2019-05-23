import * as React from 'react';

const Movie = props => { 
  const onMouseEnter = () => {
    props.setContainerLabel('container movie')
  }
  return ( 
      <>
        <div className="column">
          <div className="content">
            <h1 onMouseEnter= {onMouseEnter}>Movie</h1>
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