import * as React from 'react';
const { useState, useEffect } = React;
import axios from 'axios';
import Result from './Result';


const Form: React.FunctionComponent<{addToPlaylist(url: string, id: string): void, sendMessage(data: object, id: object, index: number):void, playVideo(title: any,id: string)}> = props => {
  const [formInput, setFormInput] = useState('');
  const [resultVisibility, setResultVisibility] = useState('is-overlay is-hidden');
  const [data, setData] = useState([]);

  const onInput = event => {
    setFormInput(event.target.value);
  }

  const onKeyUp = event => {
    if(event.key === 'Enter') {
      axios.get(
        process.env.URL + `api/youtube/${formInput}`, {
        }).then(result => {
          setData(result.data);
          setFormInput('');
          setResultVisibility('is-overlay')
      }).catch(err => console.error('Failed to retrieve search data'));
    }
  }
  
  
  


  const searchResults = data.map((result, i) => 
    <Result title={result.snippet} 
      key={i}
      id={result.id.videoId}
      setResultVisibility={setResultVisibility}
      addToPlaylist={props.addToPlaylist}
      sendMessage={props.sendMessage}
      playVideo={props.playVideo}
      index={i}
    />    
  )

  useEffect(() => {
    let box = document.querySelector(".is-overlay");
    let search = document.querySelector(".Search");

    search.addEventListener("click", () => {
      setResultVisibility('is-overlay')
    })
    // Detect all clicks on the document
    document.addEventListener("click", function(event) {

      
      const element = event.target as HTMLElement
      // If user clicks inside the element, do nothing
      if (element.closest(".is-overlay")) return;
      

      // If user clicks outside the element, hide it!
      setResultVisibility('is-overlay is-hidden')
    });

    
  })

  return (
    <>
      <div className="Search search-fixed-center">
        <input id='search'
          type="text"
          onKeyUp={onKeyUp}
          onInput={onInput}
          value={formInput}
          placeholder='Press Enter to search for videos'
          
          autoComplete="off"
        />
        
      </div>
      
       <div className={resultVisibility} id='result'>
        
       <div className="row center-result">
         {searchResults}
       </div>
       </div>
    
    </>
  )
}

export default Form;