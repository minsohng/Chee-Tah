import * as React from 'react';
import axios from 'axios';
import "./room.scss";
import {useState, useEffect} from 'react';



const Roomstate = (props) => {
  const [state, setState] = useState();
  const socket = props.socket;
  const roomId = props.roomId;
  
  useEffect(()=> {
    axios.post(process.env.URL + '/api/fetchState',{
        roomId,
        id: socket.id
    })
    .then(response => {
        console.log(response.data.nextVideo)
        setState(response.data.nextVideo);

    })
  },[])

  return (
    <div className="col-xs-12 col-sm-6 col-md-3">
          <div className="box" id="inner-box">
            <h1>{state && state.roomId}</h1>
            <img
              className="picture-sizing"
              src={state && state.thumbnails.high.url}
            />
            <p>playing next... {state && state.title}</p>
          </div>
          <p id="online-people">4 people watching currently</p>
    </div>
  )
}

export default Roomstate;