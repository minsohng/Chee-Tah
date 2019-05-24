import * as React from 'react';

const Form = props => {
  const youtubeSearch =  (e) => {
    e.preventDefault();
    const search = e.target.elements.youtubeSearch.value;
    console.log(search)
  }

  return (
    <>
    <form onSubmit={youtubeSearch}>
        <input type="text" name="youtubeSearch" />
        <button>Search</button>
    </form>
    </>
  )
}

export default Form;