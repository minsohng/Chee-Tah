import * as React from 'react';

const Video = props => {
  const { video, playVideo } = props;

  const handleClick = () => {
    
    playVideo(video, video.id)
  }
  return (
            <div
              className="Item"
              style={{ backgroundImage: `url(${video.thumbnails.high.url})` }}
              onClick={handleClick}
            >
              <div className="overlay ">
                <div className="title">{video.title}</div>
                <div className="plot">
                {video.channelTitle}
                  <div className="buttonX">
                    <p>Remove</p>
                  </div>
                </div>
              </div>
            </div>
  )

}

export default Video;
