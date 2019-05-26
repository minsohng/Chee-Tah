import * as React from 'react';
const { useState, useEffect } = React;
import axios from 'axios';
import ReactPlayer from 'react-player';


const Form: React.FunctionComponent<{}> = props => {
  const [formInput, setFormInput] = useState('')
  const [data, setData] = useState({ hits: [] });

  const [videoUrl, setvideoUrl] = useState();

  const youtubeSearch =  (e) => {
    e.preventDefault();
    const search = e.target.elements.youtubeSearch.value;
    console.log(search)
  }

  // const onKeyUp = (e) => {
    
  // }

  const handleChange = () => {

  }

  useEffect(() => {
    // axios.get(
    //   'https://www.googleapis.com/youtube/v3/search', {
    //    params: {
    //      key: process.env.YOUTUBE_API,
    //      part: 'snippet',
    //      order: 'viewCount',
    //      q: 'dog+capybara',
    //      type: 'video',
    //      videoDefinition: 'high',
    //      maxResults: 1
    //   }
    // }).then((resolve) => {
    //   console.log(JSON.stringify(resolve, null, 2))
    //   const videoId = resolve.data.items[0].id.videoId;
    //   console.log(videoId)
    //   setvideoUrl(videoId);
    // })
  }, []);


  return (
    <>
    <form onSubmit={youtubeSearch}>
        <input onChange={handleChange} type="text" name="youtubeSearch" value='formInput'/>
        <button>Search</button>
    </form>
    <ReactPlayer url={`https://www.youtube.com/watch?v=${videoUrl}`}/>
    </>
  )
}

export default Form;