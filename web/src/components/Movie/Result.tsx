import * as React from 'react';

const Result = (props) => {
  const {title, setResultVisibility, id} = props;
  
  const handleClick = (command) => {
    // console.log("URL", title.thumbnails.medium.url)
    if (command === "add") {
      props.addToPlaylist(title);
      props.sendMessage(title, id);
    }
    if (command === "play") {
      props.playVideo(title, id);
    }
    setResultVisibility('container is-overlay is-relative is-hidden');
  }

  return (
    <>
      <div className="col-m-9 offset-m-4">
        <div className="box box-padding box-movie-room">
          <h3>{title.title}</h3>
          <img className="picture-search" src={title.thumbnails.medium.url}></img>
          <h5 >{title.channelTitle}</h5>
          <p>className="col-lg-12"</p>
        </div>
      </div>
    </>
  )
}

export default Result;