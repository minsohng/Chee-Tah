import * as React from 'react';
const { useState, useEffect } = React;
import axios from 'axios';


const Form: React.FunctionComponent<{}> = props => {
  const [formInput, setFormInput] = useState('')
  const [data, setData] = useState({ hits: [] });
  const youtubeSearch =  (e) => {
    e.preventDefault();
    const search = e.target.elements.youtubeSearch.value;
    console.log(`${search} ${process.env.YOUTUBE_API}`)
  }

  // const onKeyUp = (e) => {
    
  // }

  useEffect(() => {
     axios.get(
        'https://www.googleapis.com/youtube/v3/search', {
         params: {
           key: process.env.YOUTUBE_API,
           part: 'snippet',
           order: 'viewCount',
           q: 'skateboarding+dog',
           type: 'video',
           videoDefinition: 'high'
         }
       }).then((resolve) => {
         console.log(`Youtube returned ${JSON.stringify(resolve)}`)
       })
  }, []);

  return (
    <>
    <form onSubmit={youtubeSearch}>
        <input type="text" name="youtubeSearch" value='formInput'/>
        <button>Search</button>
    </form>
    </>
  )
}

export default Form;