import * as React from 'react';
import ReactPlayer from 'react-player';

const MovieRoom = () => {
  return (
    <>
    <div className='container'>
      <ReactPlayer
        className='react-player'
        url='https://www.youtube.com/watch?v=SCwcJsBYL3o'
        width='60%'
        height='60%'
        onStart={() => console.log("hello")}
        onProgress={(playedSeconds) => console.log(playedSeconds)}
      />
    </div>
    </>
  )
}

export default MovieRoom;