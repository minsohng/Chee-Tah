import * as React from 'react';

const Result = (props) => {
  const {title, setResultVisibility, id, index} = props;
  
  const handleClick = (command) => {
    if (command === "add") {
      props.addToPlaylist(title, id);
      props.sendMessage(title, id, index);
    }
    if (command === "play") {
      props.playVideo(title, id);
    }
    setResultVisibility('is-overlay is-hidden');
  }

  return (
    <>
      <div className="col-m-9 offset-m-4">
        <div className="box box-padding box-movie-room">
          <h3>{title.title}</h3>
          <img className="picture-search" src={title.thumbnails.medium.url}></img>
          <h5 >{title.channelTitle}</h5>
          <p>className="col-lg-12"</p>
          <button className="button is-primary is-large mr-3" onClick={()=>handleClick("play")}>
            <span className="icon is-medium">
              <i className="fas fa-lg fa-play"></i>
            </span>
          </button>
          <button className="button is-primary is-large" onClick={()=>handleClick("add")}>
            <span className="icon is-medium">
              <i className="fas fa-lg fa-plus"></i>
            </span>
          </button>
        </div>
      </div>
    </>
  )
}

export default Result;