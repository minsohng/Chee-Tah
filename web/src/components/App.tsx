import * as React from 'react';
import Home from './Homepage/Home';
import MovieRoom from './Movie/MovieRoom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';



const App = props => {
  
  return ( 
    <Router>
      <Route path ='/movie/:id' component={MovieRoom}/>
      <Route exact path='/' component={Home}/>
    </Router>
  );
}
 
export default App;