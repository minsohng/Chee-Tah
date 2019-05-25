import * as React from 'react';
const { useState, useEffect } = React;
import axios from 'axios';


const Form: React.FunctionComponent<{}> = props => {
  const [formInput, setFormInput] = useState('')
  const [data, setData] = useState({ hits: [] });
  const youtubeSearch =  (e) => {
    e.preventDefault();
    const search = e.target.elements.youtubeSearch.value;
    console.log(search)
  }

  // const onKeyUp = (e) => {
    
  // }

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
       `https://developers.google.com/apis-explorer/#p/youtube/v3/youtube.search.list?
        part=snippet
        &order=viewCount
        &q=skateboarding+dog
        &type=video
        &videoDefinition=high`
      );
      setData(result.data);
      console.log(`Youtube returned ${data}`)
    }
    fetchData();
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