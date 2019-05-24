import * as React from 'react';
import YouTube from 'react-player';

const MovieRoom = () => {

  const opts = {
    height: '700',
    width: '700',
    playerVars: {
      autoplay: 1
    }
  }

  return (
    <>
      <YouTube
        videoId='2g811Eo7K8U'
        opts={opts}
        />
    </>
  )
}

export default MovieRoom;