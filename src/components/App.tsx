import * as React from 'react';
import { useState } from 'react';
import About from './About';
import Movie from './Movie';
import Music from './Music';
import Game from './Game';



const App = props => {
  const [containerLabel, setContainerLabel] = useState('container about')

  // state = {
  //     hovered: false,
  //     opacity: 1,
  //     name: "peterAbout"
  //   };
    
  
    const onMouseLeave = e => {
      console.log('mouse leave')
    };
    
  //   mouseEnter = e => {
  //     console.log('mouse enter')
  //     this.setState({opacity: 0.5})
  //   }

  //   mouseLeave = e => {
  //     console.log('mouse leave')
  //     this.setState({opacity: 1})
  //   }

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