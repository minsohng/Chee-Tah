import * as React from "react";
import { Link } from "react-router-dom";
import Roomstate from "./Roomstate";

const Publicroom = props => {
  const socket = props.socket;
  console.log("PROPS", props.roomList)
  const rooms = props.roomList && props.roomList.map(room =>
    <Roomstate socket={socket} roomId={room.roomId}/>
  );
  console.log("mappedroom", rooms)
  


  return (
    <div className="container">
       
       <header className="Header">
    
  
    <h4>Public Rooms</h4>
     <div id="navigation" className="Navigation">
   
    <nav>
      
      <ul>
    
        <li>
        <Link className="public-home" to="/" style={{ textDecoration: 'none', color: 'white' }}>Home</Link>
      </li>
      </ul>
    </nav>
  </div>
     
    </header>

      <div className="row">
        {rooms}
      </div>
      

    </div>
  );
};

export default Publicroom;