import * as React from 'react';
const { useState, useEffect } = React;
import About from './About';
import Movie from './Movie';
import Music from './Music';
import Game from './Game';


const useAudio = (url: string): [boolean, VoidFunction, VoidFunction] => {
  let [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);  

  const toggle = () => {
    setPlaying(!playing)
  }

  const destroy = () => {
    audio.pause();
    audio = null;
  }
  useEffect(
    () => {
      playing ? audio.play() : audio.pause();
    },[playing]
  );
  return [playing, toggle, destroy]
}

const Home = () => {
  const [containerLabel, setContainerLabel] = useState('port about');

  return (
    <div className={containerLabel}>
      <About setContainerLabel={setContainerLabel}/>
      <Movie setContainerLabel={setContainerLabel} useAudio={useAudio}/>
      <Music setContainerLabel={setContainerLabel} useAudio={useAudio}/>
      <Game setContainerLabel={setContainerLabel} useAudio={useAudio}/>
    </div>
  )
}

export default Home;