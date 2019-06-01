import * as React from 'react';
import axios from 'axios';
import "./room.scss";
import {useState, useEffect} from 'react';



const Roomstate = (props) => {
  const [state, setState] = useState();
  const socket = props.socket;
  const roomId = props.roomId;

  const handleClick = () => {
    window.location.replace(`/movie/${roomId}`);
  }
  
  useEffect(()=> {
    
      
    axios.post(process.env.URL + '/api/fetchState',{
      roomId
    })
    .then(response => {
        console.log("HEYYYYYY", response.data)
        setState(response.data);
    })

    socket.on('update room state', () => {
      console.log("RECEIVED UPDATE ROOM STATE")
      
      axios.post(process.env.URL + '/api/fetchState',{
        roomId
      })
      .then(response => {
          console.log("HEYYYYYY", response.data)
          setState(response.data);
      })
    })

  },[])

  return (
    <div className="col-xs-12 col-sm-6 col-md-3" onClick={handleClick}>
          <div className="box" id="inner-box">
            <h1>{roomId}</h1>
            <img
              className="picture-sizing"
              src={state && state.videoData.thumbnails.high.url || "https://thumbs.gfycat.com/BitesizedFearlessImperialeagle-small.gif"}
            />
            {state && <p>Currently Playing... {state && state.videoData.title}</p>}
          </div>
          <p id="online-people">4 people watching currently</p>
    </div>
  )
}

export default Roomstate;