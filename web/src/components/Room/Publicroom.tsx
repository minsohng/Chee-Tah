import * as React from "react";
import { Link } from "react-router-dom";
import {useState, useEffect} from 'react';
import Home from "../../interfaces/Home.interface";
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
       
      <nav className="navbarA ">
          
        <header className="Header">
        <h4>Public Rooms</h4>
          <ul>
            <li className="nav-hover-on">
              <Link className="nav-hover-on" to="/" style={{ textDecoration: "none", color: "white" }}>
                Create A Room
              </Link>
            
           </li>
           
            <li className="nav-hover-on move-right-nav" >
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                Home
              </Link>
            </li>
            </ul>
        </header>
      </nav>

      <div className="row">
        {rooms}
        
      </div>
      

    </div>
  );
};

export default Publicroom;