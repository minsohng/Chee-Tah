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
      props.playVideo(id);
    }
    setResultVisibility('container is-overlay is-relative is-hidden');
  }

  return (
    <>
      <div className='columns'>
        <div className="column is-6 is-offset-one-fifth">
          <div className='box'>
            <article className='media'>
              <div className='media-left'>
                <figure className="image is-128x128">
                  <img src={title.thumbnails.medium.url}/>
                </figure>
              </div>
              <div className="media-content">
                <div className="content">
                  <p className='title is-4'>{title.title}</p>
                  <p className='subtitle is-4'>{title.channelTitle}</p>
                </div>
              </div>
              <div className="media-right">
                <span className="icon playVideo" onClick={() => handleClick("play")}><i className="fas fa-play-circle"></i></span>
                <span className="icon addPlaylist" onClick={() => handleClick("add")}><i className="fas fa-lg fa-plus-square"></i></span>  
                
              </div>
            </article>
          </div>
      </div>
      </div>
    </>
  )
}

export default Result;