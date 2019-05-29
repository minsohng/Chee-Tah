import * as React from 'react';
import ReactPlayer from 'react-player';
import {useState, useEffect} from 'react';

const Playlist = (props) => {
  // const [playlistItems, setPlaylistItems] = useState([]);

  // useEffect(()=> {
  //   setPlaylistItems(props.playlist)
  // })
  
  return (
    <>
    <div className="container boxtest">
    {props.playlist.map(item => {
      return <img src={item} alt="image"/>
    })}
    </div>
    </>
  )
}

export default Playlist;