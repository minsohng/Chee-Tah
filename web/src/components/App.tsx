import * as React from 'react';
import Home from './Homepage/Home';
import * as io from 'socket.io-client'
import MovieRoom from './Movie/MovieRoom';
import Roompage from './Room/Roompage';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


let socket = io.connect(process.env.URL + `/movie`);
console.log('testttt',process.env.URL)

const App = () => {

  const [roomList, setRoomList] = useState();

  useEffect(() => {
    axios.get(process.env.URL + '/api/showRoom')
      .then(response => {
        console.log("roomLIST", response.data.list)
        setRoomList(response.data.list)
      })
    socket.on('update create room state', ()=> {
      axios.get(process.env.URL + '/api/showRoom')
      .then(response => {
        console.log("roomLIST", response.data.list)
        setRoomList(response.data.list)
      })
    })

    
  },[])
  
  return ( 
    <Router>
       
      <Route path ='/movie/:id' 
        render={(props) => <MovieRoom {...props} socket={socket}/>}
      />
      <Route path ='/publicroom' 
        render={(props) => <Roompage {...props} socket={socket} roomList={roomList}/>}
      />
      <Route exact path='/' 
        render={(props) => <Home {...props} socket={socket}/>}
      />
    </Router>
  );
}
 
export default App;