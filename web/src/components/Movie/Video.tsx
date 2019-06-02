import * as React from 'react';

const Video = props => {
  const { video, playVideo, deleteVideo, id, admin } = props;

  const handleClick = (command) => {
    console.log(event.target)
    if (command === 'delete') {
      deleteVideo(video, id)
    } else if(command === 'play') {
      playVideo(video, video.id)
    }
  }

  const playRestrict = event => {
    if(!event.target.getAttribute('class').includes('remove')) {
      handleClick('play');
    }
  }

  return (
    <div
      className="Item"
      style={{ width:"320px", height:"180px", backgroundImage: `url(${video.thumbnails.medium.url})` }}
      id='play'
      onClick={playRestrict}
    >
      <div className="overlay ">
        <div className="title" style={{fontSize: "0.75em"}}>{video.title}</div> 
          <div className="plot">
          {video.channelTitle}
          {(admin.isAdmin || video.socketId === admin.socket.id) && 
          <div 
            className="buttonX remove"
            onClick={() => handleClick('delete')}
          >
            <p className="remove">Remove</p>
          </div>}
        </div>
      </div>
    </div>
  )

}

export default Video;
