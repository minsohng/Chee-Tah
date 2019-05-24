import * as React from 'react';
import YouTube from 'react-youtube';
import Form from './Form';


const MovieRoom = () => {
  return (
  <>
    <YouTube className='is-full'
      videoId="2g811Eo7K8U"
    />
    <Form />
  </>
  
  )
}

export default MovieRoom;