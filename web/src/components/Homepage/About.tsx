import * as React from 'react';
import Home from '../../interfaces/Home.interface';
import axios from 'axios';
import {getCircularReplacer} from '../helpers/helper';
import Cookies from 'universal-cookie';


const About: React.FunctionComponent<Home> = props => {
    let socket = props.socket
    const handleClick = () => {
    
      axios.post(`http://localhost:3001/api/createRoom`, {
        socket: JSON.stringify(socket, getCircularReplacer())
      })
      .then(response => {
        window.location.replace(`/movie/${response.data.url}`);
        const cookies = new Cookies();
        cookies.set('adminId', socket.id, { path: '/' });
        cookies.set('roomId', response.data.url, {path: '/' });
      })
    }
  
  
    return (
      <>
      <section>
        <div className="containerh">
          <div className="background-imgh">
            <div className="boxh">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <div className="contenth pointer" onClick={handleClick}>
                <h2>Cheetah </h2>
                <p><a  style={{color:'#00ffe9'}} target="_blank">Welcome to Cheetah a fast way to sync and watch videos with others. Click here to create a room</a></p>
              </div>
              
            </div>
          </div>
        </div>
      </section>
      </>

  )
}

export default About;