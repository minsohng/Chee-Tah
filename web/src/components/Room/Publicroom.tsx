import * as React from "react";
import { Link } from "react-router-dom";
import Roomstate from "./Roomstate";

const Publicroom = props => {
  const socket = props.socket;
  console.log("PROPS", props.roomList)
  const rooms = props.roomList && props.roomList.map((room, i) =>
    <Roomstate socket={socket} roomId={room.roomId} key={i+1000}/>
  );
  console.log("mappedroom", rooms)
  


  return (
    <div className="container">
       
       <header className="Header">
    
  
    <h4>public rooms</h4>
     <div id="navigation" className="Navigation">
   
    <nav>
      
      <ul>
        <li>
        <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>Home</Link>
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