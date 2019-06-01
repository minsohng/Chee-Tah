import * as React from 'react';

const Video = props => {
  const { video } = props;
  return (
    <div
              className="Item"
              style={{ backgroundImage: `url(${video.thumbnails.high.url})` }}
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
// {video.title}
// {video.channelTitle}
// style={{ backgroundImage: `url(${video.thumbnails.high.url})` }}
export default Video;
