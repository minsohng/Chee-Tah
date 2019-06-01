import * as React from 'react';

const Video = props => {
  const { video, playVideo, deleteVideo, id, admin } = props;

  const handleClick = (command) => {
    if(command === 'play') {
      playVideo(video, video.id)
    } else if (command === 'delete') {
      deleteVideo(video, id)
    }
  }
  return (
    <div
      className="Item"
      style={{ backgroundImage: `url(${video.thumbnails.high.url})` }}
      >
      <div className="overlay ">
        <div className="title">{video.title}</div> 
        <div className="plot">
        {video.channelTitle}
          {(admin.isAdmin || video.socketId === admin.socket.id) && <div 
            className="buttonX"
            onClick={() => handleClick('delete')}
            id='test'>
            <p>Remove</p>
          </div>}
        </div>
      </div>
    </div>
  )

}

export default Video;
