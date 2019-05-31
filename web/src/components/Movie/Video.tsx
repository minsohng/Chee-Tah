import * as React from 'react';

const Video = props => {
  const { video } = props;
  return (
    <div
      className="Item"
      style={{ backgroundImage: `url(https://images.pexels.com/photos/356378/pexels-photo-356378.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)` }}
    >
      <div className="overlay ">
        <div className="title">really cool video title</div>
        <div className="plot">
          amazing description
        </div>
      </div>
    </div>
  )

}
// {video.title}
// {video.channelTitle}
// style={{ backgroundImage: `url(${video.thumbnails.high.url})` }}
export default Video;
