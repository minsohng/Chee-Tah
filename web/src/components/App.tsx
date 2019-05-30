import * as React from 'react';
import Home from './Homepage/Home';
import * as io from 'socket.io-client'
import MovieRoom from './Movie/MovieRoom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


let socket = io.connect(process.env.URL + `/movie`);

console.log(process.env.URL)
const App = () => {
  
  return ( 
    <Router>
      <Route path ='/movie/:id' 
        render={(props) => <MovieRoom {...props} socket={socket}/>}
      />
      <Route exact path='/' 
        render={(props) => <Home {...props} socket={socket}/>}
      />
    </Router>
  );
}
 
export default App;