import * as React from 'react';

const Result = (props) => {
  const {title, id} = props;

  const handleClick = () => {
    console.log("URL", title.thumbnails.medium.url)
    props.addToPlaylist(title.thumbnails.medium.url);
  }
  // console.log(title);
  // console.log(id);
  return (
    <>
      <div className="dropdown-content level">
        <div className="dropdown-item">
            <figure className="image is-128x128 level-item">
              <img src={title.thumbnails.medium.url}/>
            </figure>
            <p className="level-item"><strong>{title.title}</strong></p>
            <button onClick={handleClick}>Add to playlist</button>
        </div>
        {/* <hr className="dropdown-divider"/>
        <div className="dropdown-item">
          <p>You simply need to use a <code>&lt;div&gt;</code> instead.</p>
        </div>
        <hr className="dropdown-divider"/>
        <a href="#" className="dropdown-item">
          This is a link
        </a> */}
      </div>
    </>
  )
}

export default Result;