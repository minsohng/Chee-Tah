import * as React from 'react';
const { useState, useEffect } = React;


const Form = props => {
  const [formInput, setFormInput] = useState('')
  const youtubeSearch =  (e) => {
    e.preventDefault();
    const search = e.target.elements.youtubeSearch.value;
    console.log(search)
  }

  return (
    <>
    <form onSubmit={youtubeSearch}>
        <input type="text" name="youtubeSearch" value='formInput' />
        <button>Search</button>
    </form>
    </>
  )
}

export default Form;