import * as React from 'react';
import Home from './Home';
import MovieRoom from './MovieRoom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';



const App = props => {
  return ( 
    <Router>
      <Route exact path='/' component={Home}/>
      <Route path ='/movie' component={MovieRoom}/>
    </Router>
  );
}
 
export default App;