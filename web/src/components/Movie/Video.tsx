import * as React from 'react';
import ReactPlayer from 'react-player';

const Video = () => {
  return (
    <>
      <div className="player-wrapper">
        <ReactPlayer url="https://www.youtube.com/watch?v=SCwcJsBYL3o"/>
      </div>
    </>
  )
}

export default Video;