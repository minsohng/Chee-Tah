import * as React from 'react';
const { useState } = React;
import About from './About';
import Movie from './Movie';
import Music from './Music';
import Game from './Game';

const Home = () => {
  const [containerLabel, setContainerLabel] = useState('port about');  

  return (
    <div className={containerLabel}>
      <About setContainerLabel={setContainerLabel}/>
      <Movie setContainerLabel={setContainerLabel}/>
      <Music setContainerLabel={setContainerLabel}/>
      <Game setContainerLabel={setContainerLabel}/>
    </div>
  )
}

export default Home;