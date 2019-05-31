import * as React from 'react';
const { useState, useEffect } = React;
import axios from 'axios';
import Result from './Result';


const Form: React.FunctionComponent<{addToPlaylist(url: string): void, sendMessage(data: object, id: object):void, playVideo(id: string)}> = props => {
  const [formInput, setFormInput] = useState('');
  const [resultVisibility, setResultVisibility] = useState('container is-overlay is-relative is-hidden');
  const [data, setData] = useState([]);
  const onInput = event => {
    setFormInput(event.target.value);
  }

  const onKeyUp = event => {
    // setResultVisibility('container is-overlay is-relative')
    if(event.key === 'Enter') {
      axios.get(
        process.env.URL + `/api/youtube/${formInput}`, {
        }).then(result => {
          console.log('Received response');
          setData(result.data);
          setFormInput('');
          setResultVisibility('container is-overlay is-relative')
      }).catch(err => console.error('Failed to retrieve search data'));
    }
  }
  // below is code to grab searches on input change
  // useEffect(() => {
  //   axios.get(
  //     `http://localhost:3001/youtube/${formInput}`, {
  //   }).then(result => {
  //     console.log('Received response');
  //     setData(result.data);
  //   }).catch(err => console.error('Failed to retrieve search data'));
  // }, [formInput])
  


  const searchResults = data.map((result, i) => 
    <Result title={result.snippet} 
      key={i}
      id={result.id.videoId}
      setResultVisibility={setResultVisibility}
      addToPlaylist={props.addToPlaylist}
      sendMessage={props.sendMessage}
      playVideo={props.playVideo}
    />    
  )

  return (
    <>
      <div className="Search">
        <input id='search'
          type="text"
          onKeyUp={onKeyUp}
          onInput={onInput}
          value={formInput}
          placeholder='Press Enter to search for videos'/>
        <div className={resultVisibility} id='result'>
          {searchResults}
        </div>
      </div>
    </>
  )
}

export default Form;