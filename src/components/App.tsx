import * as React from 'react';
import { useState } from 'react';
import About from './About';
import Movie from './Movie';
import Music from './Music';
import Game from './Game';



const App = props => {
  const [containerLabel, setContainerLabel] = useState('container about');  
  return ( 
    <>
    <div className={containerLabel}>
        <About setContainerLabel={setContainerLabel}/>
        <Movie setContainerLabel={setContainerLabel}/>
        <Music setContainerLabel={setContainerLabel}/>
        <Game setContainerLabel={setContainerLabel}/>
      </div>
    </>
  );
}
 
export default App;