import * as React from 'react';
import Home from './Homepage/Home';
import * as io from 'socket.io-client'
import MovieRoom from './Movie/MovieRoom';
import Roompage from './Room/Roompage';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


let socket = io.connect(`http://localhost:3001/movie`);


const App = () => {
  
  return ( 
    <Router>
       
      <Route path ='/movie/:id' 
        render={(props) => <MovieRoom {...props} socket={socket}/>}
      />
        <Route path ='/publicroom' 
        render={(props) => <Roompage {...props} socket={socket}/>}
      />
      <Route exact path='/' 
        render={(props) => <Home {...props} socket={socket}/>}
      />
    </Router>
  );
}
 
export default App;