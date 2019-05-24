import * as React from 'react';
import Home from './Home';
import MovieRoom from './MovieRoom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';



const App = props => {
  return ( 
    <MovieRoom/>
    // <Router>
    //   <Route exact path='/' component={MovieRoom}/>
    //   <Route path ='/movie' component={MovieRoom}/>
    // </Router>
  );
}
 
export default App;