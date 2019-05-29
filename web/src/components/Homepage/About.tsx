import * as React from 'react';
import Home from '../../interfaces/Home.interface';
import axios from 'axios';


const About: React.FunctionComponent<Home> = props => {
  const handleClick = () => {
    const promise1 = axios.get('https://api.datamuse.com/words?ml=fast');
    const promise2 = axios.get('https://api.datamuse.com/words?ml=cheetah');

    Promise.all([promise1, promise2]).then(function(response) {
    const randomNum = Math.floor(Math.random() * 100)
    const data1 = response[0].data[randomNum].word
    const data2 = response[1].data[randomNum].word
    window.location.replace(`/movie/${data1}-${data2}`);
  });
  }
  
    return (
      <>
      <section>
        <div className="containerh">
          <div className="background-imgh">
            <div className="boxh">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <div className="contenth pointer" onClick={handleClick}>
                <h2>Cheetah </h2>
                <p><a  style={{color:'#00ffe9'}} target="_blank">Welcome to Cheetah a fast way to sync and watch videos with others. Click here to create a room</a></p>
              </div>
              
            </div>
          </div>
        </div>
      </section>
      </>

  )
}

export default About;