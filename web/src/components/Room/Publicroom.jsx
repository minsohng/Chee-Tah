import React from "react";
const { useState, useEffect } = React;
import { Link } from "react-router-dom";
import Home from "../../interfaces/Home.interface";

const Publicroom = props => {
  const socket = props.socket;

  return (
    <div className="contains-all">
    <div className="container" id="room-specific">
       
        <header className="Header">
        <h4>Public Room's</h4>
    
    
    
    <div id="navigation" className="Navigation">
   
   <nav>
     
     <ul>
    
       <li>
       <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>Create Room</Link>
       </li>
       <li>
         
       </li>
       <li></li>
       <li>
       <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>Home</Link>
     </li>
     </ul>
   </nav>
 </div>
    
   </header>

      <div className="row">
        <div className="col-xs-12 col-sm-6 col-md-3">
          <div className="box" id="inner-box">
            <h1 className="room-title">Roomsekfeksfjslefjskflsd</h1>
            <img
              className="picture-sizing"
              src="https://www.rover.com/blog/wp-content/uploads/2014/10/tiny-pug1-750x540.jpg"
            />
            <p>Title of youtube video adjnajkwdalkwj askdadwa awmdkm awdklmawdklawd awdklwad</p>
          </div>
          <p id="online-people">4 people watching currently</p>
        </div>

        <div className="col-xs-12 col-sm-6 col-md-3">
          <div className="box" id="inner-box">
            <h1 className="room-title">Room Name</h1>
            <img
              className="picture-sizing"
              src="http://www.droidforums.net/data/photos/l/4/4427-1280198437-8fe22827c12c4b0b4aa1018afd38872a.jpg"
            />
            <p>Title of youtube video</p>
          </div>
          <p id="online-people">4 people watching currently</p>
        </div>

        <div className="col-xs-12 col-sm-6 col-md-3">
          <div className="box" id="inner-box">
            <h1 className="room-title">Room Name</h1>
            <img
              className="picture-sizing"
              src="https://www-fortnitecreativehq-com.exactdn.com/wp-content/uploads/2019/02/tppja0wtaxm.jpg?strip=all&lossy=1&ssl=1"
            />
            <p>Title of youtube video</p>
          </div>
          <p id="online-people">4 people watching currently</p>
        </div>

        <div className="col-xs-12 col-sm-6 col-md-3">
          <div className="box" id="inner-box">
            <h1 className="room-title">Room Name</h1>
            <img
              className="picture-sizing"
              src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/spiderman-lead-1535732273.jpg?resize=480:*"
            />
            <p>Title of youtube video</p>
          </div>
          <p id="online-people">4 people watching currently</p>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-xs-12 col-sm-6 col-md-3">
          <div className="box" id="inner-box">
            <h1 className="room-title">Room Name</h1>
            <img
              className="picture-sizing"
              src="https://www.rover.com/blog/wp-content/uploads/2014/10/tiny-pug1-750x540.jpg"
            />
            <p>Title of youtube video</p>
          </div>
          <p id="online-people">4 people watching currently</p>
        </div>

        <div className="col-xs-12 col-sm-6 col-md-3">
          <div className="box" id="inner-box">
            <h1 className="room-title">Room Name</h1>
            <img
              className="picture-sizing"
              src="http://www.droidforums.net/data/photos/l/4/4427-1280198437-8fe22827c12c4b0b4aa1018afd38872a.jpg"
            />
            <p>Title of youtube video</p>
          </div>
          <p id="online-people">4 people watching currently</p>
        </div>

        <div className="col-xs-12 col-sm-6 col-md-3">
          <div className="box" id="inner-box">
            <h1 className="room-title">Room Name</h1>
            <img
              className="picture-sizing"
              src="https://www-fortnitecreativehq-com.exactdn.com/wp-content/uploads/2019/02/tppja0wtaxm.jpg?strip=all&lossy=1&ssl=1"
            />
            <p>Title of youtube video</p>
          </div>
          <p id="online-people">4 people watching currently</p>
        </div>

        <div className="col-xs-12 col-sm-6 col-md-3">
          <div className="box" id="inner-box">
            <h1 className="room-title">Room Name</h1>
            <img
              className="picture-sizing"
              src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/spiderman-lead-1535732273.jpg?resize=480:*"
            />
            <p>Title of youtube video</p>
          </div>
          <p id="online-people">4 people watching currently</p>
        </div>
      </div>

      <hr />

      <div className="row">
        <div className="col-xs-12 col-sm-6 col-md-3">
          <div className="box" id="inner-box">
            <h1 className="room-title">Room Name</h1>
            <img
              className="picture-sizing"
              src="https://www.rover.com/blog/wp-content/uploads/2014/10/tiny-pug1-750x540.jpg"
            />
            <p>Title of youtube video</p>
          </div>
          <p id="online-people">4 people watching currently</p>
        </div>

        <div className="col-xs-12 col-sm-6 col-md-3">
          <div className="box" id="inner-box">
            <h1 className="room-title">Room Name</h1>
            <img
              className="picture-sizing"
              src="http://www.droidforums.net/data/photos/l/4/4427-1280198437-8fe22827c12c4b0b4aa1018afd38872a.jpg"
            />
            <p>Title of youtube video</p>
          </div>
          <p id="online-people">4 people watching currently</p>
        </div>

        <div className="col-xs-12 col-sm-6 col-md-3">
          <div className="box" id="inner-box">
            <h1 className="room-title">Room Name</h1>
            <img
              className="picture-sizing"
              src="https://www-fortnitecreativehq-com.exactdn.com/wp-content/uploads/2019/02/tppja0wtaxm.jpg?strip=all&lossy=1&ssl=1"
            />
            <p>Title of youtube video</p>
          </div>
          <p id="online-people">4 people watching currently</p>
        </div>

        <div className="col-xs-12 col-sm-6 col-md-3">
          <div className="box" id="inner-box">
            <h1 className="room-title">Room Name</h1>
            <img
              className="picture-sizing"
              src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/spiderman-lead-1535732273.jpg?resize=480:*"
            />
            <p>Title of youtube video</p>
          </div>
          <p id="online-people">4 people watching currently</p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Publicroom;